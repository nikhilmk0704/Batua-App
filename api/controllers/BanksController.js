/**
 * CitiesController
 *
 * @description :: Server-side logic for managing Cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

var error=require('../errors/error.js');

module.exports = {

    create: function(req, res) {
        var params = req.body;
        var banksService = new BanksService();
        banksService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(error.send(err));
            } 
            return res.json(201, result);
        });
    },

    find: function(req, res) {
        var id = req.param('id');
        var banksService = new BanksService();
        banksService.find(id, function(err, result) {
            if (err) {
                return res.badRequest(error.send(err));
            } 
            if(_.isEmpty(result)){
                return res.notFound(error.send("Does not exist"));
            }
            return res.json(200,result);
        });
    },

    update: function(req, res) {
        var params=req.body;
        var banksService = new BanksService();
        banksService.updateAndFind(params, function(err, result) {
            if (err) {
                return res.badRequest(error.send(err));
            } 
            return res.json(200,result);
        });
    },

    delete: function(req, res) {
        var id=req.param('id');
        var banksService = new BanksService();
        banksService.delete(id, function(err, result) {
            if (err) {
                return res.badRequest(error.send(err));
            } 
            return res.jsonx(200,result);
        });
    }

};
