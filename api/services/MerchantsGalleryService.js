'use strict';

var MerchantsGalleryRepository = require('../repositories/MerchantsGalleryRepository.js');

class MerchantsGalleryService {

    save(params, callback) {
        var merchantsgalleryRepository = new MerchantsGalleryRepository();
        merchantsgalleryRepository.save(params, callback);
    }

    findAll(params, callback) {
        var merchantsgalleryRepository = new MerchantsGalleryRepository();
        merchantsgalleryRepository.findAll(params, callback);
    }

    find(params,callback){
    	var merchantsgalleryRepository = new MerchantsGalleryRepository();
        merchantsgalleryRepository.find(params, callback);
    }

    update(params,callback){
    	var merchantsgalleryRepository = new MerchantsGalleryRepository();
        merchantsgalleryRepository.update(params, callback);
    }

    delete(params,callback){
    	var merchantsgalleryRepository = new MerchantsGalleryRepository();
        merchantsgalleryRepository.remove(params, callback);
    }
}

module.exports = MerchantsGalleryService;
