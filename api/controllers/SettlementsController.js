/**
 * SettlementsController
 *
 * @description :: Server-side logic for managing Payments at the time of payment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

var error = require('../errors/error.js');

module.exports = {

    create: function(req, res) {

        var params = {};
        params.name = req.body.name;
        params.date = req.body.date;
        params.referenceNumber = req.body.referenceNumber;
        params.description = req.body.description;
        params.merchantId = req.body.merchantId;
        params.fromDate = req.body.fromDate;
        params.toDate = req.body.toDate;

        var settlementService = new SettlementService();

        settlementService.save(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(201, result);
        });

    },

    report: function(req, res) {

        var params = {};
        params.merchantId = req.query.merchantId;
        params.fromDate = req.query.fromDate;
        params.toDate = req.query.toDate;

        var settlementService = new SettlementService();

        settlementService.getReport(params, function(err, result) {

            if (err)
                return res.badRequest(error.send(err));
            if (_.isEmpty(result))
                return res.notFound(error.send('No Settlements'));
            return res.json(200, result);
        });
    },

    details: function(req, res) {

        var params = {};
        params.merchantId = req.query.merchantId;
        params.fromDate = req.query.fromDate;
        params.toDate = req.query.toDate;

        var settlementService = new SettlementService();

        settlementService.getDetails(params, function(err, result) {

            if (err)
                return res.badRequest(error.send(err));
            if (_.isEmpty(result))
                return res.notFound(error.send('No Payment Details'));
            return res.json(200, result);
        });

    }

};
