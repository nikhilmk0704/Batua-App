'use strict';

var BaseRepository = require('./BaseRepository.js');

class UserRepository extends BaseRepository {

    constructor() {
        super(sails.models.users);
    }

}

module.exports = UserRepository;