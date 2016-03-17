'use strict';

var BaseRepository = require('./BaseRepository.js');

class MerchantsGalleryRepository extends BaseRepository {

    constructor() {
        super(sails.models.merchantsGalleries);
    }

}

module.exports = MerchantsGalleryRepository;
