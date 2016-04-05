/**
 * MerchantsController
 *
 * @description :: Server-side logic for managing Merchants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict'

module.exports = {

    create: function(req, res) {
        var params={};
        var params = req.body;
        var merchantService = new MerchantService();
        merchantService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } 
            return res.json(201, result);
        });
    },

    find: function(req, res) {
        var params={};
        params.id = req.param('id');
        params.userId = req.param('userId');
        params.salesAgentId = req.param('salesAgentId');
        params.adminId = req.param('adminId');
        var merchantService = new MerchantService();
        merchantService.find(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            }
            if(_.isEmpty(result)){
                return res.notFound("Does not exist");
            }
            return res.json(200, result);
        });

    },

    update: function(req, res) {
        var params={};
        params=req.body;
        var merchantService = new MerchantService();
        merchantService.update(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } 
            return res.json(200, result);
        });
    },

    setStatus: function(req, res) {
        var params={};
        params=req.body;
        var merchantService = new MerchantService();
        merchantService.setStatus(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } 
            return res.json(200, result);
        });
    }

};
