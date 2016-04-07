/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

    createUserByAdmin:function(req,res){
        var params={};
        params.name=req.body.name;
        params.email=req.body.email;
        params.phone=req.body.phone;
        params.profileImageUrl=req.body.profileImageUrl;
        params.userGroupId=req.body.userGroupId;
        var userService = new UserService();
        userService.createUserByAdmin(params,function(err,result){
            if(err){
                return res.badRequest(userService.generateErrorMessage(err));
            }
            return res.json(201,result);
        });
    },

    findUserByAdmin:function(req,res){
        var params={};
        params.id=req.param('id');
        var userService = new UserService();
        userService.findUserByAdmin(params,function(err,result){
            if(err)
                return res.badRequest(userService.generateErrorMessage(err));
            if(_.isEmpty(result))
                return res.notFound(userService.generateErrorMessage("Does not exist"));
            return res.json(200,result);
        })
    },

    updateUserByAdmin:function(req,res){
        var params={};
        params.id=req.body.id;
        params.name=req.body.name;
        params.email=req.body.email;
        params.phone=req.body.phone;
        params.profileImageUrl=req.body.profileImageUrl;
        params.userGroupId=req.body.userGroupId;
        var userService = new UserService();
        userService.updateUserByAdmin(params,function(err,result){
            if(err)
                return res.badRequest(userService.generateErrorMessage(err));
            return res.json(200,result);
        });
    },

    setUserStatusByAdmin:function(req,res){
        var params={};
        params.id=req.body.id;
        params.status=req.body.status;
        var userService = new UserService();
        userService.setUserStatusByAdmin(params,function(err,result){
            if(err)
                return res.badRequest(userService.generateErrorMessage(err));
            return res.json(200,result);
        });
    },

    adminLogin:function(req,res){
        var params={};
        params.email=req.body.email;
        params.password=req.body.password;
        var userService = new UserService();
        userService.adminLogin(params,function(err,result){
            if(err)
                return res.badRequest(userService.generateErrorMessage(err));
            return res.json(200,result);
        });
    },

    adminLogout:function(req,res){
        var params={};
        params.token=req.body.token;
        var userService = new UserService();
        userService.adminLogout(params,function(err,result){
            if(err)
                return res.badRequest(userService.generateErrorMessage(err));
            return res.json(200,result);
        });
    },

    adminForgotPassword:function(req,res){
        var params={};
        params.email=req.body.email;
        var userService = new UserService();
        userService.adminForgotPassword(params,function(err,result){
            if(err)
                return res.badRequest(userService.generateErrorMessage(err));
            return res.json(200,result);
        });
    },

    adminResetPassword:function(req,res){
        var params={};
        params.email=req.body.email;
        params.password=req.body.password;
        params.confirmPassword=req.body.confirmPassword;
        params.accessToken=req.body.accessToken;
        var userService = new UserService();
        userService.adminResetPassword(params,function(err,result){
            if(err)
                return res.badRequest(userService.generateErrorMessage(err));
            return res.json(200,result);
        });
    },    

    getProfile:function(req,res){
        var params={};
        params.salesagentId=req.param('salesagentId');
        params.userId=req.param('userId');
        var userService = new UserService();
        userService.getProfile(params,function(err,result){
            if(err)
                return res.badRequest(userService.generateErrorMessage(err));
            return res.json(200,result);
        })
    },

};

