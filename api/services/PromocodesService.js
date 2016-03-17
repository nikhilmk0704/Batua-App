'use strict';

var PromocodesRepository = require('../repositories/PromocodesRepository.js');

class PromocodesService {

    save(params, callback) {
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.save(params, callback);
    }

    bulkSave(params, callback) {
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.bulkSave(params, callback);
    }

    find(params, callback) {
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.find(params, callback);
    }

    findAll(params, callback) {
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.findAll(params, callback);
    }

    update(params, options, callback) {
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.update(params, options, callback);
    }

    delete(options, callback) {
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.remove(options, callback);
    }

}

module.exports = PromocodesService;
