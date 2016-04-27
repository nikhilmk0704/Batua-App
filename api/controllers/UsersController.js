/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

var error = require('../errors/error.js');

module.exports = {

    /********************* Admin API ************************/

    adminLogin: function(req, res) {
        var params = {};
        params.email = req.body.email;
        params.password = req.body.password;
        var userService = new UserService();
        userService.adminLogin(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    adminForgotPassword: function(req, res) {
        var params = {};
        params.email = req.body.email;
        var userService = new UserService();
        userService.adminForgotPassword(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    adminResetPassword: function(req, res) {
        var params = {};
        params.email = req.body.email;
        params.password = req.body.password;
        params.accessToken = req.headers['access-token'];
        var userService = new UserService();
        userService.adminResetPassword(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    adminChangePassword: function(req, res) {
        var params = {};
        params.userId = req.body.userId;
        params.currentPassword = req.body.currentPassword;
        params.newPassword = req.body.newPassword;
        var userService = new UserService();
        userService.adminChangePassword(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    createUserByAdmin: function(req, res) {
        var params = {};
        params.name = req.body.name;
        params.email = req.body.email;
        params.phone = req.body.phone;
        params.profileImageUrl = req.body.profileImageUrl;
        params.userGroupId = req.body.userGroupId;
        var userService = new UserService();
        userService.createUserByAdmin(params, function(err, result) {
            if (err) {
                return res.badRequest(error.send(err));
            }
            return res.json(201, result);
        });
    },

    findUserByAdmin: function(req, res) {
        var params = {};
        params.id = req.param('id');
        var userService = new UserService();
        userService.findUserByAdmin(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            if (_.isEmpty(result))
                return res.notFound(error.send("Does not exist"));
            return res.json(200, result);
        });
    },

    updateUserByAdmin: function(req, res) {
        var params = {};
        params.id = req.body.id;
        params.name = req.body.name;
        params.phone = req.body.phone;
        params.profileImageUrl = req.body.profileImageUrl;
        params.userGroupId = req.body.userGroupId;
        var userService = new UserService();
        userService.updateUserByAdmin(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    setUserStatusByAdmin: function(req, res) {
        var params = {};
        params.id = req.body.id;
        params.status = req.body.status;
        var userService = new UserService();
        userService.setUserStatusByAdmin(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    getActiveUsers:function(req,res){
        var params = {};
        params.id = req.param('id');
        var userService = new UserService();
        userService.getActiveUsers(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            if (_.isEmpty(result))
                return res.notFound(error.send("Does not exist"));
            return res.json(200, result);
        });
    },

    sendPushNotificationByAdmin: function(req, res) {
        var params = {};
        params.message = req.body.message;
        params.id = req.body.id;            // id should be in Array.
        var userService = new UserService();
        userService.sendPushNotificationByAdmin(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    adminLogout: function(req, res) {
        var params = {};
        params.token = req.headers['access-token'];
        var userService = new UserService();
        userService.adminLogout(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    /********************* Field Sales Agent API ************************/

    salesAgentNormalLogin: function(req, res) {
        var params = {};
        params.email = req.body.email;
        params.password = req.body.password;
        params.deviceId = req.body.deviceId;
        var userService = new UserService();
        userService.salesAgentNormalLogin(params, function(err, result) {
            if (err)
                return res.json(401, error.send(err));
            return res.json(200, result);
        });
    },

    salesAgentSocialLogin: function(req, res) {
        var params = {};
        params.email = req.body.email;
        params.googleId = req.body.googleId;
        params.deviceId = req.body.deviceId;
        var userService = new UserService();
        userService.salesAgentSocialLogin(params, function(err, result) {
            if (err)
                return res.json(401, error.send(err));
            return res.json(200, result);
        });
    },

    salesAgentResetPassword: function(req, res) {
        var params = {};
        params.userId = req.body.userId;
        params.password = req.body.password;
        var userService = new UserService();
        userService.salesAgentResetPassword(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    salesAgentForgotPassword: function(req, res) {
        var params = {};
        params.phone = req.body.phone;
        var userService = new UserService();
        userService.salesAgentForgotPassword(params, function(err, result) {
            if (err)
                return res.json(401, error.send(err));
            return res.json(200, result);
        });
    },

    salesAgentVerifyOtp: function(req, res) {
        var params = {};
        params.otp = req.body.otp;
        params.phone = req.body.phone;
        params.deviceId = req.body.deviceId;
        var userService = new UserService();
        userService.salesAgentVerifyOtp(params, function(err, result) {
            if (err)
                return res.json(401, error.send(err));
            return res.json(200, result);
        });
    },

    getProfile: function(req, res) {
        var params = {};
        params.salesagentId = req.param('salesagentId');
        params.userId = req.param('userId');
        var userService = new UserService();
        userService.getProfile(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            if (_.isEmpty(result))
                return res.notFound(error.send("Does not exist"));
            return res.json(200, result);
        })
    },

    updateSalesAgentProfile: function(req, res) {
        var params = {};
        params.salesagentId = req.param('salesagentId');
        params.id = req.body.id;
        params.name = req.body.name;
        params.profileImageUrl = req.body.profileImageUrl;
        params.newPassword = req.body.newPassword;
        params.currentPassword = req.body.currentPassword;
        var userService = new UserService();
        userService.updateSalesAgentProfile(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    salesAgentLogout: function(req, res) {
        var params = {};
        params.token = req.headers['access-token'];
        params.deviceId = req.body.deviceId;
        params.userId = req.body.userId;
        var userService = new UserService();
        userService.salesAgentLogout(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    /********************* User API ************************/

    normalSignup: function(req, res) {
        var params = {};
        params.phone = req.body.phone;
        params.email = req.body.email;
        params.password = req.body.password;
        var userService = new UserService();
        userService.normalSignup(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(201, result);
        });
    },

    socialSignup: function(req, res) {
        var params = {};
        params.name = req.body.name;
        params.email = req.body.email;
        params.googleId = req.body.googleId;
        params.facebookId = req.body.facebookId;
        var userService = new UserService();
        userService.socialSignup(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(201, result);
        });
    },

    sendOtpForSignup: function(req, res) {
        var params = {};
        params.phone = req.body.phone;
        params.userId = req.body.userId;
        var userService = new UserService();
        userService.sendOtpForSignup(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    verifyOtpForSignup: function(req, res) {
        var params = {};
        params.phone = req.body.phone;
        params.otp = req.body.otp;
        var userService = new UserService();
        userService.verifyOtpForSignup(params, function(err, result) {
            if (err)
                return res.json(401, error.send(err));
            return res.json(200, result);
        });
    },

    normalLogin: function(req, res) {
        var params = {};
        params.userName = req.body.userName;
        params.password = req.body.password;
        params.deviceId = req.body.deviceId;
        var userService = new UserService();
        userService.normalLogin(params, function(err, result) {
            if (err)
                return res.json(401, error.send(err));
            return res.json(200, result);
        });
    },

    socialLogin: function(req, res) {
        var params = {};
        params.email = req.body.email;
        params.googleId = req.body.googleId;
        params.facebookId = req.body.facebookId;
        params.deviceId = req.body.deviceId;
        var userService = new UserService();
        userService.socialLogin(params, function(err, result) {
            if (err)
                return res.json(401, error.send(err));
            return res.json(200, result);
        });
    },

    forgotPassword: function(req, res) {
        var params = {};
        params.phone = req.body.phone;
        var userService = new UserService();
        userService.forgotPassword(params, function(err, result) {
            if (err)
                return res.json(400, error.send(err));
            return res.json(200, result);
        });
    },

    verifyOtp: function(req, res) {
        var params = {};
        params.otp = req.body.otp;
        params.phone = req.body.phone;
        params.deviceId = req.body.deviceId;
        var userService = new UserService();
        userService.verifyOtp(params, function(err, result) {
            if (err)
                return res.json(401, error.send(err));
            return res.json(200, result);
        });
    },

    resetPassword: function(req, res) {
        var params = {};
        params.userId = req.body.userId;
        params.password = req.body.password;
        var userService = new UserService();
        userService.resetPassword(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    updateUserProfile: function(req, res) {
        var params = {};
        params.id = req.body.id;
        params.name = req.body.name;
        params.profileImageUrl = req.body.profileImageUrl;
        params.email = req.body.email;
        var userService = new UserService();
        userService.validateAndUpdateUserProfile(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    changePassword: function(req, res) {
        var params = {};
        params.userId = req.body.userId;
        params.currentPassword = req.body.currentPassword;
        params.newPassword = req.body.newPassword;
        var userService = new UserService();
        userService.changePassword(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    updatePinStatus: function(req, res) {
        var params = {};
        params.userId = req.body.userId;
        params.isPinActivated = req.body.isPinActivated;
        var userService = new UserService();
        userService.updatePinStatus(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    pinLogin: function(req, res) {
        var params = {};
        params.token = req.headers['access-token'];
        params.deviceId = req.body.deviceId;
        params.userId = req.body.userId;
        params.pin = req.body.pin;
        var userService = new UserService();
        userService.pinLogin(params, function(err, result) {
            if (err)
                return res.json(401, error.send(err));
            return res.json(200, result);
        });
    },

    forgotPin: function(req, res) {
        var params = {};
        params.phone = req.body.phone;
        var userService = new UserService();
        userService.forgotPin(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    changePin: function(req, res) {
        var params = {};
        params.userId = req.body.userId;
        params.currentPin = req.body.currentPin;
        params.newPin = req.body.newPin;
        var userService = new UserService();
        userService.changePin(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    logout: function(req, res) {
        var params = {};
        params.token = req.headers['access-token'];
        params.deviceId = req.body.deviceId;
        params.userId = req.body.userId;
        var userService = new UserService();
        userService.logout(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

};
