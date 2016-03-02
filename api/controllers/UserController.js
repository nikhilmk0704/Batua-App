/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

module.exports = {

    create: function(req, res) {

        var params = req.body;

        var userService = new UserService();
        userService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.jsonx(result);
            }
        });
    }
};
