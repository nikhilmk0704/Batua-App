'use strict';

var BaseRepository = require('./BaseRepository.js');

class MerchantsPromocodeRepository extends BaseRepository {

    constructor() {
        super(sails.models.merchantspromocodes);
    }

}

module.exports = MerchantsPromocodeRepository;
