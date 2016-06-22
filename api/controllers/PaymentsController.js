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

            if (err) {

                if (err.errorCode === 406) {
                    return res.notAcceptable(error.send(err.message));

                } else {
                    return res.badRequest(error.send(err));
                }

            }
            return res.json(200, result);
        });
    },

    recharge: function(req, res) {

        var params = req.body;

        var paymentService = new PaymentService();

        paymentService.recharge(params, function(err, result) {

            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);

        });
    },

    batuaWalletPayment: function(req, res) {

        var params = req.body;
        var paymentService = new PaymentService();
        var err1;

        paymentService.batuaWalletPayment(params, function(err, result) {

            if (err) {
                err1 = err;
                paymentService.errorConstructionForPayment(params, function(error1, result) {
                    if (error1) {
                        return res.badRequest(error.send(error1));
                    }

                    if (result) {
                        err1.result = result;
                        return res.badRequest(error.errorConstructionForPayment(err1));
                    }
                });
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
    },

    transactionReport: function(req, res) {

        var params = {};
        params.merchantId = req.query.merchantId;
        params.userId = req.query.userId;
        params.fromDate = req.query.fromDate;
        params.toDate = req.query.toDate;

        var paymentService = new PaymentService();

        paymentService.transactionReport(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            if (_.isEmpty(result))
                return res.notFound(error.send('No Transactions'));
            return res.json(200, result);
        });
    },

    cancel: function(req, res) {

        var params = {};
        params.paymentId = req.body.paymentId;
        params.adminId = req.body.adminId;
        params.cancellationDate = req.body.cancellationDate;
        params.cancellationDescription = req.body.cancellationDescription;

        var paymentService = new PaymentService();

        paymentService.cancelTransaction(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(200, result);
        });
    },

    yesBankGenerateOtp: function(req, res) {

        var params = req.body;

        var paymentService = new PaymentService();

        paymentService.generateOtp(params, function(err, result) {

            if (err)
                return res.badRequest(error.send(err));

            return res.json(200, result);

        });

    },

    yesBankVerifyOtp: function(req, res) {

        var params = req.body;

        var paymentService = new PaymentService();

        paymentService.verifyOtp(params, function(err, result) {

            if (err)
                return res.badRequest(error.send(err));

            return res.json(200, result);

        });

    },

    yesBankExecuteTxn: function(req, res) {

        var params = req.body;

        var paymentService = new PaymentService();

        paymentService.executeTxnThirdParty(params, function(err, result) {

            if (err)
                return res.badRequest(error.send(err));

            return res.json(200, result);

        });

    },

    getYesWalletBalance: function(req, res) {

        var params = req.body;

        var paymentService = new PaymentService();

        paymentService.getYesWalletBalance(params, function(err, result) {

            if (err) {
                if (err.code) {
                    return res.json(sails.config.globals.unAuthorisedUserErrorCode, error.errorConstructionForYesBankWalletBalance(err));
                }

                if (!err.code) {
                    return res.badRequest(error.send(err));
                }
            }
            return res.json(200, result);

        });

    },

    makeYesBankWalletPayment: function(req, res) {

        var params = req.body;

        var paymentService = new PaymentService();

        paymentService.makeYesBankWalletPayment(params, function(err, result) {

            if (err)
                return res.badRequest(error.send(err));

            return res.json(200, result);

        });

    },
};