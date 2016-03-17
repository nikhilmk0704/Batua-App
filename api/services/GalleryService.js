'use strict';

var GalleryRepository = require('../repositories/GalleryRepository.js');

class GalleryService {

    save(params, callback) {
        var galleryRepository = new GalleryRepository();
        galleryRepository.save(params, callback);
    }

    findAll(params, callback) {
        var galleryRepository = new GalleryRepository();
        galleryRepository.findAll(params, callback);
    }

    find(params,callback){
    	var galleryRepository = new GalleryRepository();
        galleryRepository.find(params, callback);
    }

    update(params,callback){
    	var galleryRepository = new GalleryRepository();
        galleryRepository.update(params, callback);
    }

    delete(params,callback){
    	var galleryRepository = new GalleryRepository();
        galleryRepository.remove(params, callback);
    }
}

module.exports = GalleryService;
