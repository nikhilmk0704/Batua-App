'use strict'

var RateReviewRepository = require('../repositories/RateReviewRepository.js');
var MerchantRepository = require('../repositories/MerchantRepository.js');

class RateReviewService {

    // creates rate and reviews from ratereview table and update average rating field in merchant table 
    save(params, callback) {
        var rateReviewRepository = new RateReviewRepository();
        var merchantRepository = new MerchantRepository();
        var rateReviewService = new RateReviewService();
        var rateReviewObject={};
        async.waterfall([
            function(callback){
                rateReviewRepository.save(params, callback);
            },
            function(rateReviewResult,callback){
                rateReviewObject=rateReviewResult;
                rateReviewService.getAverageRating(rateReviewResult.dataValues,callback);
            },
            function(averageRating,callback){
                var merchantId=rateReviewObject.dataValues.merchantId;
                merchantRepository.update({averageRating:averageRating},{where:{id:merchantId}},callback);
            }
        ],function(err,result){
            if(err){
                return callback(err);
            }
            return callback(null,rateReviewObject.dataValues);
        });
    }

    // get all rate and reviews made by user
    find(usrId, merchantId, callback) {
        var params={};
        params.where = {};
        var rateReviewRepository = new RateReviewRepository();
        if (userId && merchantId) {
            params.where.userId = userId;
            params.where.merchantId = merchantId;
            rateReviewRepository.find(params, callback);
        }
        if(userId && !merchantId) {
            params.where.userId=userId;
            rateReviewRepository.findAll(params, callback);
        } 
        if(merchantId && !userId){
            params.where.merchantId=merchantId;
            rateReviewRepository.findAll(params, callback);
        } 
        else{
            callback("Please provide id");
        }
    }

    // updates rate and reviews from ratereview table and update average rating field in merchant table 
    updateAndFind(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var findObject=options;
        var rateReviewRepository = new RateReviewRepository();
        async.waterfall([
            function(callback){
               rateReviewRepository.updateAndFind(params, options, findObject, callback);
            },
            function(rateReviewResult,callback){
                rateReviewObject=rateReviewResult;
                rateReviewService.getAverageRating(rateReviewResult.dataValues,callback);
            },
            function(averageRating,callback){
                var merchantId=rateReviewObject.dataValues.merchantId;
                merchantRepository.update({averageRating:averageRating},{where:{id:merchantId}},callback);
            }
        ],function(err,result){
            if(err){
                return callback(err);
            }
            return callback(null,rateReviewObject.dataValues);
        });
    }

    // deletes rate and reviews from ratereview table and update average rating field in merchant table 
    delete(id, callback) {
        var options = {};
        options.where = {};
        options.where.id = id;
        var rateReviewRepository = new RateReviewRepository();
        async.waterfall([
            function(callback){
                rateReviewRepository.remove(options, callback);
            },
            function(rateReviewResult,callback){
                rateReviewObject=rateReviewResult;
                rateReviewService.getAverageRating(rateReviewResult.dataValues,callback);
            },
            function(averageRating,callback){
                var merchantId=rateReviewObject.dataValues.merchantId;
                merchantRepository.update({averageRating:averageRating},{where:{id:merchantId}},callback);
            }
        ],function(err,result){
            if(err){
                return callback(err);
            }
            return callback(null,rateReviewObject.dataValues);
        });
    }

    // calculates average rating of a merchant
    getAverageRating(rateReviewResult,callback){
        var merchantId=rateReviewResult.merchantId;
        var rateReviewRepository = new RateReviewRepository();
        rateReviewRepository.findAll({
            attributes:[[Sequelize.fn('AVG','rating'),'averageRating']],
            group:['merchantId'],
            where:{merchantId:merchantId}
        },function(err,result){
            if(err){
                return callback(err);
            }
            return callback(null,result.averageRating);
        });
    }

}

module.exports = RateReviewService;
