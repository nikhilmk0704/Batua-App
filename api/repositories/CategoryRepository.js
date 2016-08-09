'use strict';

var BaseRepository = require('./BaseRepository.js');

class CategoryRepository extends BaseRepository {

    constructor() {
        super(sails.models.categories);
    }

}

module.exports = CategoryRepository;
