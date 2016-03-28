/**
 * UserGroupsController
 *
 * @description :: Server-side logic for managing Usergroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

    create: function(req, res) {
        var params = req.body;
        var userGroupService = new UserGroupService();
        userGroupService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(201,result);
            }
        });
    },

    find: function(req, res) {
        var id = req.param('id');
        var userGroupService = new UserGroupService();
        userGroupService.find(id, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200,result);
            }
        });
    },

    update: function(req, res) {
        var params=req.body;
        var userGroupService = new UserGroupService();
        userGroupService.updateAndFind(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200,result);
            }
        });
    },

    delete: function(req, res) {
        var id=req.param('id');
        var userGroupService = new UserGroupService();
        userGroupService.delete(id, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200,result);
            }
        });
    }
};

