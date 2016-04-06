'use strict';

var UserRepository = require('../repositories/UserRepository.js');
var token=require('rand-token');
var md5 = require('md5');
var fs = require('fs');

class UserService {

    createUserByAdmin(params, callback) {
        var userService = new UserService();
        if(userService.validateRequestAdmin(params)){
        	return userService.createUserAndSendEmailByAdmin(params,callback);
        }
        return callback(userService.generateErrorMessage("Mandatory fields missing"));
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
        return ['name', 'email', 'phone', 'userGroupId'];
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
            var passwordGenerationUrl="http://52.36.228.74:1337/api/"+ userData.email + "/" + result.token;
            userService.createUsersAccessToken(newParams,userData,passwordGenerationUrl,callback);
            return null;
        }).catch(function(exception){
            userService.deleteUser(userData.id);
            return callback(exception);
        });
    }

    createUsersAccessToken(params,userData,passwordGenerationUrl,callback){
        var userService = new UserService();
        UsersAccessTokens.create(params).then(function(result){
            userService.sendEmail(userData.email,userData.name,passwordGenerationUrl);
            return callback(null,userData);
        }).catch(function(exception){
            userService.deleteUser(userData);
            return callback(exception);
        });
    }

    deleteUser(params){
        var options={};
        options.where={};
        options.where.id=params.id;
        Users.destroy(options);
    }

    sendEmail(email,name,passwordGenerationUrl){
        var awsSesService = new AwsSesService();
        var params={};
        params.sender='support@thebatua.com';
        params.receivers=[];
        params.receivers.push(email);
        params.subjectText='Welcome to Batua !!!';
        params.bodyText='Welcome to Batua !!!';
        var template = fs.readFileSync('./views/forget_password_mail.html',"utf-8");
        var mapObject={FIRSTNAME:name,LASTNAME:"",URL:passwordGenerationUrl};
        var regExp=new RegExp(Object.keys(mapObject).join("|"),"gi");
        var htmlTemplate=template.replace(regExp,function(matched){
            return mapObject[matched];
        });
        params.htmlTemplate=htmlTemplate;
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
            return callback(userService.generateErrorMessage("Does not exist"));
        });
    }

    validateAdminLogin(params,result){
        var name=result.UserGroup.name;
        var status=result.status;
        var isValidGroupName= (name == 'Admin'||name=='Super Admin');
        var isValidStatus= (status=='Active');
        var isValidPassword=(result.password==md5(params.password));
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
            return callback(null,{message:"Logged out"});
        });
    }

    adminForgotPassword(params,callback){
        var userService = new UserService();
        var token=userService.generateToken();
        var email=params.email;
        var passwordGenerationUrl="http://52.36.228.74:1337/api/"+ email + "/" + token;
        Users.find({where:{email:email}}).then(function(result){
            if(result)
                userService.createAccessToken(result.id,email,token,result.name,passwordGenerationUrl,callback);
            if(!result)
                callback("Invalid Email");
            return null;
        }).catch(function(exception){
            callback(exception);
        });
    }

    createAccessToken(userId,email,token,name,passwordGenerationUrl,callback){
        var userService = new UserService();
        AccessTokens.create({token:token}).then(function(result){
            var accessTokenId=result.id;
            userService.updateUsersAccessTokens(userId,accessTokenId,email,name,passwordGenerationUrl,callback);
            return null;
        }).catch(function(exception){
            callback(exception);
        });
    }

    updateUsersAccessTokens(userId,accessTokenId,email,name,passwordGenerationUrl,callback){
        var userService = new UserService();
        UsersAccessTokens.create({userId:userId,accessTokenId:accessTokenId}).then(function(result){
            userService.sendEmail(email,name,passwordGenerationUrl);
            callback(null,{message:"Email sent"});
            return null;
        }).catch(function(exception){
            callback(exception);
        });
    }

    adminResetPassword(params,callback){
        var userService = new UserService();
        var userRepository = new UserRepository();
        var password=md5(params.password);
        var confirmPassword=md5(params.confirmPassword);
        var accessToken=params.accessToken;
        var email=params.email;
        if(password==confirmPassword){
            var rawQueryString="select Users.id as userId from Users inner join (UsersAccessTokens "+
            "inner join AccessTokens on UsersAccessTokens.accessTokenId=AccessTokens.id) "+
            "on UsersAccessTokens.userId=Users.id where AccessTokens.token='" + accessToken + 
            "' and Users.email='" + email +"'" ;
            sequelize.query(rawQueryString).spread(function(metaResult,result){
                var userId=(result.length)?(result[0].userId):(null);
                if(result.length && userId){
                    userService.updatePassword(userId,password,callback);
                }
                if(!result.length)
                    return callback("Give correct accessToken");
                return null;
            }).catch(function(exception){
                return callback(exception);
            });
        }else{
            return callback("Password not matched");
        }
    }

    updatePassword(userId,password,callback){
        var updateObject={password:password};
        var updateOptions={where:{id:userId}};
        Users.update(updateObject,updateOptions).then(function(result){
            return callback(null,{message:"Password reset"});
        }).catch(function(exception){
            return callback(exception);
        });
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

module.exports = UserService;
