/**
 * RateReviewsController
 *
 * @description :: Server-side logic for managing Ratereviews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

    create: function(req, res) {
        var params = req.body;
        var rateReviewService = new RateReviewService();
        rateReviewService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(201, result);
            }
        });
    },

    find: function(req, res) {
        var userId = req.param('userId');
        var merchantId = req.param('merchantId');
        var rateReviewService = new RateReviewService();
        rateReviewService.find(userId, merchantId, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(201, result);
            }
        });
    },

    update: function(req, res) {
    	var params=req.body;
        var rateReviewService = new RateReviewService();
    	rateReviewService.updateAndFind(params, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200,result);
            }
        });
    },

    delete: function(req, res) {
    	var id=req.param('id');
        var rateReviewService = new RateReviewService();
        rateReviewService.delete(id, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200,result);
            }
        });
    }
};
