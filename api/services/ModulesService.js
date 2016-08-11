'use strict';

var ModulesRepository = require('../repositories/ModulesRepository.js');

class ModulesService {

    save(params, callback) {
        var modulesRepository = new ModulesRepository();
        modulesRepository.save(params, callback);
    }

    find(params, callback) {
        var modulesRepository = new ModulesRepository();
        modulesRepository.find(params, callback);
    }

}

module.exports = ModulesService;
