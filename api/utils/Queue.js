'use strict';

var events = require('events');

class Queue {

    constructor(config) {

        this._eventEmitter = new events();

        //This is a Kue based job publisher(producer) for sails v0.11.0+. Its a wrapper around Kue for publishing 
        //jobs by using redis as a queue engine. Refer https://www.npmjs.com/package/sails-hook-publisher
        this._publisher = require('kue');

        // Processing jobs is simple with Kue. First create a Queue instance much like we do for creating jobs,
        // providing us access to redis etc.
        this.queue = this._publisher.createQueue();

        if (config) {

            this._jobTag = config.jobTag;
            this._priority = config.priority;
            this._attempts = config.attempts;
            this._milliseconds = config.milliseconds;
            this._onComplete = config.onComplete;
            this._onFailedAttempt = config.onFailedAttempt;
            this._onFailed = config.onFailed;
            this._inProgress = config.inProgress;

        }

    }

    enqueue(jobTag, params, backOff) {

        var self = this;

        // Calling queue.create() with the type of job ("email"), and arbitrary job data will return 
        // a Job, which can then be save()ed, adding it to redis, with a default priority level of "normal". 
        // The save() method optionally accepts a callback, responding with an error if something goes wrong.
        // The title key is special-cased, and will display in the job listings within the UI, making it 
        // easier to find a specific job.
        self._job = self.queue.create(self._jobTag, params);

        // To specify the priority of a job, simply invoke the priority() method with a number, or priority 
        // name, which is mapped to a number.
        self._job.priority(self._priority);

        // By default jobs only have one attempt, that is when they fail, they are marked as a failure, and 
        // remain that way until you intervene. However, Kue allows you to specify this, which is important 
        // for jobs such as transferring an email, which upon failure, may usually retry without issue. To 
        // do this invoke the .attempts() method with a number.
        self._job.attempts(self._attempts)

        // Job producers can set an expiry value for the time their job can live in active state, so that if 
        // workers didn't reply in timely fashion, Kue will fail it with TTL exceeded error message preventing 
        // that job from being stuck in active state and spoiling concurrency.
        self._job.ttl(self._milliseconds);

        // Job retry attempts are done as soon as they fail, with no delay, even if your job had a delay set via
        // Job# delay.If you want to delay job re-attempts upon failures (known as backoff) you can use Job#backoff
        //  method in different ways:
        if (backOff) {
            self._job.backOff(function(attempts, delay) {
                return backOff;
            })
        }

        self._job.save();

        // Job-specific events are fired on the Job instances via Redis pubsub. The following events are
        // currently supported:
        // - `enqueue` the job is now queued
        // - `promotion` the job is promoted from delayed state to queued
        // - `progress` the job's progress ranging from 0-100
        // - `failed attempt` the job has failed, but has remaining attempts yet
        // - `failed` the job has failed and has no remaining attempts
        // - `complete` the job has completed
        // - `remove` the job has been removed
        // 
        // Note that Job level events are not guaranteed to be received upon process restarts, since restarted node.js process
        // will lose the reference to the specific Job object. If you want a more reliable event handler look for Queue Events
        // Note Kue stores job objects in memory until they are complete/failed to be able to emit events on them. If you have a
        // huge concurrency in uncompleted jobs, turn this feature off and use queue level events for better memory scaling.
        self._job.on('complete', function(result) {
            if (self._onComplete) {
                self._onComplete(null, result);
            }
        }).on('failed attempt', function(errorMessage, doneAttempts) {
            if (self._onFailedAttempt) {
                self._onFailedAttempt(errorMessage);
            }
        }).on('failed', function(errorMessage) {
            if (self._onFailed) {
                self._onFailed(errorMessage);
            }
        }).on('progress', function(progress, data) {
            if (self._inProgress) {
                self._inProgress(progress);
            }
        });

        if (self._listener) {
            // Invoke queue.process() with the associated type.Note that
            // unlike what the name createQueue suggests, it currently returns a singleton Queue instance. So you
            // can configure and use only a single Queue object within your node.js process.

            // In the following example we pass the callback done to email, When an error occurs we invoke done(err)
            // to tell Kue something happened, otherwise we invoke done() only when the job is complete. If this
            // function responds with an error it will be displayed in the UI and the job will be marked as a failure.
            // The error object passed to done, should be of standard type Error.
            self.queue.process(self._jobTag, function(job, done) {
                self._listener(job.data);
                done();
            });
        }

        self.queue.on('job complete', function(id, result) {
            self._publisher.Job.get(id, function(err, job) {
                if (err) return;
                job.remove(function(err) {
                    if (err) 
                        throw err;
                });
            });
        });

    }

    setListener(listener) {
        this._listener = listener;
    }
}

module.exports = Queue;
