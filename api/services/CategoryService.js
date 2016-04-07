'use strict'

var CategoryRepository = require('../repositories/CategoryRepository.js');

class CategoryService {

    save(params, callback) {
        var categoryRepository = new CategoryRepository();
        categoryRepository.save(params, callback);
    }

    find(id, callback) {
        var params={};
        var categoryRepository = new CategoryRepository();
        if (id) {
            params.where = {};
            params.where.id = id;
            categoryRepository.find(params, callback);
        } else {
            categoryRepository.findAll(params, callback);
        }
    }

    updateAndFind(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var findObject=options;
        var categoryRepository = new CategoryRepository();
        categoryRepository.updateAndFind(params, options, findObject, callback);
    }

    delete(id, callback) {
        var options = {};
        options.where = {};
        options.where.id = id;
        var categoryRepository = new CategoryRepository();
        categoryRepository.remove(options, callback);
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

module.exports = CategoryService;
