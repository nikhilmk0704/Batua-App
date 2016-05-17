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
                return res.notFound(error.send("Invalid payment"));
            }
            return res.json(200, result);
        });
    },

    history: function(req, res) {

        var params = {};
        params.userId = req.param('userId');

        var paymentService = new PaymentService();

        paymentService.history(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            if (_.isEmpty(result))
                return res.notFound(error.send('No Transactions'));
            return res.json(200, result);
        });
    },

    wallet: function(req, res) {

        var params = {};
        params.userId = req.param('userId');

        var paymentService = new PaymentService();
        
        paymentService.wallet(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            if (_.isEmpty(result))
                return res.notFound(error.send('No Transactions'));
            return res.json(200, result);
        });
    }
};
