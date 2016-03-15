'use strict'

var MerchantRepository = require('../repositories/MerchantRepository.js');

class MerchantService {

    save(params, callback) {
        var merchantRepository = new MerchantRepository();
        merchantRepository.save(params, callback);
    }

    find(params, callback) {
        var merchantRepository = new MerchantRepository();
        merchantRepository.find(params, callback);
    }

    findAll(params, callback) {
        var merchantRepository = new MerchantRepository();
        merchantRepository.findAll(params, callback);
    }

    update(params, options, callback) {
        var merchantRepository = new MerchantRepository();
        merchantRepository.update(params, options, callback);
    }

    delete(options, callback) {
        var merchantRepository = new MerchantRepository();
        merchantRepository.remove(options, callback);
    }

}

module.exports = MerchantService;
