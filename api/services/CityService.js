'use strict';

var CityRepository = require('../repositories/CityRepository.js');

class CityService {

    save(params, callback) {
        var cityRepository = new CityRepository();
        cityRepository.save(params, callback);
    }

    find(id, callback) {
        var params={};
        var cityRepository = new CityRepository();
        if (id) {
            params.where = {};
            params.where.id = id;
            cityRepository.find(params, callback);
        } else {
            cityRepository.findAll(params, callback);
        }
    }

    updateAndFind(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var cityRepository = new CityRepository();
        cityRepository.updateAndFind(params, options, options, callback);
    }

    delete(id, callback) {
        var options = {};
        options.where = {};
        options.where.id = id;
        var cityRepository = new CityRepository();
        cityRepository.remove(options, callback);
    }

}

module.exports = CityService;
