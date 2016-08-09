'use strict';

var nodemailer = require('nodemailer');
var events = require('events');
var Queue = require('../utils/Queue.js');
var eventEmitter = new events.EventEmitter();
var path = require('path');
var EmailTemplate = require('email-templates').EmailTemplate;
var templatesDir = path.resolve(__dirname, '..', 'templates');

class Mailer {

    constructor() {

        this._config = {};
        this._config.jobTag = "email";
        this._config.priority = 'high';
        this._config.attempts = 5;
        this._config.milliseconds = 1000;

    }

    send(params, callback) {

        var queue = new Queue(this._config);

        queue.setListener(sendEmail);
        queue.enqueue(this._config.jobTag, params);

        callback(null, {
            message: 'An email has been sent!'
        });

    }
}

module.exports = Mailer;

function sendEmail(emailParams) {

    // create reusable transporter object using the default SMTP transport

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jaseem.abbas@gmail.com',
            pass: ''
        }
    });

    var template = new EmailTemplate(path.join(templatesDir, emailParams.template));
    delete emailParams.template;

    template.render(emailParams.data, function(err, result) {
        if (err) 
            return console.log(err);

        // setup e-mail data with unicode symbols
        var mailOptions = {
            // sender address
            from: emailParams.from,
            //list of receivers
            to: emailParams.to,
            //Subject line
            subject: emailParams.subject,
            //plaintext body
            text: result.text,
            //html body
            html: result.html
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

    })

}
