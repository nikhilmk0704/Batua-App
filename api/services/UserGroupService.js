'use strict'

var UserGroupRepository = require('../repositories/UserGroupRepository.js');

class UserGroupService {

    save(params, callback) {
        var userGroupRepository = new UserGroupRepository();
        userGroupRepository.save(params, callback);
    }

    find(id, callback) {
        var params={};
        var userGroupRepository = new UserGroupRepository();
        if (id) {
            params.where = {};
            params.where.id = id;
            userGroupRepository.find(params, callback);
        } else {
            params.where={};
            params.where.$or=[{name:'Super Admin'},
                              {name:'Admin'},
                              {name:'Field Sales Agent'}];
            userGroupRepository.findAll(params, callback);
        }
    }

    updateAndFind(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var findObject=options;
        var userGroupRepository = new UserGroupRepository();
        userGroupRepository.updateAndFind(params, options, findObject, callback);
    }

    delete(id, callback) {
        var options = {};
        options.where = {};
        options.where.id = id;
        var userGroupRepository = new UserGroupRepository();
        userGroupRepository.remove(options, callback);
    }

}

module.exports = UserGroupService;
