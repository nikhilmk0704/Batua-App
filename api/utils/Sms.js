'use strict'

var unirest = require('unirest');

class Sms {
    send(params, callback) {
        var message = params.message;
        var phone = params.phone;
        var baseUrl = "https://webaroo-send-message-v1.p.mashape.com";
        var url = baseUrl + "/sendMessage?message=" + message + "&phone=" + phone + "";
        var key = sails.config.connections.sms.key;
        unirest.get(url).header("X-Mashape-Key", key).end(function(result) {
            var status = result.body.status;
            if (status)
                return callback(null, "Message Sent");
            return callback("Cannot Send Message");
        });
    }
}

module.exports = Sms;
