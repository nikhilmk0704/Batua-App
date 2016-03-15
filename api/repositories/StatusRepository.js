'use strict';

var BaseRepository = require('./BaseRepository.js');

class StatusRepository extends BaseRepository {

    constructor() {
        super(sails.models.statuses);
    }

}

module.exports = StatusRepository;
