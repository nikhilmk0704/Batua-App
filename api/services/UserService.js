'use strict';

var UserRepository = require('../repositories/UserRepository.js');

class UserService {

    createUserByAdmin(params, callback) {
        var userService = new UserService();
        var userRepository = new UserRepository();
        if(userService.validateRequestAdmin(params))
        	return userRepository.save(params, callback);
        return callback("Mandatory Fields Missing");
    }

    validateRequestAdmin(params){
        var userService = new UserService();
    	return _.every(userService.getMandatoryFieldsAdmin(), function(element) {
            if (params[element]) {
                return true;
            } 
        });
    }

    getMandatoryFieldsAdmin() {
        return ['name', 'email', 'phone', 'userGroupId', 'profileImageUrl'];
    }

    findUserByAdmin(params,callback){
        var findObject={};
        findObject.include=[{model:UserGroups,required:false}];
        findObject.attributes=['id','name','phone','email','status'];
        var userRepository = new UserRepository();
        if(params.id){
        	findObject.where={};
		    findObject.where.id=params.id;
			userRepository.find(findObject,callback);	
        }else{
        	userRepository.findAll(findObject,callback);
        }
    }

    updateUserByAdmin(params,callback){
    	var options={};
    	var findObject={};
    	options.where={};
    	options.where.id=params.id;
    	findObject=options;
        findObject.include=[{model:UserGroups,required:false}];
        findObject.attributes=['id','name','phone','email','status'];
        var userRepository = new UserRepository();
    	userRepository.update(params,options,function(err,result){
    		if(err)
    			return callback(err);
    		return userRepository.find(findObject,callback);
    	});
    }

    setUserStatusByAdmin(params,callback){
    	var options={};
    	var findObject={};
    	options.where={};
    	options.where.id=params.id;
    	findObject=options;
        findObject.attributes=['id','name','phone','email','status'];
        var userRepository = new UserRepository();
    	userRepository.updateAndFind(params,options,findObject,callback);
    }

}

module.exports = UserService;
