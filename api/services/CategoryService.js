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

}

module.exports = CategoryService;
