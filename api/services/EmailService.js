'use strict';

var Mailer = require('../utils/Mailer.js');

class EmailService {

    send(params, callback) {
        var mailer = new Mailer();
        mailer.send(params, callback);
    }

}

module.exports = EmailService;
