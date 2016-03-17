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

    validateAndSave(params, callback) {
        var mandatoryFields = ['name', 'shortCode', 'phone', 'pincode', 'fees', 'cityId', 'categoryId', 'bankName', 'accountHolder', 'accountNumber', 'ifscCode'];

        if (params.statusId == 1) {
            save(params, callback);
        } else {
            if (_.intersection(mandatoryFields, Object.keys(params)).length == mandatoryFields.length) {
                save(params, callback);
            } else {
                return callback("Please provide mandatory fields");
            }
        }
    }

    validateAndUpdate(params, options, callback) {
        var mandatoryFields = ['name', 'shortCode', 'phone', 'pincode', 'fees', 'cityId', 'categoryId', 'bankName', 'accountHolder', 'accountNumber', 'ifscCode'];

        if (params.statusId == 1) {
            update(params, options, callback);
        } else {
            if (_.intersection(mandatoryFields, Object.keys(params)).length == mandatoryFields.length) {
                update(params, options, callback);
            } else {
                return callback("Please provide mandatory fields");
            }
        }
    }
}

module.exports = MerchantService;
