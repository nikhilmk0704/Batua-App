'use strict';

var UserRepository = require('../repositories/UserRepository.js');

class UserService {

    save(params, callback) {
        var userRepository = new UserRepository();
        userRepository.save(params, callback);
    }

    find(params, callback) {
        var userRepository = new UserRepository();
        userRepository.find(params, callback);
    }

}

module.exports = UserService;
