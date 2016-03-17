'use strict';

var BaseRepository = require('./BaseRepository.js');

class MerchantsPromocodeRepository extends BaseRepository {

    constructor() {
        super(sails.models.merchantsPromocodes);
    }

}

module.exports = MerchantsPromocodeRepository;
