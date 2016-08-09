'use strict'

var unirest = require('unirest');

class Sms {
    send(params, callback) {
        var message = encodeURI(params.message);
        var phone = params.phone;
        var url = "http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=" + phone + "&msg=" + message + "&msg_type=TEXT&userid=2000157029&auth_scheme=plain&password=gULqmly5L&v=1.1&format=text";
        unirest.get(url).end(function(result) {
            var status = result.status;
            if (status == 200)
                return callback(null, "Message Sent");
            return callback("Cannot Send Message");
        });
    }

    smsSendForTransaction(params, callback) {
        var message =params.message;
        var phone = params.phone;
        var url = "http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=" + phone + "&msg=" + message + "&msg_type=TEXT&userid=2000157029&auth_scheme=plain&password=gULqmly5L&v=1.1&format=text";
        unirest.get(url).end(function(result) {
            var status = result.status;
            if (status == 200)
                return callback(null, "Message Sent");
            return callback("Cannot Send Message");
        });
    }
}

module.exports = Sms;