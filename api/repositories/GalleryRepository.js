'use strict';

var BaseRepository = require('./BaseRepository.js');

class GalleryRepository extends BaseRepository {

    constructor() {
        super(sails.models.galleries);
    }

}

module.exports = GalleryRepository;
