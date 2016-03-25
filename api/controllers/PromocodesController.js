/**
 * PromocodesController
 *
 * @description :: Server-side logic for managing Promocodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {
    /*
    save(params, callback) {

        var siteData = {};
        siteData = params.site;
        siteData.companyId = params.companyId;
        if (!_.isUndefined(params.userId)) {
            return createSite(siteData, function(err, result) {
                if (err) {
                    return callback(err);
                }
                return checkIfUserHasSiteAssociated(params.userId, result, callback);
            });
        }
        return createSite(siteData, callback);
    }
    */

    create: function(req, res) {

        var params = req.body;
        
        var promocodesService = new PromocodesService();
        /*var merchantsPromocodeService = new MerchantsPromocodeService();*/

        promocodesService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.jsonx(result);
            }
        });
    },

    find: function(req, res) {

        var _id = req.param('id');
        var params = {};
        var include = [{
            model: Merchants,
            required: false
        }];
        params.include = include;
        
        if (_id) {
            params.where = {};
            params.where.id = _id;
            var promocodesService = new PromocodesService();
            promocodesService.find(params, function(err, result) {
                if (err) {
                    return res.badRequest(err);
                } else {
                    return res.json(200, { result: result });
                }
            });
        } else {
            var promocodesService = new PromocodesService();
            promocodesService.findAll(params, function(err, result) {
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

        var promocodesService = new PromocodesService();
        var merchantsPromocodeService = new merchantsPromocodeService();
        merchantsPromocodeService.find(options, function(err, result) {

        });
        promocodesService.update(params, options, function(err, result) {
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

        var promocodesService = new PromocodesService();
        promocodesService.delete(options, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200, { result: result });
            }
        });
    }

};
