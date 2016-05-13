/**
 * PaymentsController
 *
 * @description :: Server-side logic for managing Payments at the time of payment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

var error = require('../errors/error.js');

module.exports = {

    doPayment: function(req, res) {

        var params = req.body;

        var paymentService = new PaymentService();
   
        paymentService.save(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            if(_.isEmpty(result)){
                return res.notFound(error.send("Invalid promocode"));
            }
            return res.json(200, result);
        });
    }
};
