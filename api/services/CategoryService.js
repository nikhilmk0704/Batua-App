'use strict'

var CategoryRepository = require('../repositories/CategoryRepository.js');

class CategoryService {

    save(params, callback) {
        var categoryRepository = new CategoryRepository();
        categoryRepository.save(params, callback);
    }

    find(params, callback) {
        var categoryRepository = new CategoryRepository();
        categoryRepository.find(params, callback);
    }

    findAll(params, callback) {
        var categoryRepository = new CategoryRepository();
        categoryRepository.findAll(params, callback);
    }

    update(params, options, callback) {
        var categoryRepository = new CategoryRepository();
        categoryRepository.update(params, options, callback);
    }

    delete(options, callback) {
        var categoryRepository = new CategoryRepository();
        categoryRepository.remove(options, callback);
    }

}

module.exports = CategoryService;
