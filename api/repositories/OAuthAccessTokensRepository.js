'use strict';

var BaseRepository = require('./BaseRepository.js');

class OAuthAccessTokensRepository extends BaseRepository {

    constructor() {
        super(sails.models.oauthaccesstokens);
    }

}

module.exports = OAuthAccessTokensRepository;