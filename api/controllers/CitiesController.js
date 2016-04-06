/**
 * CitiesController
 *
 * @description :: Server-side logic for managing Cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

    create: function(req, res) {
        var params = req.body;
        var cityService = new CityService();
        cityService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(cityService.generateErrorMessage(err));
            } 
            return res.json(201, result);
        });
    },

    find: function(req, res) {
        var id = req.param('id');
        var cityService = new CityService();
        cityService.find(id, function(err, result) {
            if (err) {
                return res.badRequest(cityService.generateErrorMessage(err));
            } 
            if(_.isEmpty(result)){
                return res.notFound(cityService.generateErrorMessage("Does not exist"));
            }
            return res.json(200,result);
        });
    },

    update: function(req, res) {
        var params=req.body;
        var cityService = new CityService();
        cityService.updateAndFind(params, function(err, result) {
            if (err) {
                return res.badRequest(cityService.generateErrorMessage(err));
            } 
            return res.json(200,result);
        });
    },

    delete: function(req, res) {
        var id=req.param('id');
        var cityService = new CityService();
        cityService.delete(id, function(err, result) {
            if (err) {
                return res.badRequest(cityService.generateErrorMessage(err));
            } 
            return res.jsonx(200,result);
        });
    }

};
