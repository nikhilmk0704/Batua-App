'use strict'

var RateReviewRepository = require('../repositories/RateReviewRepository.js');

class RateReviewService {

    save(params, callback) {
        var rateReviewRepository = new RateReviewRepository();
        rateReviewRepository.save(params, callback);
    }

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

    updateAndFind(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var rateReviewRepository = new RateReviewRepository();
        rateReviewRepository.updateAndFind(params, options, options, callback);
    }

    delete(id, callback) {
        var options = {};
        options.where = {};
        options.where.id = id;
        var rateReviewRepository = new RateReviewRepository();
        rateReviewRepository.remove(options, callback);
    }

}

module.exports = RateReviewService;
