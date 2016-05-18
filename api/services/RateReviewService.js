'use strict'

var RateReviewRepository = require('../repositories/RateReviewRepository.js');
var MerchantRepository = require('../repositories/MerchantRepository.js');

class RateReviewService {

    // creates rate and reviews from ratereview table and update average rating field in merchant table 

    save(params, callback) {
        var rateReviewRepository = new RateReviewRepository();
        var merchantRepository = new MerchantRepository();
        var rateReviewService = new RateReviewService();
        var rateReviewObject = {};
        async.waterfall([
            function(callback) {
                rateReviewRepository.save(params, callback);
            },
            function(rateReviewResult, callback) {
                rateReviewObject = rateReviewResult;
                rateReviewService.getAverageRating(rateReviewResult, callback);
            },
            function(averageRating, callback) {
                var merchantId = rateReviewObject.merchantId;
                var updateObject = {};
                updateObject.averageRating = averageRating;
                updateObject.reviewersCount = sequelize.literal('reviewersCount + 1');
                var whereObject = {};
                whereObject.where = {};
                whereObject.where.id = merchantId;
                merchantRepository.update(updateObject, whereObject, callback);
            }
        ], function(err, result) {
            if (err)
                return callback(err);
            return callback(null, rateReviewObject);
        });
    }

    // get all rate and reviews made by user

    find(params, callback) {
        var rateReviewService = new RateReviewService();
        var id = params.id;
        var userId = params.userId;
        var merchantId = params.merchantId;
        var findObject = {};
        findObject.where = {};
        findObject.include = rateReviewService.getIncludeModels();
        (id) ? (findObject.where.id = id) : (findObject);
        (merchantId) ? (findObject.where.merchantId = merchantId) : (findObject);
        (userId) ? (findObject.where.userId = userId) : (findObject);
        var rateReviewRepository = new RateReviewRepository();
        rateReviewRepository.findAll(findObject, callback);
    }

    // updates rate and reviews from ratereview table and update average rating field in merchant table 

    updateAndFind(params, callback) {
        var whereObject = {};
        whereObject.where = {};
        whereObject.where.id = params.id;
        var findObject = whereObject;
        var rateReviewRepository = new RateReviewRepository();
        var merchantRepository = new MerchantRepository();
        var rateReviewService = new RateReviewService();
        var rateReviewObject = {};
        async.waterfall([
            function(callback) {
                rateReviewRepository.updateAndFind(params, whereObject, findObject, callback);
            },
            function(rateReviewResult, callback) {
                rateReviewObject = rateReviewResult;
                rateReviewService.getAverageRating(rateReviewResult, callback);
            },
            function(averageRating, callback) {
                var merchantId = rateReviewObject.merchantId;
                var updateObject = {};
                updateObject.averageRating = averageRating;
                var whereObject = {};
                whereObject.where = {};
                whereObject.where.id = merchantId;
                merchantRepository.update(updateObject, whereObject, callback);
            }
        ], function(err, result) {
            if (err)
                return callback(err);
            return callback(null, rateReviewObject);
        });
    }

    // deletes rate and reviews from ratereview table and update average rating field in merchant table 

    delete(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var rateReviewRepository = new RateReviewRepository();
        var merchantRepository = new MerchantRepository();
        var rateReviewService = new RateReviewService();
        var rateReviewObject = {};
        async.waterfall([
                function(callback) {
                    rateReviewRepository.find(options, callback);
                },
                function(rateReviewResult, callback) {
                    rateReviewObject = rateReviewResult;
                    rateReviewRepository.remove(options, function(err, result) {
                        callback(null, rateReviewResult)
                    });
                },
                function(rateReviewResult, callback) {
                    rateReviewService.getAverageRating(rateReviewResult, callback);
                },
                function(averageRating, callback) {
                    var merchantId = rateReviewObject.merchantId;
                    var updateObject = {};
                    updateObject.averageRating = averageRating;
                    updateObject.reviewersCount = sequelize.literal('reviewersCount - 1');
                    var whereObject = {};
                    whereObject.where = {};
                    whereObject.where.id = merchantId;
                    merchantRepository.update(updateObject, whereObject, callback);
                }
            ],
            function(err, result) {
                if (err)
                    return callback(err);
                return callback(null, rateReviewObject);
            });
    }

    // calculates average rating of a merchant

    getAverageRating(rateReviewObject, callback) {
        var merchantId = rateReviewObject.merchantId;
        var getAverageRatingQueryString = "SELECT AVG(rating) AS averageRating FROM RateReviews " +
            "AS RateReviews WHERE RateReviews.merchantId = " + merchantId + " GROUP BY merchantId";
        sequelize.query(getAverageRatingQueryString).spread(function(metaData, data) {
            return callback(null, data[0].averageRating);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    getIncludeModels() {
        return [{
            model: Users,
            attributes: ['id', 'name', 'profileImageUrl', 'email'],
            as: 'users'
        }, {
            model: Merchants,
            attributes: ['id', 'name', 'profileImageUrl', 'email'],
            as: 'merchants'
        }, {
            model: Payments,
            attributes: ['id'],
            as: 'payments'
        }];
    }

}

module.exports = RateReviewService;
