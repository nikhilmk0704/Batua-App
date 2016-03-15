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
                return res.badRequest(err);
            } else {
                return res.json(201, { result: result });
            }
        });
    },

    find: function(req, res) {

        var _id = req.param('id');
        var params = {};
        if (_id) {
            params.where = {};
            params.where.id = _id;
            var merchantService = new MerchantService();
            merchantService.find(params, function(err, result) {
                if (err) {
                    return res.badRequest(err);
                } else {
                    return res.json(200, { result: result });
                }
            });
        } else {
            var merchantService = new MerchantService();
            merchantService.findAll(params, function(err, result) {
                if (err) {
                    return res.badRequest(err);
                } else {
                    return res.json(200, { result: result });
                }
            });
        }
    },

    update: function(req, res) {

        var params = {};
        var options = {};
        params.name = req.body.name;
        options.where = {};
        options.where.id = req.body.id;

        var merchantService = new MerchantService();
        merchantService.update(params, options, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200, { result: result });
            }
        });
    },

    delete: function(req, res) {

        var _id = req.param('id');
        var options = {};
        options.where = {};
        options.where.id = _id;

        var merchantService = new MerchantService();
        merchantService.delete(options, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200, { result: result });
            }
        });
    },

    Setstatus: function(req, res) {

        var params = {};
        var options = {};
        params.statusId = req.body.statusId;
        options.where = {};
        options.where.id = req.body.id;

        var merchantService = new MerchantService();
        merchantService.update(params, options, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200, { result: result });
            }
        });

    }

};
