'use strict';

var OAuthRefreshTokensRepository = require('../repositories/OAuthRefreshTokensRepository.js');

class OAuthRefreshTokensService {

    save(params, callback) {
        var oAuthRefreshTokensRepository = new OAuthRefreshTokensRepository();
        oAuthRefreshTokensRepository.save(params, callback);
    }

    find(params, callback) {
        var oAuthClientsRepository = new OAuthRefreshTokensRepository();
        oAuthClientsRepository.find(params, callback);
    }

}

module.exports = OAuthRefreshTokensService;
