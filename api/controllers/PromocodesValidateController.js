/**
 * PromocodeValidateController
 *
 * @description :: Server-side logic for managing Promocode at the time of payment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

var error = require('../errors/error.js');

module.exports = {

    validatePromocode: function(req, res) {

        var params = {};

        params.merchantId = req.body.merchantId;
        params.promocode = req.body.promocode;

        
        var promocodesService = new PromocodesService();
   
        promocodesService.validateUserAndPromo(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            if(_.isEmpty(result)){
                return res.notFound(error.send("Invalid promocode"));
            }
            return res.json(200, result);
        });
    }

};
