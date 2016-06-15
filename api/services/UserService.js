'use strict';

var UserRepository = require('../repositories/UserRepository.js');
var token = require('rand-token');
var md5 = require('md5');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');

class UserService {

    /*********************** Common Functions ****************************/

    getMandatoryFieldsAdmin() {
        return ['name', 'email', 'phone', 'userGroupId'];
    }

    validateRequestAdmin(params) {
        var userService = new UserService();
        return _.every(userService.getMandatoryFieldsAdmin(), function(element) {
            if (params[element]) {
                return true;
            }
        });
    }

    generateToken() {
        return token.suid(16);
    }

    generateOtp() {
        var otp = +(token.generate(6, '0123456789'));
        if (otp < 100000)
            return otp + 100000;
        return otp;
    }

    isValidPhone(phone) {
        if (phone && _.isInteger(phone) && _.toString(phone).length == 10)
            return true;
        return false;
    }

    isValidPassword(password) {
        if (password && password.length > 5 && !(/\s/g.test(password)))
            return true;
        return false;
    }

    isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email && _.isString(email) && re.test(email))
            return true;
        return false;
    }

    isValidPin(pin) {
        if (pin && _.toString(pin).length == 4 && _.inRange(pin, 1000, 10000) && !(/\s/g.test(_.toString(pin))))
            return true;
        return false;
    }

    getIncludeModels() {
        return [{
            model: UserGroups,
            as: 'userGroups',
            required: false
        }];
    }

    sendEmail(email, name, passwordGenerationUrl) {
        var awsSesService = new AwsSesService();
        var params = {};
        params.sender = 'support@thebatua.com';
        params.receivers = [];
        params.receivers.push(email);
        params.subjectText = 'Welcome to Batua !!!';
        params.bodyText = 'Welcome to Batua !!!';
        var template = fs.readFileSync('./api/templates/forgot-password/forget_password_mail.ejs', "utf-8");
        var mapObject = {};
        mapObject.FIRSTNAME = name; // Capital case because of template is using the same 
        mapObject.LASTNAME = "";
        mapObject.URL = passwordGenerationUrl;
        mapObject.CURRENT_DATE = moment().format('DD/MM/YYYY');
        var regExp = new RegExp(Object.keys(mapObject).join("|"), "gi");
        var htmlTemplate = template.replace(regExp, function(matched) {
            return mapObject[matched];
        });
        params.htmlTemplate = htmlTemplate;
        awsSesService.sendEmail(params, function(err, result) {
            if (err)
                console.log(err);
            else
                console.log(result);
        });
    }

    sendNotification(params) {
        var awsSnsService = new AwsSnsService();
        var arrayOfDeviceId = params.arrayOfDeviceId;
        var message = params.message;
        var title = params.title;
        async.each(arrayOfDeviceId, function(deviceId) {
            awsSnsService.sendNotification(deviceId, message, title, function(err, result) {
                if (err)
                    console.log(err);
                else
                    console.log(result);
            });
        });
    }

    /********************** Login Through Admin CMS *************************/

    adminLogin(params, callback) {
        var userService = new UserService();
        var options = {};
        var findObject = {};
        options.where = {};
        options.where.email = params.email;
        findObject = options;
        findObject.include = userService.getIncludeModels();
        Users.find(findObject).then(function(result) {
            if (userService.validateAdminLogin(params, result)) {
                userService.updateAccessTokenAndShowResult(params, result, callback);
                return null;
            }
            return callback("Does not exist");
        }).catch(function(exception) {
            callback(exception);
        });
    }

    validateAdminLogin(params, result) {
        var name = result.userGroups.name;
        var status = result.status;
        var isValidGroupName = (name == 'Admin' || name == 'Super Admin');
        var isValidStatus = (status == 'Active');
        var isValidPassword = (result.password == md5(params.password));
        if (result && isValidGroupName && isValidStatus && isValidPassword)
            return true;
        return false;
    }

    updateAccessTokenAndShowResult(params, result, callback) {
        var userService = new UserService();
        var token = userService.generateToken();
        var createObject = {};
        createObject.token = token;
        var deviceId = params.deviceId;
        var deviceType = params.deviceType;
        createObject.deviceId = (deviceId) ? (deviceId) : (null);
        createObject.deviceType = (deviceType) ? (deviceType) : (null);
        AccessTokens.create(createObject).then(function(data) {
            userService.createUsersAccessTokensLogin(result, data, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    createUsersAccessTokensLogin(result, data, callback) {
        var createObject = {};
        createObject.accessTokenId = data.id;
        createObject.userId = result.id;
        UsersAccessTokens.create(createObject).then(function(createdData) {
            var loggedinResult = {};
            loggedinResult.id = result.id;
            loggedinResult.name = result.name;
            loggedinResult.email = result.email;
            loggedinResult.profileImageUrl = result.profileImageUrl;
            loggedinResult.phone = result.phone;
            loggedinResult.isPinActivated = result.isPinActivated;
            loggedinResult.isPhoneVerified = result.isPhoneVerified;
            loggedinResult.isPinSet = (result.pin) ? (true) : (false);
            loggedinResult.token = data.token;
            loggedinResult.userGroup = result.userGroups.name;
            return callback(null, loggedinResult);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /********************* URL With Access Token And Email Will ***********************
     ********************** be Sent To Admin CMS User Through SES **********************/

    adminForgotPassword(params, callback) {
        var userService = new UserService();
        var token = userService.generateToken();
        var email = params.email;
        var findObject = {};
        findObject.where = {};
        findObject.include = userService.getIncludeModels();
        findObject.where.$and = {};
        findObject.where.$and.email = email;
        findObject.where.$and.status = 'Active';
        var passwordGenerationUrl = sails.config.connections.url + "/#/resetpassword/" + email + "/" + token;
        Users.find(findObject).then(function(result) {
            var group = (result) ? (result.userGroups.name) : (null);
            if (result && (group == 'Admin' || group == 'Super Admin')) {
                var userId = result.id;
                var name = result.name;
                userService.createAccessTokenAndSendEmail(userId, email, token, name, passwordGenerationUrl, callback);
                return null;
            }
            return callback("Invalid Email");
        }).catch(function(exception) {
            callback(exception);
        });
    }

    createAccessTokenAndSendEmail(userId, email, token, name, passwordGenerationUrl, callback) {
        var userService = new UserService();
        AccessTokens.create({ token: token }).then(function(result) {
            var accessTokenId = result.id;
            userService.updateUsersAccessTokens(userId, accessTokenId, email, name, passwordGenerationUrl, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    updateUsersAccessTokens(userId, accessTokenId, email, name, passwordGenerationUrl, callback) {
        var userService = new UserService();
        UsersAccessTokens.create({ userId: userId, accessTokenId: accessTokenId }).then(function(result) {
            userService.sendEmail(email, name, passwordGenerationUrl);
            return callback(null, { message: "Email sent" });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /********************* Validates Access Token ************************
     ************************ And Reset Password ****************************/

    adminResetPassword(params, callback) {
        var userService = new UserService();
        var userRepository = new UserRepository();
        var password = params.password;
        var accessToken = params.accessToken;
        var email = params.email;
        if (email && password && accessToken) {
            password = md5(password);
            var rawQueryString = userService.getAdminResetPasswordQueryString(accessToken, email);
            sequelize.query(rawQueryString).spread(function(metaResult, result) {
                var userId = (result.length) ? (result[0].userId) : (null);
                if (result.length && userId) {
                    userService.updatePassword(userId, password, callback);
                    return null;
                }
                if (!result.length)
                    return callback("Incorrect accessToken and email");
                return null;
            }).catch(function(exception) {
                callback(exception);
            });
        } else {
            callback("Email, Password And AccessToken Required");
        }
    }

    getAdminResetPasswordQueryString(accessToken, email) {
        return " SELECT  Users.id AS userId  FROM  Users " +
            " INNER JOIN  ( UsersAccessTokens  INNER JOIN  AccessTokens  ON " +
            " UsersAccessTokens.accessTokenId = AccessTokens.id )  ON  " +
            " UsersAccessTokens.userId = Users.id  WHERE  AccessTokens.token = " +
            "'" + accessToken + "'  AND  Users.email = '" + email + "'";
    }

    updatePassword(userId, password, callback) {
        var updateObject = {};
        updateObject.password = password;
        var updateOptions = {};
        updateOptions.where = {};
        updateOptions.where.id = userId;
        Users.update(updateObject, updateOptions).then(function(result) {
            return callback(null, { message: "Password reset" });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /*********************** Validates Old Password And *************************
     ********************** Allows Admin To Change Password *********************/

    adminChangePassword(params, callback) {
        var userService = new UserService();
        userService.isValidParamsToChangePassword(params, callback);
    }

    isValidParamsToChangePassword(params, callback) {
        var userService = new UserService();
        var userId = params.userId;
        var currentPassword = params.currentPassword;
        var newPassword = params.newPassword;
        if (!userId || !currentPassword || !newPassword)
            return callback("User Id, Current Password And New Password Required");
        if (userId && ((/\s/g.test(currentPassword)) || currentPassword.length < 6))
            return callback("Minimum Current Password length is 6 with no Spaces");
        if (userId && (/\s/g.test(newPassword)))
            return callback("Spaces are not Allowed in new password");
        if (userId && newPassword.length < 6)
            return callback("Minimum New Password length is 6 with no Spaces");
        if (userId && (currentPassword == newPassword))
            return callback("Current Password And New Password should be different");
        return userService.validatePassword(params, callback);
    }

    validatePassword(params, callback) {
        var userService = new UserService();
        var userId = params.userId;
        var currentPassword = params.currentPassword;
        var newPassword = params.newPassword;
        var findObject = {};
        findObject.where = {};
        findObject.where.id = userId;
        findObject.include = userService.getIncludeModels();
        Users.find(findObject).then(function(result) {
            if (!result)
                return callback("Incorrect User Id");
            var group = result.userGroups.name;
            var status = result.status;
            if (group != 'Super Admin' || group != 'Admin' || status != "Active")
                return callback("Does not exist !");
            if (result.password != md5(currentPassword))
                return callback("Incorrect Current Password");
            if (result.password == md5(currentPassword)) {
                userService.setNewPassword(userId, newPassword, callback);
                return null;
            }
            return callback("Something Went Wrong");
        }).catch(function(exception) {
            callback(exception);
        });
    }

    setNewPassword(userId, newPassword, callback) {
        var updateObject = {};
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = userId;
        updateObject.password = md5(newPassword);
        Users.update(updateObject, whereObject).then(function(result) {
            return callback(null, { message: "Password Changed" });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /***************** [Super Admin/Admin/Field Sales Agent] *****************
     *************************** Creation By Admin ***************************/

    createUserByAdmin(params, callback) {
        var userService = new UserService();
        if (userService.validateRequestAdmin(params)) {
            return userService.createUserAndSendEmailByAdmin(params, callback);
        }
        return callback("Mandatory fields missing");
    }

    createUserAndSendEmailByAdmin(params, callback) {
        var userService = new UserService();
        params.status = "Active";
        (params.profileImageUrl == undefined) ? (params.profileImageUrl = null) : (params);
        Users.create(params).then(function(result) {
            var userData = JSON.parse(JSON.stringify(result));
            delete userData.isPhoneVerified;
            delete userData.isPinActivated;
            userService.createAccessToken(userData, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    createAccessToken(userData, callback) {
        var userService = new UserService();
        var accessToken = userService.generateToken();
        var params = {};
        params.token = accessToken;
        AccessTokens.create(params).then(function(result) {
            var newParams = {};
            newParams.accessTokenId = result.id;
            newParams.userId = userData.id;
            var email = userData.email;
            var urlToken = result.token;
            var passwordGenerationUrl = sails.config.connections.url + "/#/resetpassword/" + email + "/" + urlToken;
            userService.createUsersAccessToken(newParams, userData, passwordGenerationUrl, callback);
            return null;
        }).catch(function(exception) {
            userService.deleteUser(userData);
            callback(exception);
        });
    }

    createUsersAccessToken(params, userData, passwordGenerationUrl, callback) {
        var userService = new UserService();
        UsersAccessTokens.create(params).then(function(result) {
            var email = userData.email;
            var name = userData.name;
            userService.sendEmail(email, name, passwordGenerationUrl);
            return callback(null, userData);
        }).catch(function(exception) {
            userService.deleteUser(userData);
            callback(exception);
        });
    }

    deleteUser(params) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        Users.destroy(options);
    }

    /*************************** Lists All ***************************
     ***************** [Super Admin/Admin/Field Sales Agent] *****************/

    findUserByAdmin(params, callback) {
        var userService = new UserService();
        var findObject = {};
        findObject.include = userService.getIncludeModels();
        findObject.attributes = ['id', 'name', 'phone', 'email', 'status', 'profileImageUrl'];
        var userRepository = new UserRepository();
        if (params.id) {
            findObject.where = {};
            findObject.where.id = params.id;
            userRepository.find(findObject, callback);
        } else {
            userRepository.findAll(findObject, callback);
        }
    }

    /*************** Update [Super Admin/Admin/Field Sales Agent] ***************/

    updateUserByAdmin(params, callback) {
        var userService = new UserService();
        var options = {};
        var findObject = {};
        options.where = {};
        options.where.id = params.id;
        findObject = options;
        findObject.include = userService.getIncludeModels();
        findObject.attributes = ['id', 'name', 'phone', 'email', 'status'];
        var userRepository = new UserRepository();
        userRepository.update(params, options, function(err, result) {
            if (err)
                return callback(err);
            return userRepository.find(findObject, callback);
        });
    }

    /**************** [Activate/Suspend/Permanent Suspend]  ******************
     ***************** [Super Admin/Admin/Field Sales Agent] *****************/

    setUserStatusByAdmin(params, callback) {
        var options = {};
        var findObject = {};
        options.where = {};
        options.where.id = params.id;
        findObject = options;
        findObject.attributes = ['id', 'name', 'phone', 'email', 'status'];
        var userRepository = new UserRepository();
        userRepository.updateAndFind(params, options, findObject, callback);
    }

    /**************** Send Push Notification From Admin CMS ****************/

    getActiveUsers(params, callback) {
        var id = params.id;
        var findObject = {};
        findObject.where = {};
        findObject.include = [{ model: UserGroups, as: 'userGroups', required: true, where: { name: 'User' } }];
        findObject.attributes = ['id', 'name', 'phone', 'email', 'status', 'profileImageUrl', 'latitude', 'longitude'];
        var userRepository = new UserRepository();
        if (id) {
            findObject.where.$and = {};
            findObject.where.$and.id = id;
            findObject.where.$and.status = 'Active';
            userRepository.find(findObject, callback);
        } else {
            findObject.where.status = 'Active';
            userRepository.findAll(findObject, callback);
        }
    }

    /**************** Send Push Notification From Admin CMS ****************/

    sendPushNotificationByAdmin(params, callback) {
        var userService = new UserService();
        var message = params.message;
        var userIds = params.id;
        if (!message || !userIds)
            return callback("Please give message and id");
        if (!_.isString(message))
            return callback("Message should be String");
        if (!_.isArray(userIds))
            return callback("Id should be an Array");
        if (_.isEmpty(userIds))
            return callback("Id Array should not be Empty");
        userService.getDeviceIds(params, callback);
    }

    getDeviceIds(params, callback) {
        var userService = new UserService();
        var getDeviceIdQueryString = "SELECT DISTINCT at.deviceId FROM Users " +
            "AS u INNER JOIN (UsersAccessTokens AS uat INNER JOIN AccessTokens " +
            "AS at ON at.id=uat.accessTokenId AND at.token IS NOT NULL AND at.deviceId IS NOT NULL) ON " +
            "u.id=uat.userId INNER JOIN UserGroups AS ug ON ug.id=u.userGroupId " +
            "AND ug.name='User' WHERE u.status='Active' AND u.id IN (" + params.id + ")";
        sequelize.query(getDeviceIdQueryString).spread(function(metaResult, result) {
            var notifyObject = {};
            var arrayOfDeviceId = _.map(result, 'deviceId');
            notifyObject.arrayOfDeviceId = arrayOfDeviceId;
            notifyObject.message = params.message;
            notifyObject.title = "Batua";
            userService.sendNotification(notifyObject);
            return callback(null, { message: "Notification Sent" });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /*********************** Logout From Admin CMS ****************************/

    adminLogout(params, callback) {
        var accessTokensService = new AccessTokensService();
        var newParams = {};
        newParams.token = null;
        var options = {};
        options.where = {};
        options.where.token = params.token;
        accessTokensService.update(newParams, options, function(err, result) {
            if (err)
                return callback(err);
            return callback(null, { message: "Logged out" });
        });
    }


    /****************** Normal Login Into Field Sales Agent App *******************/

    salesAgentNormalLogin(params, callback) {
        var userService = new UserService();
        var email = params.email;
        var phone = +params.phone;
        var password = params.password;
        var isValidEmail = userService.isValidEmail(email);
        var isValidPhone = userService.isValidPhone(phone);
        if ((email && phone) || (!email && !phone))
            return callback("Either phone or email is required !");
        if (phone && !isValidPhone)
            return callback("Mobile Number should be 10 digit Number");
        if (email && !isValidEmail)
            return callback("Invalid Email !")
        if ((isValidEmail && password) || (isValidPhone && password))
            return userService.findUserAndValidateLogin(params, callback);
        return callback("Email And Password Or Phone And Password Required !")
    }

    findUserAndValidateLogin(params, callback) {
        var userService = new UserService();
        var email = params.email;
        var phone = +params.phone;
        var findObject = {};
        findObject.where = {};
        (email) ? (findObject.where.email = email) : (findObject);
        (phone) ? (findObject.where.phone = phone) : (findObject);
        findObject.include = userService.getIncludeModels();
        Users.find(findObject).then(function(result) {
            if (!result && email)
                return callback("Incorrect Email");
            if (!result && phone)
                return callback("Incorrect Phone");
            userService.validateSalesLogin(params, result, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    validateSalesLogin(params, userData, callback) {
        var userService = new UserService();
        var requestedPassword = params.password;
        var resultedPassword = userData.password;
        var isValidPassword = (resultedPassword == md5(requestedPassword));
        var isValidSales = userService.validateSalesAgent(params, userData);
        if (!isValidSales)
            return callback("Permission Denied");
        if (isValidPassword) {
            userService.updateAccessTokenAndShowResult(params, userData, callback);
            return null;
        }
        callback("Incorrect Password");
        return null;
    }

    validateSalesAgent(params, result) {
        var name = result.userGroups.name;
        var status = result.status;
        var isValidGroupName = (name != 'User');
        var isValidStatus = (status == 'Active');
        if (result && isValidGroupName && isValidStatus)
            return true;
        return false;
    }

    /******************* Field Sales Agent App Login Through G+ *******************/

    salesAgentSocialLogin(params, callback) {
        var userService = new UserService();
        var email = params.email;
        var googleId = params.googleId;
        if (email && googleId)
            return userService.findAndUpdateGoogleId(params, callback);
        return callback("Email And Google Id Required");
    }

    findAndUpdateGoogleId(params, callback) {
        var userService = new UserService();
        var email = params.email;
        var googleId = params.googleId;
        var findObject = {};
        findObject.where = {};
        findObject.where.email = email;
        findObject.include = userService.getIncludeModels();
        Users.find(findObject).then(function(result) {
            var status = result.status;
            var group = result.userGroups.name;
            if (status != 'Active' || group == 'User')
                return callback('Field Sales Agent does not exist');
            userService.validateGoogleId(params, result, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    validateGoogleId(params, userData, callback) {
        var userService = new UserService();
        var googleId = params.googleId;
        var resultedGoogleId = (userData) ? (userData.googleId) : (null);
        var isValidGoogleId = (resultedGoogleId == googleId);
        if (userData && !resultedGoogleId)
            return userService.updateGoogleId(params, userData, callback);
        if (userData && resultedGoogleId && isValidGoogleId)
            return userService.updateAccessTokenAndShowResult(params, userData, callback);
        if (userData && resultedGoogleId && !isValidGoogleId)
            return callback("Incorrect Google Id");
        callback("Incorrect Gmail Id");
    }

    updateGoogleId(params, userData, callback) {
        var userService = new UserService();
        var userId = userData.id;
        var googleId = params.googleId;
        var updateObject = {};
        updateObject.googleId = googleId;
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = userId;
        Users.update(updateObject, whereObject).then(function(result) {
            userService.updateAccessTokenAndShowResult(params, userData, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /******************** Sends OTP To Sales Agent Phone ***********************/

    salesAgentForgotPassword(params, callback) {
        var userService = new UserService();
        var phone = params.phone;
        var isValidPhone = userService.isValidPhone(phone);
        if (!isValidPhone)
            return callback("10 Digit Phone is Required");
        var userType = 'Field Sales Agent';
        return userService.validateUserBeforeOtp(phone, userType, callback);
    }

    validateUserBeforeOtp(phone, userType, callback) {
        var userService = new UserService();
        var findObject = {};
        findObject.where = {};
        findObject.where.phone = phone;
        findObject.include = userService.getIncludeModels();
        Users.find(findObject).then(function(result) {
            if (!result)
                return callback("Unregistered Mobile Number");
            var group = result.userGroups.name;
            var status = result.status;
            if ((result.facebookId || result.googleId) && userType == 'User')
                return callback("Already a social user");
            if ( /*group != userType ||*/ status != 'Active')
                return callback("" + userType + " does not exist !");
            userService.sendOtp(phone, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    sendOtp(phone, callback) {
        var userService = new UserService();
        var smsService = new SmsService();
        var params = {};
        params.phone = phone;
        var otp = userService.generateOtp();
        var otpExpiresAt = moment().add(2, 'm').format("HH:mm:ss");
        params.message = "OTP for Batua App reset password is " + otp + " . Thank you.";
        smsService.send(params, function(err, result) {
            if (err) {
                console.log(err);
                return null;;
            }
            console.log(result);
        });
        userService.updateOtp(phone, otp, callback);
    }

    updateOtp(phone, otp, callback) {
        var updateObject = {};
        updateObject.otp = otp;
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.phone = phone;
        Users.update(updateObject, whereObject).then(function(result) {
            return callback(null, { message: "Otp Sent" });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /******************** OTP Verification is done here ***********************/

    salesAgentVerifyOtp(params, callback) {
        var userService = new UserService();
        var otp = params.otp;
        var phone = params.phone;
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.phone = phone;
        Users.find(whereObject).then(function(result) {
            if (!result)
                return callback("Incorrect Mobile Number");
            if (result.otp != otp)
                return callback("Incorrect OTP");
            userService.updateSalesOnOtp(params, result, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    updateSalesOnOtp(params, userData, callback) {
        var userService = new UserService();
        var updateObject = {};
        updateObject.otp = null;
        updateObject.isPhoneVerified = true;
        updateObject.status = 'Active';
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = userData.id;
        Users.update(updateObject, whereObject).then(function(result) {
            userService.updateAccessTokensOnOtp(params, userData, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    updateAccessTokensOnOtp(params, userData, callback) {
        var deviceId = params.deviceId;
        var updateObject = {};
        updateObject.token = null;
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.deviceId = deviceId;
        AccessTokens.update(updateObject, whereObject).then(function(result) {
            var data = {};
            data.userId = userData.id;
            return callback(null, data);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /*********************** Allows Sales Agent Reset ***************************
     ******************** Password After OTP Verification ************************/

    salesAgentResetPassword(params, callback) {
        var userService = new UserService();
        var userType = 'Field Sales Agent';
        userService.isValidUserToResetPassword(params, userType, callback);
    }

    isValidUserToResetPassword(params, userType, callback) {
        var userService = new UserService();
        var userId = params.userId;
        var newPassword = params.password;
        if (!userId || !newPassword)
            return callback("UserId And New Password Required");
        var isValidPassword = userService.isValidPassword(newPassword);
        if (!isValidPassword)
            return callback("Minimum Password length is 6 with no Spaces");
        var findObject = {};
        findObject.where = {};
        findObject.include = userService.getIncludeModels();
        findObject.where.$and = {};
        findObject.where.$and.id = userId;
        findObject.where.$and.status = 'Active';
        Users.find(findObject).then(function(result) {
            if (!result)
                return callback("Incorrect userId");
            // if (result.userGroups.name != userType)
            //     return callback("Not a " + userType + " !");
            userService.salesAgentUpdatePassword(params, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    salesAgentUpdatePassword(params, callback) {
        var userId = params.userId;
        var newPassword = md5(params.password);
        var updateObject = {};
        updateObject.password = newPassword;
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = userId;
        Users.update(updateObject, whereObject).then(function(result) {
            return callback(null, { message: "Password Reset" });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /**************** Gets User's Or Field Sales Agent's Profile ****************/

    getProfile(params, callback) {
        var salesagentId = params.salesagentId;
        var userId = params.userId;
        var userRepository = new UserRepository();
        var findObject = {};
        findObject.where = {};
        if (userId) {
            findObject.where.id = userId;
            findObject.attributes = ['id', 'name', 'phone', 'profileImageUrl', 'email', 'isPinActivated', 'pin'];
        }
        if (salesagentId) {
            findObject.where.id = salesagentId;
            findObject.attributes = ['id', 'name', 'profileImageUrl', 'email', 'pin'];
        }
        userRepository.find(findObject, function(err, result) {
            if (err)
                callback(err);
            if (!result)
                callback(null, result);
            result.dataValues.isPinSet = (result.pin) ? (true) : (false);
            delete result.dataValues.pin;
            callback(null, result);
        });
    }

    /**************** Updates User's Or Field Sales Agent's Profile ****************/

    updateSalesAgentProfile(params, callback) {
        var userService = new UserService();
        var salesagentId = params.salesagentId;
        var id = params.id;
        if (salesagentId == id)
            return userService.validateAndUpdateSalesAgentProfile(params, callback);
        return callback("Incorrect Id");
    }

    validateAndUpdateSalesAgentProfile(params, callback) {
        var userService = new UserService();
        var currentPassword = params.currentPassword;
        var newPassword = params.newPassword;
        if (currentPassword && newPassword)
            return userService.updateProfileWithPassword(params, callback);
        if (!currentPassword && !newPassword)
            return userService.updateProfileWithoutPassword(params, callback);
        return callback("Incorrect parameters");
    }

    updateProfileWithPassword(params, callback) {
        var userService = new UserService();
        var currentPassword = params.currentPassword;
        var newPassword = params.newPassword;
        var isValidCurrentPassword = userService.isValidPassword(currentPassword);
        var isValidNewPassword = userService.isValidPassword(newPassword);
        if (!isValidCurrentPassword || !isValidNewPassword)
            return callback("Minimum Password length is 6 with no Spaces");
        var id = params.id;
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = id;
        Users.find(whereObject).then(function(result) {
            if (result.password != md5(currentPassword))
                return callback('currentPassword incorrect');
            if (currentPassword == newPassword)
                return callback('New password and current password should be different');
            userService.updateProfile(params, callback);
            return null;
        }).catch(function(exception) {
            return callback('incorrect id');
        });
    }

    updateProfileWithoutPassword(params, callback) {
        var userService = new UserService();
        return userService.updateProfile(params, callback);
    }

    updateProfile(params, callback) {
        var userRepository = new UserRepository();
        var newParams = {};
        var profileImageUrl = params.profileImageUrl;
        var newPassword = params.newPassword;
        var name = params.name;
        (name) ? (newParams.name = name) : (newParams);
        (profileImageUrl) ? (newParams.profileImageUrl = profileImageUrl) : (newParams);
        (newPassword) ? (newParams.password = md5(newPassword)) : (newParams);
        var whereObject = {};
        var findObject = {};
        whereObject.where = {};
        whereObject.where.id = params.id;
        findObject = whereObject;
        findObject.attributes = ['id', 'name', 'email', 'profileImageUrl', 'phone', 'isPinActivated'];
        userRepository.updateAndFind(newParams, whereObject, findObject, callback);
    }

    /******************* Logout From Sales Agent App ************************/

    salesAgentLogout(params, callback) {
        var userService = new UserService();
        var userId = params.userId;
        var token = params.token;
        var deviceId = params.deviceId;
        if (userId && token && deviceId)
            return userService.updateTokensOnLogout(params, callback);
        return callback("UserId, Token And DeviceId Required");
    }

    updateTokensOnLogout(params, callback) {
        var userId = params.userId;
        var token = params.token;
        var deviceId = params.deviceId;
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.$or = [{ deviceId: deviceId }, { token: token }];
        var updateObject = {};
        updateObject.token = null;
        AccessTokens.update(updateObject, whereObject).then(function(result) {
            return callback(null, { message: "Logged out" });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /********************* Normal SignUp In User's App **************************/

    normalSignup(params, callback) {
        var userService = new UserService();
        var phone = params.phone;
        var email = params.email;
        email = (email) ? (email) : (null);
        var password = params.password;
        var isValidPhone = userService.isValidPhone(phone);
        var isValidPassword = userService.isValidPassword(password);
        if (!phone)
            return callback("Mobile Number Required")
        if (!isValidPhone)
            return callback("Mobile Number should be 10 digit Number");
        if (email && !userService.isValidEmail(email))
            return callback("Invalid Email")
        if (!isValidPassword)
            return callback("Minimum Password length is 6 with no Spaces");
        var newParams = {};
        newParams.phone = phone;
        newParams.email = email;
        newParams.password = password;
        newParams.userGroupId = 4;
        newParams.status = 'Drafted';
        userService.signupAndSendSms(newParams, callback);
    }

    signupAndSendSms(params, callback) {
        var userService = new UserService();
        var email = params.email;
        var phone = params.phone;
        var findObject = {};
        findObject.where = {};
        (email) ? (findObject.where.$or = [{ 'phone': phone }, { 'email': email }]) : (findObject);
        (!email) ? (findObject.where.phone = phone) : (findObject);
        Users.find(findObject).then(function(result) {
            if (result && (!email || (email && result.phone == phone)))
                return callback("Mobile Number Already Registered");
            if (result && email && result.email == email)
                return callback("Email Already Registered");
            userService.createNewUser(params, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    createNewUser(params, callback) {
        var userService = new UserService();
        Users.create(params).then(function(result) {
            var phone = params.phone;
            userService.sendSms(phone, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    sendSms(phone, callback) {
        var userService = new UserService();
        var smsService = new SmsService();
        var params = {};
        params.phone = phone;
        var otp = userService.generateOtp();
        var otpExpiresAt = moment().add(2, 'm').format("HH:mm:ss");
        params.message = "OTP for Batua App reset password is " + otp + " . Thank you.";
        smsService.send(params, function(err, result) {
            if (err) {
                console.log(err);
                return null;;
            }
            console.log(result);
        });
        userService.updateOtpForSignup(phone, otp, callback);
    }

    updateOtpForSignup(phone, otp, callback) {
        var updateObject = {};
        updateObject.otp = otp;
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.phone = phone;
        Users.update(updateObject, whereObject).then(function(result) {
            return callback(null, {
                message: "Registered Successfuly.Please verify phone and Signin."
            });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /******************** Facebook And G+ Signup In User's App **********************/

    socialSignup(params, callback) {
        var userService = new UserService();
        var email = params.email;
        var name = params.name;
        var googleId = params.googleId;
        var facebookId = params.facebookId;
        var isValidEmail = userService.isValidEmail(email);
        var findObject = {};
        findObject.where = {};
        (googleId) ? (findObject.where.$or = [{ email: email }, { googleId: googleId }]) : (findObject);
        (facebookId) ? (findObject.where.$or = [{ email: email }, { facebookId: facebookId }]) : (findObject);
        if (!email)
            return callback("Email Required");
        if (!isValidEmail)
            return callback("Invalid Email");
        if ((googleId && facebookId) || (!googleId && !facebookId))
            return callback("Please give either googleId or facebookId");
        userService.validateUserSignup(params, findObject, callback);
    }

    validateUserSignup(params, findObject, callback) {
        var userService = new UserService();
        var email = params.email;
        var name = params.name;
        var googleId = params.googleId;
        var facebookId = params.facebookId;
        Users.find(findObject).then(function(result) {
            if (result && googleId && (result.googleId == googleId || result.email == email))
                return callback("Gmail Already Registered");
            if (result && facebookId && (result.facebookId == facebookId || result.email == email))
                return callback("Facebook Email Already Registered");
            var newParams = {};
            newParams.name == name;
            newParams.email = email;
            (googleId) ? (newParams.googleId = googleId) : (newParams);
            (facebookId) ? (newParams.facebookId = facebookId) : (newParams);
            newParams.userGroupId = 4;
            newParams.status = 'Drafted';
            userService.createUserForSocialSignup(newParams, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    createUserForSocialSignup(params, callback) {
        Users.create(params).then(function(result) {
            return callback(null, { userId: result.id });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /********************* Sends OTP After Signup In User App ***********************/

    sendOtpForSignup(params, callback) {
        var userService = new UserService();
        // var userId = params.userId;
        var phone = params.phone;
        var otp = userService.generateOtp();
        var isValidPhone = userService.isValidPhone(phone);
        var findObject = {};
        findObject.include = userService.getIncludeModels();
        findObject.where = {};
        findObject.where.$and = {};
        findObject.where.$and.phone = phone;
        // findObject.where.$and.$or = [{ googleId: { $ne: null } }, { facebookId: { $ne: null } }];
        // findObject.where.$and.status = 'Drafted';
        if (!phone)
            return callback("Please give phone");
        if (!isValidPhone)
            return callback("Mobile Number should be 10 digit Number");
        userService.isPhoneExist(params, findObject, callback);
    }

    isPhoneExist(params, findObject, callback) {
        var userService = new UserService();
        var phone = params.phone;
        var type = params.type;
        Users.count({ where: { phone: phone } }).then(function(result) {
            if (result && type == 'send')
                return callback("Mobile Number is already Registered");
            if (!result && type == 'resend')
                return callback("Mobile Number is not Registered");
            userService.validateOtpForSignup(params, findObject, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    validateOtpForSignup(params, findObject, callback) {
        var userService = new UserService();
        Users.find(findObject).then(function(result) {
            if (!result)
                return callback("Incorrect Id");
            // if (result && result.userGroups.name != 'User')
            //     return callback("User does not exist");
            userService.updatePhoneForSendOtp(params, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    updatePhoneForSendOtp(params, callback) {
        var userService = new UserService();
        // var userId = params.userId;
        var phone = params.phone;
        // var updateObject = {};
        // var whereObject = {};
        // updateObject.phone = phone;
        // whereObject.where = {};
        // whereObject.where.id = userId;
        // Users.update(updateObject, whereObject).then(function(result) {
        userService.sendSms(phone, function(err, result) {
            if (result)
                return callback(null, { message: "OTP Sent" });
            return callback(err);
        });
        // return null;
        // }).catch(function(exception) {
        //     callback(exception);
        // });
    }

    /****************** OTP Verification After Signup In User App ********************/

    verifyOtpForSignup(params, callback) {
        var userService = new UserService();
        var otp = params.otp;
        var phone = params.phone;
        var findObject = {};
        findObject.where = {};
        findObject.where.$and = {};
        findObject.where.$and.phone = phone;
        //findObject.where.$and.status = 'Drafted';
        findObject.include = userService.getIncludeModels();
        userService.validateOtpVerification(params, findObject, callback);
    }

    validateOtpVerification(params, findObject, callback) {
        var userService = new UserService();
        var otp = params.otp;
        Users.find(findObject).then(function(result) {
            if (!result)
                return callback("Incorrect Mobile Number");
            if (result.otp != otp)
                return callback("Incorrect OTP");
            var userId = result.id;
            userService.deleteOtp(userId, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    deleteOtp(userId, callback) {
        var updateObject = {};
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = userId;
        updateObject.otp = null;
        updateObject.status = 'Active';
        updateObject.isPhoneVerified = true;
        Users.update(updateObject, whereObject).then(function(result) {
            callback(null, { message: "Mobile Number Verified" });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /******************** Normal Login In User App ************************/

    normalLogin(params, callback) {
        var userService = new UserService();
        var userName = params.userName;
        var password = params.password;
        var isValidPassword = userService.isValidPassword(password);
        var findObject = {};
        findObject.include = userService.getIncludeModels();
        findObject.where = {};
        findObject.where.$and = {};
        if (!userName)
            return callback("Please give Mobile Number or email");
        if (!isValidPassword)
            return callback("Minimum Password length is 6 with no Spaces");
        if (!isNaN(+userName) && !userService.isValidPhone(+userName))
            return callback("Mobile Number should be 10 Digit");
        if (isNaN(+userName) && !userService.isValidEmail(userName))
            return callback("Invalid Email");
        if (!isNaN(+userName) && userService.isValidPhone(+userName))
            findObject.where.$and.phone = userName;
        if (isNaN(+userName) && userService.isValidEmail(userName))
            findObject.where.$and.email = userName;
        findObject.where.$and.password = md5(password);
        userService.validateUserLogin(params, findObject, 'normal', callback);
    }

    validateUserLogin(params, findObject, type, callback) {
        var userService = new UserService();
        Users.find(findObject).then(function(result) {
            if (!result && type == 'social')
                return callback("Email is not registered. Please proceed with Sign UP");
            if (!result && type == 'normal')
                return callback("Incorrect credentials");
            var group = result.userGroups.name;
            var isPhoneVerified = result.isPhoneVerified;
            var status = result.status;
            // if (result && group != 'User')
            //     return callback("User does not exist");
            if (status == 'Permanent Suspend' || status == 'Suspend')
                return callback("Mobile Number is already Registered, but is in " + status + " Mode. Please contact Batua Admin");
            if (!isPhoneVerified)
                return callback(null, { userId: result.id, isPhoneVerified: isPhoneVerified });
            userService.updateAccessTokenAndShowResult(params, result, function(err, data) {
                if (err)
                    return callback(err);
                userService.getWalletBalance(data.id, function(err, balance) {
                    if (err)
                        return callback(err);
                    data.balance = balance;
                    callback(null, data);
                });
            });
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    getWalletBalance(userId, callback) {

        var getWalletBalanceQueryString = "SELECT balance FROM UsersPaymentmodes WHERE userId = :userId";
        var options = {};
        options.replacements = {};
        options.replacements.userId = userId;
        options.type = sequelize.QueryTypes.SELECT;

        sequelize.query(getWalletBalanceQueryString, options).then(function(result) {
            if (result && result.length)
                callback(null, result[0].balance);
            if (!result || !result.length)
                callback(null, 0);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /******************** Social Login In User App ************************/

    socialLogin(params, callback) {
        var userService = new UserService();
        var email = params.email;
        var googleId = params.googleId;
        var facebookId = params.facebookId;
        var isValidEmail = userService.isValidEmail(email);
        if (!isValidEmail)
            return callback("Invalid Email");
        var findObject = {};
        findObject.where = {};
        findObject.include = userService.getIncludeModels();
        (googleId) ? (findObject.where.$or = [{ email: email }, { googleId: googleId }]) : (findObject);
        (facebookId) ? (findObject.where.$or = [{ email: email }, { facebookId: facebookId }]) : (findObject);
        userService.validateUserLogin(params, findObject, 'social', callback);
    }

    /******************** Sends OTP On Forgot Password In User App ***********************/

    forgotPassword(params, callback) {
        var userService = new UserService();
        var phone = params.phone;
        var isValidPhone = userService.isValidPhone(phone);
        if (!isValidPhone)
            return callback("Mobile Number should be 10 digit Number");
        var userType = 'User';
        return userService.validateUserBeforeOtp(phone, userType, callback);
    }

    /***************** Verify OTP After Forgot Password In User App ********************/

    verifyOtp(params, callback) {
        var userService = new UserService();
        userService.salesAgentVerifyOtp(params, callback);
    }

    /******************** Reset Password After OTP Verification ***********************/

    resetPassword(params, callback) {
        var userService = new UserService();
        var userType = 'User';
        userService.isValidUserToResetPassword(params, userType, callback);
    }

    /***************** Updates User's Profile Information **********************/

    validateAndUpdateUserProfile(params, callback) {
        var userService = new UserService();
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = params.id;
        whereObject.include = userService.getIncludeModels();
        Users.find(whereObject).then(function(result) {
            if (!result)
                return callback("Incorrect Id");
            userService.validateUserProfile(params, result, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    validateUserProfile(params, userData, callback) {
        var userService = new UserService();
        var email = params.email;
        var resultedEmail = userData.email;
        var userGroupName = userData.userGroups.name;
        // if (userData && userGroupName != "User")
        //     return callback("User does not exist");
        if (userData && email && resultedEmail)
            return callback("Email Is One Time Editable");
        if (userData && ((!resultedEmail && email) || (resultedEmail && !email)))
            return userService.updateUserProfile(params, userData, callback);
    }

    updateUserProfile(params, userData, callback) {
        var updateObject = {};
        var name = params.name;
        var email = params.email;
        var profileImageUrl = params.profileImageUrl;
        (name) ? (updateObject.name = name) : (updateObject);
        (profileImageUrl) ? (updateObject.profileImageUrl = profileImageUrl) : (updateObject);
        (email) ? (updateObject.email = email) : (updateObject);
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = params.id;
        var findObject = {};
        findObject.where = whereObject.where;
        findObject.attributes = ['id', 'name', 'phone', 'profileImageUrl', 'email', 'isPinActivated'];
        var userRepository = new UserRepository();
        userRepository.updateAndFind(updateObject, whereObject, findObject, callback);
    }

    /******************* Validates Old Password And Set New Password *******************/

    changePassword(params, callback) {
        var userService = new UserService();
        userService.isValidParamsToChangePassword(params, callback);
    }

    /******************** Enable/Disable PIN Lock ***************************/

    updatePinStatus(params, callback) {
        var userService = new UserService();
        var userId = params.userId;
        var isPinActivated = params.isPinActivated;
        if (!_.isBoolean(isPinActivated))
            return callback("isPinActivated should be Boolean");
        if (userId && !(isPinActivated == null || undefined))
            return userService.updateUsersPinStatus(params, callback);
        return callback("userId And isPinActivated Required");
    }

    updateUsersPinStatus(params, callback) {
        var userId = params.userId;
        var isPinActivated = params.isPinActivated;
        var userRepository = new UserRepository();
        var updateObject = {};
        var whereObject = {};
        var findObject = {};
        whereObject.where = {};
        whereObject.where.id = userId;
        findObject.where = whereObject.where;
        findObject.attributes = ['id', 'name', 'email', 'profileImageUrl', 'phone', 'isPinActivated'];
        updateObject.isPinActivated = isPinActivated;
        userRepository.updateAndFind(updateObject, whereObject, findObject, callback);
    }

    /****************** PIN Login In User App **********************/

    pinLogin(params, callback) {
        var userService = new UserService();
        var userId = params.userId;
        var pin = params.pin;
        var deviceId = params.deviceId;
        var token = params.token;
        if (!userId || !pin || !deviceId || !token)
            return callback("Please give userId,pin,deviceId,Access-Token");
        if (!userService.isValidPin(pin))
            return callback("Pin should be 4 digit Number");
        userService.findUserAndValidatePin(params, callback);
    }

    findUserAndValidatePin(params, callback) {
        var userId = params.userId;
        var pin = params.pin;
        var deviceId = params.deviceId;
        var token = params.token;
        var findObject = {};
        findObject.where = {};
        findObject.where.id = userId;
        findObject.include = [{ model: UserGroups, as: 'userGroups', required: false },
            { model: AccessTokens, as: 'accessTokens', required: false, where: { $and: { token: token, deviceId: deviceId } } }
        ];
        Users.find(findObject).then(function(result) {
            if (!result)
                return callback("Incorrect userId or Access Token or DeviceId");
            var loggedinResult = {};
            loggedinResult.id = result.id;
            loggedinResult.name = result.name;
            loggedinResult.email = result.email;
            loggedinResult.profileImageUrl = result.profileImageUrl;
            loggedinResult.phone = result.phone;
            loggedinResult.isPhoneVerified = result.isPhoneVerified;
            loggedinResult.userGroup = result.userGroups.name;
            if ( /*result.userGroups.name != 'User' ||*/ result.status != 'Active')
                return callback("User does not exist");
            if (!result.isPinActivated)
                return callback("PIN is not Active");
            if (result.pin != pin)
                return callback("Incorrect PIN");
            loggedinResult.isPinActivated = true;
            loggedinResult.isPinSet = true;
            if (result.pin == pin) {
                var userService = new UserService();
                userService.getWalletBalance(loggedinResult.id, function(err, balance) {
                    if (err)
                        return callback(err);
                    loggedinResult.balance = balance;
                    return callback(null, loggedinResult);
                });
                return null;
            }
            return callback("Something went Wrong");
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /****************** Sends OTP On Forgot PIN In User App **********************/

    forgotPin(params, callback) {
        var userService = new UserService();
        userService.forgotPassword(params, callback);
    }

    /****************** Set Or Reset PIN ***********************/

    resetPin(params, callback) {
        var userService = new UserService();
        var userId = params.userId;
        var pin = params.pin;
        if (!userId && !pin)
            return callback("userId and pin is required");
        var isValidPin = userService.isValidPin(pin);
        if (!isValidPin)
            return callback("Pin should be 4 digit Number");
        var findObject = {};
        findObject.where = {};
        findObject.where.id = userId;
        findObject.include = userService.getIncludeModels();
        Users.find(findObject).then(function(result) {
            if (!result)
                return callback("Incorrect userId");
            var group = result.userGroups.name;
            var status = result.status;
            if ( /*group != 'User' ||*/ status != 'Active')
                return callback("User does not exist");
            userService.updatePinForResetPin(params, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    updatePinForResetPin(params, callback) {
        var updateObject = {};
        updateObject.pin = params.pin;
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = params.userId;
        Users.update(updateObject, whereObject).then(function(result) {
            callback(null, "PIN is Reset");
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /****************** Validates Old PIN And Set New PIN ***********************/

    changePin(params, callback) {
        var userService = new UserService();
        var userId = params.userId;
        var currentPin = params.currentPin;
        var newPin = params.newPin;
        if (!userId || !currentPin || !newPin)
            return callback("User Id, Current PIN And New PIN Required");
        if (userId && !_.isInteger(currentPin))
            return callback("Current PIN should be 4 Digit Integer");
        if (userId && !_.isInteger(newPin))
            return callback("New PIN should be 4 Digit Integer");
        if (userId && !_.inRange(currentPin, 1000, 10000))
            return callback("Incorrect Current PIN");
        if (userId && !_.inRange(newPin, 1000, 10000))
            return callback("New PIN should be 4 Digit Integer");
        if (userId && (newPin == currentPin))
            return callback("New PIN And Current PIN should be different");
        return userService.validatePin(userId, currentPin, newPin, callback);
    }

    validatePin(userId, currentPin, newPin, callback) {
        var userService = new UserService();
        var findObject = {};
        findObject.where = {};
        findObject.where.id = userId;
        findObject.include = userService.getIncludeModels();
        Users.find(findObject).then(function(result) {
            if (!result)
                return callback("Incorrect User Id");
            if ( /*result.userGroups.name != 'User' ||*/ result.status != "Active")
                return callback("User does not exist");
            if (!result.isPinActivated)
                return callback("Please Enable PIN Settings");
            if (currentPin != result.pin)
                return callback("Incorrect Current PIN");
            if (currentPin == result.pin)
                return userService.updatePin(userId, newPin, callback);
            return callback("Something Went Wrong");
        }).catch(function(exception) {
            callback(exception);
        });
    }

    updatePin(userId, newPin, callback) {
        var updateObject = {};
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = userId;
        updateObject.pin = newPin;
        Users.update(updateObject, whereObject).then(function(result) {
            return callback(null, { message: "PIN Reset" });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    /********************** Contact Us User App ***********************/

    contactus(params, callback) {
        var userService = new UserService();
        var email = params.email;
        var query = params.query;
        userService.respondContact(email, 'support@thebatua.com', 'User');
        userService.respondContact('support@thebatua.com', email, 'Batua');
        callback(null, { message: "Email Sent" });
    }

    respondContact(emailTo, emailFrom, emailToUserType) {
        var awsSesService = new AwsSesService();
        var params = {};
        params.sender = emailFrom;
        params.receivers = [];
        params.receivers.push(emailTo);
        params.subjectText = 'Welcome to Batua !!!';
        params.bodyText = 'Welcome to Batua !!!';
        if (emailToUserType == 'User') {
            var templatPath = './api/templates/contact-us/response_contact_us.ejs';
            params.htmlTemplate = fs.readFileSync(templatPath, "utf-8");
        }
        if (emailToUserType == 'Batua') {
            var templatPath = './api/templates/contact-us/query_contact_us.ejs';
            var template = fs.readFileSync(templatPath, "utf-8");
            var query = params.query;
            params.htmlTemplate = template.replace(/Query detail description will be visible here/g, query);
        }
        awsSesService.sendEmail(params, function(err, result) {
            if (err)
                console.log(err);
            else
                console.log(result);
        });
    }

    /********************** Logout From User App ***********************/

    logout(params, callback) {
        var userService = new UserService();
        var userId = params.userId;
        var token = params.token;
        var deviceId = params.deviceId;
        if (userId && token && deviceId)
            return userService.updateTokensOnLogout(params, callback);
        return callback("UserId, Token And DeviceId Required");
    }

    /********************************************************************/

}

module.exports = UserService;
