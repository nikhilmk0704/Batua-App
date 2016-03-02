'use strict';

var BaseRepository = require('./BaseRepository.js');

class UserRepository extends BaseRepository {

    constructor() {
        super(sails.models.user);
    }

}

module.exports = UserRepository;