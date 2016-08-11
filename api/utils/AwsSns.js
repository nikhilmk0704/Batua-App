'use strict'

var aws = require('aws-sdk');

class AwsSns {

    sendNotification(deviceToken, message, title, callback) {
        var sns = new aws.SNS();
        aws.config.update({
            accessKeyId: 'AKIAJ6S42QQEPALPV7DQ',
            secretAccessKey: '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',
            region: 'us-east-1'
        });
        var param = {};
        param.PlatformApplicationArn = 'arn:aws:sns:us-east-1:711489290099:app/GCM/Batua';
        param.Token = deviceToken;
        sns.createPlatformEndpoint(param, function(err, data) {
            if (err)
                return callback(err);
            var endpointArn = data.EndpointArn;
            var messageObject = { "data": { "title": title, "message": message } };
            var awsSns = new AwsSns();
            var payload = awsSns.getPayload(messageObject);
            var publishObject = awsSns.getPublishObject(payload, endpointArn);
            sns.publish(publishObject, function(err, result) {
                if (err)
                    return callback(err);
                return callback(null, result);
            });
        });
    }

    getPayload(messageObject) {
        var payload = {
            GCM: JSON.stringify(messageObject),
            APNS: {
                aps: {
                    alert: 'Batua',
                    sound: 'default',
                    badge: 1
                }
            }
        };
        payload.APNS = JSON.stringify(payload.APNS);
        payload = JSON.stringify(payload);
        return payload;
    }

    getPublishObject(payload, endpointArn) {
        var publishObject = {
            Message: payload,
            MessageStructure: 'json',
            TargetArn: endpointArn
        }
        return publishObject;
    }

}

module.exports = AwsSns;
