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
        var findObject=options;
        var cityRepository = new CityRepository();
        cityRepository.updateAndFind(params, options, findObject, callback);
    }

    delete(id, callback) {
        var options = {};
        options.where = {};
        options.where.id = id;
        var cityRepository = new CityRepository();
        cityRepository.remove(options, callback);
    }

    generateErrorMessage(messageOrObject){
        var messageObject={};
        if(typeof messageOrObject == "string")
            messageObject.message=messageOrObject;
        else if(typeof messageOrObject == "object" && messageOrObject.errors)
            messageObject.message=messageOrObject.errors[0].message;
        else if(typeof messageOrObject=="object" && messageOrObject.message)
            messageObject.message=(messageOrObject.message).split(":")[1];
        var array=[];
        array.push(messageObject);
        var errorObject={};
        errorObject.errors=array;
        return errorObject;
    }
}

module.exports = CityService;
