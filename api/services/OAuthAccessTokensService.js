'use strict';

var OAuthAccessTokensRepository = require('../repositories/OAuthAccessTokensRepository.js');

class OAuthAccessTokensService {

    save(params, callback) {
        var oAuthAccessTokensRepository = new OAuthAccessTokensRepository();
        oAuthAccessTokensRepository.save(params, callback);
    }

    find(params, callback) {
        var oAuthAccessTokensRepository = new OAuthAccessTokensRepository();
        oAuthAccessTokensRepository.find(params, callback);
    }

}

module.exports = OAuthAccessTokensService;
