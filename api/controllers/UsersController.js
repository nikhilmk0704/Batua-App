/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

    create: function(req, res) {
        var params = req.body;
        var userService = new UserService();
        userService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } 
            return res.json(201,result);
        });
    }
};

