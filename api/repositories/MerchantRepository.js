'use strict';

var BaseRepository = require('./BaseRepository.js');

class MerchantRepository extends BaseRepository {

    constructor() {
        super(sails.models.merchants);
    }

}

module.exports = MerchantRepository;
