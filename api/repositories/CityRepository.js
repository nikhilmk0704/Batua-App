'use strict';

var BaseRepository = require('./BaseRepository.js');

class CityRepository extends BaseRepository {

    constructor() {
        super(sails.models.cities);
    }

}

module.exports = CityRepository;
