'use strict';

var BankRepository = require('../repositories/BankRepository.js');

class BanksService {

    save(params, callback) {
        var bankRepository = new BankRepository();
        bankRepository.save(params, callback);
    }

    find(id, callback) {
        var params={};
        var bankRepository = new BankRepository();
        if (id) {
            params.where = {};
            params.where.id = id;
            bankRepository.find(params, callback);
        } else {
            bankRepository.findAll(params, callback);
        }
    }

    updateAndFind(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var findObject=options;
        var bankRepository = new BankRepository();
        bankRepository.updateAndFind(params, options, findObject, callback);
    }

    delete(id, callback) {
        var options = {};
        options.where = {};
        options.where.id = id;
        var bankRepository = new BankRepository();
        bankRepository.remove(options, callback);
    }

}

module.exports = BanksService;
