'use strict';

var UserRepository = require('../repositories/UserRepository.js');
var token=require('rand-token');

class UserService {

    createUserByAdmin(params, callback) {
        var userService = new UserService();
        if(userService.validateRequestAdmin(params)){
        	return userService.createUserAndSendEmailByAdmin(params,callback);
        }
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
        return ['name', 'email', 'phone', 'userGroupId', 'profileImageUrl','deviceId','deviceType'];
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

    createUserAndSendEmailByAdmin(params,callback){
        var userService = new UserService();
        var accessToken=userService.generateToken();
        params.token=accessToken;
        params.status="Active";
        Users.create(params).then(function(result){
            userService.createAccessToken(params,result,callback);
            return null;
        }).catch(function(exception){
            return callback(exception);
        });
    }

    createAccessToken(params,userData,callback){
        var userService = new UserService();
        AccessTokens.create(params).then(function(result){
            var newParams={};
            newParams.accessTokenId=result.id;
            newParams.userId=userData.id;
            userService.createUsersAccessToken(newParams,userData,callback);
            return null;
        }).catch(function(exception){
            return callback(exception);
        });
    }

    createUsersAccessToken(params,userData,callback){
        var userService = new UserService();
        UsersAccessTokens.create(params).then(function(result){
            userService.sendEmail(userData.email);
            return callback(null,userData);
        }).catch(function(exception){
            return callback(exception);
        });
    }

    deleteUser(params){
        var options={};
        options.where={};
        options.where.email=params.email;
        Users.destroy(options);
    }

    sendEmail(email){
        var awsSesService = new AwsSesService();
        var params={};
        params.sender='support@thebatua.com';
        params.receivers=[];
        params.receivers.push(email);
        params.subjectText='Welcome to Batua !!!';
        params.bodyText='Welcome to Batua !!!';
        params.htmlTemplate=null;
        awsSesService.sendEmail(params,function(err,result){
            if(err)
                console.log(err);
            else
                console.log(result);
        });
    }

    generateToken(){
        return token.suid(16);
    }

    adminLogin(params,callback){
        var userService = new UserService();
        var userRepository = new UserRepository();
        var options={};
        var findObject={};
        options.where={};
        options.where.email=params.email;
        findObject=options;
        findObject.include=[{model:UserGroups,required:false},{model:AccessTokens,required:false}];
        userRepository.find(findObject,function(err,result){
            if(err)
                return callback(err);
            if(userService.validateAdminLogin(params,result))
                return userService.updateAccessTokenAndShowResult(params,result,callback);
            return callback("Does not exist");
        });
    }

    validateAdminLogin(params,result){
        var name=result.UserGroup.name;
        var status=result.status;
        var isValidGroupName= (name == 'Admin'||name=='Super Admin');
        var isValidStatus= (status=='Active');
        var isValidPassword=(result.password==params.password);
        if(result && params.deviceType && params.deviceId && isValidGroupName && isValidStatus && isValidPassword)
            return true;
        return false;
    }

    updateAccessTokenAndShowResult(params,result,callback){
        var userService = new UserService();
        var token = userService.generateToken();
        var createObject={};
        createObject.token=token;
        createObject.deviceId=params.deviceId;
        createObject.deviceType=params.deviceType;
        var options={};
        options.where={};
        options.where.id=result.AccessTokens.id;
        AccessTokens.create(createObject).then(function(data){
            userService.createUsersAccessTokens(result,data,callback);
            return null;
        }).catch(function(exception){
            return callback(exception);
        });
    }

    createUsersAccessTokens(result,data,callback){
        var createObject={};
        createObject.accessTokenId=data.id;
        createObject.userId=result.id;
        UsersAccessTokens.create(createObject).then(function(createdData){
            var loggedinResult={};
            loggedinResult.id=result.id;
            loggedinResult.name=result.name;
            loggedinResult.email=result.email;
            loggedinResult.token=data.token;
            loggedinResult.deviceId=data.deviceId;
            loggedinResult.deviceType=data.deviceType;
            loggedinResult.userGroupd=result.UserGroup.name;
            return callback(null,loggedinResult);
        }).catch(function(exception){
            return callback(exception);
        });
    }

    adminLogout(params,callback){
        var accessTokensService=new AccessTokensService();
        var newParams={};
        newParams.token=null;
        var options={};
        options.where={};
        options.where.token=params.token;
        accessTokensService.update(newParams,options,function(err,result){
            if(err)
                return callback(err);
            return callback(null,"Logged out");
        });
    }

}

module.exports = UserService;
