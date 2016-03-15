'use strict';

var StatusRepository = require('../repositories/StatusRepository.js');

class StatusService {

    save(params, callback) {
        var statusRepository = new StatusRepository();
        statusRepository.save(params, callback);
    }

    find(params, callback) {
        var statusRepository = new StatusRepository();
        statusRepository.find(params, callback);
    }

    findAll(params, callback) {
        var statusRepository = new StatusRepository();
        statusRepository.findAll(params, callback);
    }

    update(params, options, callback) {
        var statusRepository = new StatusRepository();
        statusRepository.update(params, options, callback);
    }

    delete(options, callback) {
        var statusRepository = new StatusRepository();
        statusRepository.remove(options, callback);
    }

}

module.exports = StatusService;
