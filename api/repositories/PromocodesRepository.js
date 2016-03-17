'use strict';

var BaseRepository = require('./BaseRepository.js');

class PromocodesRepository extends BaseRepository {

    constructor() {
        super(sails.models.promocodes);
    }

}

module.exports = PromocodesRepository;
