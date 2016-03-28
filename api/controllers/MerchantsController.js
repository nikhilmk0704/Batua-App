/**
 * MerchantsController
 *
 * @description :: Server-side logic for managing Merchants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict'

module.exports = {

    create: function(req, res) {
        var params = req.body;
        var merchantService = new MerchantService();
        merchantService.save(params, function(err, result) {
            if (err) {
                merchantService.delete(params);
                return res.badRequest(err);
            } 
            return res.json(201, result);
        });
    },

    find: function(req, res) {
        var merchantService = new MerchantService();
        merchantService.find(req, function(err, result) {
            if (err) {
                return res.badRequest(err);
            }
            return res.json(200, result);
        });

    },

    update: function(req, res) {
        var merchantService = new MerchantService();
        merchantService.update(req, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } 
            return res.json(200, result);
        });
    },

    setStatus: function(req, res) {
        var merchantService = new MerchantService();
        merchantService.update(req, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } 
            return res.json(200, result);
        });
    }

};
