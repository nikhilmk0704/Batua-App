'use strict';

var CityRepository = require('../repositories/CityRepository.js');

class CityService {

    save(params, callback) {
        var cityRepository = new CityRepository();
        cityRepository.save(params, callback);
    }

    find(params, callback) {
        var cityRepository = new CityRepository();
        cityRepository.find(params, callback);
    }

    findAll(params, callback) {
        var cityRepository = new CityRepository();
        cityRepository.findAll(params, callback);
    }

    update(params, options, callback) {
        var cityRepository = new CityRepository();
        cityRepository.update(params, options, callback);
    }

    delete(options, callback) {
        var cityRepository = new CityRepository();
        cityRepository.remove(options, callback);
    }

}

module.exports = CityService;
