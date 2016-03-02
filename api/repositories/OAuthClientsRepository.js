'use strict';

var BaseRepository = require('./BaseRepository.js');

class OAuthClientsRepository extends BaseRepository {

    constructor() {
        super(sails.models.oauthclients);
    }

}

module.exports = OAuthClientsRepository;