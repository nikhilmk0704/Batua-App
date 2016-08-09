'use strict';

var MerchantsPromocodeRepository = require('../repositories/MerchantsPromocodeRepository.js');

class MerchantsPromocodeService {

    save(params, callback) {
        var merchantsPromocodeRepository = new MerchantsPromocodeRepository();
        merchantsPromocodeRepository.save(params, callback);
    }

    bulkSave(params, callback) {
        var merchantsPromocodeRepository = new MerchantsPromocodeRepository();
        merchantsPromocodeRepository.bulkSave(params, callback);
    }

    find(params, callback) {
        var merchantsPromocodeRepository = new MerchantsPromocodeRepository();
        merchantsPromocodeRepository.find(params, callback);
    }

    findAll(params, callback) {
        var merchantsPromocodeRepository = new MerchantsPromocodeRepository();
        merchantsPromocodeRepository.findAll(params, callback);
    }

    update(params, options, callback) {
        var merchantsPromocodeRepository = new MerchantsPromocodeRepository();
        merchantsPromocodeRepository.update(params, options, callback);
    }

    delete(options, callback) {
        var merchantsPromocodeRepository = new MerchantsPromocodeRepository();
        merchantsPromocodeRepository.remove(options, callback);
    }

}

module.exports = MerchantsPromocodeService;
