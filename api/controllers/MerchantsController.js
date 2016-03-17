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
            if (err) return res.badRequest(err);
            else return res.json(201, { result: result });
        });
    },

    find: function(req, res) {
        var params = {};
        var _id = req.param('id');
        var salesAgentId = req.param('salesAgentId');
        var include = [{ model: Cities, required: false }, { model: Users, required: false }, { model: Statuses, required: false }, { model: Categories, required: false }, { model: Galleries, required: false }];
        params.include = include;
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
            if (salesAgentId) {
                params.where = {};
                params.where.createdSalesId = salesAgentId;
                var merchantService = new MerchantService();
                merchantService.findAll(params, function(err, result) {
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
        }
    },

    update: function(req, res) {
        var params = {};
        params = req.body;
        var options = {};
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
        var findObject = {};
        params.statusId = req.body.statusId;
        options.where = {};
        options.where.id = req.body.id;
        findObject.where = {};
        findObject.where.id = req.body.id;
        findObject.include = [{ model: Cities, required: false }, { model: Users, required: false }, { model: Statuses, required: false }, { model: Categories, required: false }, { model: Galleries, required: false }];
        var merchantService = new MerchantService();
        merchantService.updateStatus(params, options, findObject, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200, { result: result });
            }
        });
    }
};
