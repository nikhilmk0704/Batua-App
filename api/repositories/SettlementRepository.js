'use strict';

var BaseRepository = require('./BaseRepository.js');

class SettlementRepository extends BaseRepository {

    constructor() {
        super(sails.models.settlements);
    }

}

module.exports = SettlementRepository;
