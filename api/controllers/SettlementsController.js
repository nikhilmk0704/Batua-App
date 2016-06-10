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

        var settlementService = new SettlementService();

        settlementService.save(params, function(err, result) {
            if (err)
                return res.badRequest(error.send(err));
            return res.json(201, result);
        });

    },

    report: function(req, res) {

        var settlementService = new SettlementService();

        settlementService.getReport(function(err, result) {
            
            if (err)
                return res.badRequest(error.send(err));

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

            return res.json(200, result);
        });

    }

};
