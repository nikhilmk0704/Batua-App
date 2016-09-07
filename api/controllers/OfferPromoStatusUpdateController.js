/**
 * OfferController
 *
 * @description :: Server-side logic for managing Promocodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 'use strict';

var error=require('../errors/error.js');

 module.exports = {

    updateStatus: function(req, res) {

        var params = req.body;

        params.id = req.param('id');
        var statusUpdateService = new StatusUpdateService();
        
        statusUpdateService.statusUpdateAndFind(params, function(err, result) {
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
