/**
 * PromocodesController
 *
 * @description :: Server-side logic for managing Promocodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 'use strict';

 module.exports = {

    create: function(req, res) {

        var params = req.body;
        
        var promocodesService = new PromocodesService();

        promocodesService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else if(_.isEmpty(result)){
                return res.notFound("Does not exist");
            } 
            else {
                return res.json(201,result);
            }
        });
    },

    find: function(req, res) {

        var id = req.param('id');
        var params = {};
        var include = [{
            model: Merchants,
            required: false
        }];
        params.include = include;
        var promocodesService = new PromocodesService();
        if (id) {
            params.where = {};
            params.where.id = id;
            promocodesService.find(params, function(err, result) {
                if (err) {
                    return res.badRequest(err);
                } else if(_.isEmpty(result)){
                    return res.notFound("Does not exist");
                }
                else {
                    return res.json(200, result);
                }
            });
        } else {
            promocodesService.findAll(params, function(err, result) {
                if (err) {
                    return res.badRequest(err);
                } else if(_.isEmpty(result)){
                    return res.notFound("Does not exist");
                }
                else {
                    return res.json(200,result);
                }
            });
        }
    },

    update: function(req, res) {

        var params = req.body;
        
        params.id = req.param('id');
        var promocodesService = new PromocodesService();
        
        promocodesService.updateAndFind(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else if(_.isEmpty(result)){
                return res.notFound("Does not exist");
            }
            else {
                return res.json(200, result);
            }
        });
    },

    updateStatus: function(req, res) {

        var params = req.body;
        
        params.id = req.param('id');
        var promocodesService = new PromocodesService();
        
        promocodesService.statusUpdateAndFind(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else if(_.isEmpty(result)){
                return res.notFound("Does not exist");
            } 
            else {
                return res.json(200, result);
            }
        });
    }

};
