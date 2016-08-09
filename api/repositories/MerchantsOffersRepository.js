'use strict';

var BaseRepository = require('./BaseRepository.js');

class MerchantsOffersRepository extends BaseRepository {

    constructor() {
        super(sails.models.merchantsoffers);
    }

}

module.exports = MerchantsOffersRepository;
