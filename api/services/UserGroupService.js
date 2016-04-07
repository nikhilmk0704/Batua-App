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

    generateErrorMessage(messageOrObject){
        var messageObject={};
        if(typeof messageOrObject == "string")
            messageObject.message=messageOrObject;
        else if(typeof messageOrObject == "object" && messageOrObject.errors)
            messageObject.message=messageOrObject.errors[0].message;
        else if(typeof messageOrObject=="object" && messageOrObject.message)
            messageObject.message=(messageOrObject.message).split(":")[1];
        var array=[];
        array.push(messageObject);
        var errorObject={};
        errorObject.errors=array;
        return errorObject;
    }
}

module.exports = UserGroupService;
