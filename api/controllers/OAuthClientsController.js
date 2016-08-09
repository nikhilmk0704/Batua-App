/**
 * OAuthClientsController
 *
 * @description :: Server-side logic for managing Oauthclients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

    create: function(req, res) {

        var params = req.body;

        var oAuthClientsService = new OAuthClientsService();
        oAuthClientsService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.jsonx(result);
            }
        });
    }
};

