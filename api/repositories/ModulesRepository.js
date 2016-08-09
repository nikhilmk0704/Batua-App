'use strict';

var BaseRepository = require('./BaseRepository.js');

class ModulesRepository extends BaseRepository {

    constructor() {
        super(sails.models.modules);
    }

}

module.exports = ModulesRepository;