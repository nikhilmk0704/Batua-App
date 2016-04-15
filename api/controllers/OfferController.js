/**
 * OfferController
 *
 * @description :: Server-side logic for managing Promocodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 'use strict';

var error=require('../errors/error.js');

 module.exports = {

    create: function(req, res) {

        var params = req.body;
        
        var offerService = new OfferService();

        offerService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(error.send(err));
            }else if(_.isEmpty(result)){
                return res.notFound(error.send("Does not exist"));
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
            as:'merchants',
            required: false
        }];
        params.include = include;
        var offerService = new OfferService();
        if (id) {
            params.where = {};
            params.where.id = id;
            offerService.find(params, function(err, result) {
                if (err) {
                    return res.badRequest(error.send(err));
                } else if(_.isEmpty(result)){
                    return res.notFound(error.send("Does not exist"));
                } else {
                    return res.json(200, result);
                }
            });
        } else {
            offerService.findAll(params, function(err, result) {
                if (err) {

                    return res.badRequest(error.send(err));

                } else if(_.isEmpty(result)){

                    return res.notFound(error.send("Does not exist"));

                } else {

                    return res.json(200,result);

                }
            });
        }
    },

    update: function(req, res) {

        var params = req.body;

        params.id = req.param('id');
        var offerService = new OfferService();
        
        offerService.updateAndFind(params, function(err, result) {
            if (err) {
                
                return res.badRequest(error.send(err));
            
            } else if(_.isEmpty(result)){
                
                return res.notFound(error.send("Does not exist"));
            
            }
            else {
                return res.json(200, result);
            }
        });
    },

    updateStatus: function(req, res) {

        var params = req.body;

        params.id = req.param('id');
        var offerService = new OfferService();
        
        offerService.statusUpdateAndFind(params, function(err, result) {
            if (err) {
                
                return res.badRequest(error.send(err));
            
            } else if(_.isEmpty(result)){

                return res.notFound(error.send("Does not exist"));
            
            }
            else {
                
                return res.json(200, result);
            }
        });
    }

};
