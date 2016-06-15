'use strict';

var SettlementRepository = require('../repositories/SettlementRepository.js');
var PaymentsRepository = require('../repositories/PaymentsRepository.js');
var TransactionDetailsRepository = require('../repositories/TransactionDetailsRepository.js');
var moment = require('moment');
var math = require('mathjs');
var _ = require('underscore');

class SettlementService {

    save(params, callback) {

        var fromDate = params.fromDate;
        var toDate = params.toDate;

        if (!params.name)
            return callback("Please provide Name");
        if (!params.date)
            return callback("Please provide Date");
        if (!moment(params.date).isValid())
            return callback("Incorrect Date");
        if (!params.referenceNumber)
            return callback("Please provide Reference Number");
        if (!params.description)
            return callback("Please provide Description");
        if (!params.merchantId)
            return callback("Please provide Merchant Id");

        var settlementRepository = new SettlementRepository();
        settlementRepository.save(params, function(err, result) {
            if (err)
                return callback(err);
            var whereObject = {};
            whereObject.where = {};
            if (fromDate && toDate) {
                whereObject.where.$and = {};
                whereObject.where.$and.merchantId = params.merchantId;
                whereObject.where.$and.settlementId = null;
                whereObject.where.$and.createdAt.$between = [fromDate, toDate];
            }
            if (!fromDate && !toDate) {
                whereObject.where.$and = {};
                whereObject.where.$and.merchantId = params.merchantId;
                whereObject.where.$and.settlementId = null;
            }
            var updateObject = {};
            updateObject.settlementId = result.id;
            var paymentsRepository = new PaymentsRepository();
            paymentsRepository.update(updateObject, whereObject, function(error, updateResult) {
                if (error)
                    return callback(error);
                return callback(null, result);
            });
        });

    }

    getReport(params, callback) {

        var merchantId = params.merchantId;
        var fromDate = params.fromDate;
        var toDate = params.toDate;
        var isValidFromDate = (fromDate.length > 2);
        var isValidToDate = (toDate.length > 2);

        if ((isValidFromDate && !isValidToDate) || (!isValidFromDate && isValidToDate))
            return callback("Select From Date and To Date both or none");

        var reportArray = [];
        if (merchantId) {
            getTotalSettlements(merchantId, fromDate, toDate, function(err, result) {
                if (result) {
                    reportArray.push(result);
                    return callback(null, reportArray);
                }
                return callback(null, []);
            });
        }
        if (!merchantId) {
            var count = 0;
            var queryString = "SELECT DISTINCT merchantId FROM Payments WHERE isCancelled = false";
            sequelize.query(queryString).spread(function(metaData, data) {
                if (!data.length)
                    return callback("No Settlements");
                data.forEach(function(merchantObj) {
                    var newMerchantId = merchantObj.merchantId;
                    getTotalSettlements(newMerchantId, fromDate, toDate, function(err, result) {
                        count++;
                        if(result)
                            reportArray.push(result);
                        if (count == data.length) {
                            return callback(null, reportArray);
                        }
                    });
                });
            });
        }

    }

