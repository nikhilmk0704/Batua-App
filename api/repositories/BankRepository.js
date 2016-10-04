'use strict';

var BaseRepository = require('./BaseRepository.js');

class BankRepository extends BaseRepository {

    constructor() {
        super(sails.models.banks);
    }

}

module.exports = BankRepository;
