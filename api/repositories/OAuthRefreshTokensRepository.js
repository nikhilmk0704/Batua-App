'use strict';

var BaseRepository = require('./BaseRepository.js');

class OAuthRefreshTokensRepository extends BaseRepository {

    constructor() {
        super(sails.models.oauthrefreshtokens);
    }

}

module.exports = OAuthRefreshTokensRepository;