    getDetails(params, callback) {

        var merchantId = params.merchantId;
        var fromDate = params.fromDate;
        var toDate = params.toDate;
        var isValidFromDate = (fromDate.length > 2);
        var isValidToDate = (toDate.length > 2);

        if (!merchantId || !merchantId.length)
            return callback("Merchant Id Not Found !!!");

        if ((isValidFromDate && !isValidToDate) || (!isValidFromDate && isValidToDate))
            return callback("Select From Date and To Date both or none");

        var whereObject = {};
        whereObject.where = {};
        whereObject.include = includeModels();
        whereObject.where.$and = {};
        whereObject.where.$and.merchantId = params.merchantId;
        whereObject.where.$and.isCancelled = false;

        if (isValidFromDate && isValidToDate) {
            fromDate = fromDate.replace(/"/g, "");
            toDate = toDate.replace(/"/g, "");
            fromDate = moment(fromDate).format('YYYY-MM-DD');
            toDate = moment(toDate).format('YYYY-MM-DD');
            toDate=moment(moment(toDate).add(1, 'days')._d).format('YYYY-MM-DD');
            whereObject.where.$and.createdAt = {};
            whereObject.where.$and.createdAt.$between = [fromDate, toDate];
        }

        var detailsArray = [];

        Payments.findAll(whereObject).then(function(result) {
            var count = 0;
            result.forEach(function(obj) {
                count++;
                var detailsObj = {};
                detailsObj.id = obj.id;
                detailsObj.user = obj.user.name;
                detailsObj.orderNumber = obj.transactionDetail.orderNumber;
                detailsObj.transactionId = obj.transactionDetail.paymentId;
                detailsObj.transactionDate = obj.createdAt;
                detailsObj.transactionAmount = obj.initialAmount;
                if (!obj.offerDiscountId)
                    detailsObj.offerAmount = 0;
                if (obj.offerAmount)
                    detailsObj.offerAmount = obj.promocodeAmount;
                if (!obj.promocodeId) {
                    detailsObj.promoOfferAmount = 0;
                    detailsObj.promoAmountByMerchant = 0;
                }
                if (obj.promocodeId) {
                    detailsObj.promoOfferAmount = obj.promocodeAmount;
                    detailsObj.promoAmountByMerchant = obj.promocodeAmount - obj.batuaCommission;
                }
                detailsObj.feeCharged = obj.reducedAmount;
                detailsObj.amountCreditedToBatua = obj.paidAmount;
                detailsObj.settlementAmount = obj.paidAmount - obj.merchantFee;
                detailsArray.push(detailsObj);
                if (result.length == count)
                    return callback(null, detailsArray);
            });
        }).catch(function(exception) {
            callback(exception);
        });

    }

}

module.exports = SettlementService;

function getTotalSettlements(newMerchantId, fromDate, toDate, callback) {
    var isValidFromDate = (fromDate.length > 2);
    var isValidToDate = (toDate.length > 2);
    var whereObject = {};
    whereObject.where = {};
    whereObject.include = includeModels();
    whereObject.where.$and = {};
    whereObject.where.$and.merchantId = newMerchantId;
    whereObject.where.$and.isCancelled = false;

    if (isValidFromDate && isValidToDate) {
        fromDate = fromDate.replace(/"/g, "");
        toDate = toDate.replace(/"/g, "");
        fromDate = moment(fromDate).format('YYYY-MM-DD');
        toDate = moment(toDate).format('YYYY-MM-DD');
        toDate = moment(moment(toDate).add(1, 'days')._d).format('YYYY-MM-DD');
        whereObject.where.$and.createdAt = {};
        whereObject.where.$and.createdAt.$between = [fromDate, toDate];
    }

    var detailsArray = [];
    var sumObj = {};

    Payments.findAll(whereObject).then(function(result) {
        var count = 0;
        sumObj.merchantId = result[0].merchantId;
        sumObj.merchantName = result[0].merchant.name;
        sumObj.status = (result[0].settlementId) ? ('settled') : ('open');
        result.forEach(function(obj) {
            count++;
            var detailsObj = {};
            detailsObj.merchantId = obj.merchantId;
            detailsObj.merchantName = obj.merchant.name;
            detailsObj.transactionAmount = obj.initialAmount;
            if (!obj.offerDiscountId)
                detailsObj.offerAmount = 0;
            if (obj.offerAmount)
                detailsObj.offerAmount = obj.promocodeAmount;
            if (!obj.promocodeId) {
                detailsObj.promoOfferAmount = 0;
                detailsObj.promoAmountByMerchant = 0;
            }
            if (obj.promocodeId) {
                detailsObj.promoOfferAmount = obj.promocodeAmount;
                detailsObj.promoAmountByMerchant = obj.promocodeAmount - obj.batuaCommission;
            }
            detailsObj.feeCharged = obj.reducedAmount;
            detailsObj.settlementAmount = obj.paidAmount - obj.merchantFee;
            detailsArray.push(detailsObj);
            if (count == result.length) {
                sumObj.netTransactionAmount = math.sum(_.pluck(detailsArray, 'transactionAmount'));
                sumObj.netOfferAmount = math.sum(_.pluck(detailsArray, 'offerAmount'));
                sumObj.netPromoOfferAmount = math.sum(_.pluck(detailsArray, 'promoOfferAmount'));
                sumObj.netCashbackByMerchant = math.sum(_.pluck(detailsArray, 'promoAmountByMerchant'));
                sumObj.netFeeCharged = math.sum(_.pluck(detailsArray, 'feeCharged'));
                sumObj.netSettlementAmount = math.sum(_.pluck(detailsArray, 'settlementAmount'));
                callback(null, sumObj);
            }
        });
    }).catch(function(exception) {
        callback(exception);
    });
}

function includeModels() {
    return [{
        model: Merchants,
        as: 'merchant',
        attributes: ['id', 'name', 'shortcode'],
        required: false
    }, {
        model: Users,
        as: 'user',
        attributes: ['id', 'name'],
        required: false
    }, {
        model: Promocodes,
        as: 'promocode',
        required: false
    }, {
        model: Offers,
        as: 'offerDiscount',
        required: false
    }, {
        model: TransactionDetails,
        as: 'transactionDetail',
        attributes: ['id', 'orderNumber', 'transactionId', 'mode'],
        required: false
    }, {
        model: Paymentmodes,
        as: 'paymentMode',
        attributes: ['id', 'paymentMode', 'walletType'],
        required: false
    }, {
        model: Settlements,
        as: 'settlement',
        required: false
    }];
}
