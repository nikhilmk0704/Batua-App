'use strict';

var BaseRepository = require('./BaseRepository.js');

class OffersRepository extends BaseRepository {

    constructor() {
        super(sails.models.offers);
    }

}

module.exports = OffersRepository;
