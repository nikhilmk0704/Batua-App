'use strict';

var OAuthClientsRepository = require('../repositories/OAuthClientsRepository.js');

class OAuthClientsService {

    save(params, callback) {
        var oAuthClientsRepository = new OAuthClientsRepository();
        oAuthClientsRepository.save(params, callback);
    }

    find(params, callback) {
        var oAuthClientsRepository = new OAuthClientsRepository();
        oAuthClientsRepository.find(params, callback);
    }

}

module.exports = OAuthClientsService;
