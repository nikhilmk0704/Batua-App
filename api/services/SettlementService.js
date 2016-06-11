'use strict';

var SettlementRepository = require('../repositories/SettlementRepository.js');
var PaymentsRepository = require('../repositories/PaymentsRepository.js');
var TransactionDetailsRepository = require('../repositories/TransactionDetailsRepository.js');
var moment = require('moment');

class SettlementService {

    save(params, callback) {

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

        var settlementRepository = new SettlementRepository();
        settlementRepository.save(params, callback);

    }

    getReport(callback) {

        var paymentsRepository = new PaymentsRepository();
        var transactionDetailsRepository = new TransactionDetailsRepository();

        var whereObject = {};
        whereObject.where = {};
        whereObject.where.$and = {};
        whereObject.where.$and.merchantId = params.merchantId;
        whereObject.where.$and.isCancelled = false;
        if (fromDate && toDate)
            whereObject.where.$and.createdAt.$between = [fromDate, toDate];
        whereObject.include = includeModels();

        paymentsRepository.findAll(whereObject, function(err, result) {
            result.forEach(function(obj) {
                var amountCreditedToBatua = obj.paidAmount - obj.promocodeAmount;
                var feeCharged;
                obj.amountCreditedToBatua = amountCreditedToBatua;
                if (obj.promocodeAmount) {
                    feeCharged = obj.merchant.fee * obj.paidAmount;
                    obj.feeCharged = feeCharged;
                }
                if (obj.offerDiscountId) {
                    obj.feeCharged = obj.merchant.fee * amountCreditedToBatua;
                }
                if (obj.offerDiscountId) {
                    obj.settlementAmount = amountCreditedToBatua - feeCharged;
                }
                if (obj.promocodeAmount) {
                    obj.settlementAmount = obj.paidAmount - feeCharged;
                }
            });
            return callback(null, result);
        });
        
    }

    getDetails(params, callback) {

        var paymentsRepository = new PaymentsRepository();
        var transactionDetailsRepository = new TransactionDetailsRepository();

        var whereObject = {};
        whereObject.where = {};
        whereObject.where.$and = {};
        whereObject.where.$and.merchantId = params.merchantId;
        whereObject.where.$and.isCancelled = false;
        if (fromDate && toDate)
            whereObject.where.$and.createdAt.$between = [fromDate, toDate];
        whereObject.include = includeModels();
        var detailsArray=[];
        paymentsRepository.findAll(whereObject, function(err, result) {
            result.forEach(function(obj) {
                var amountCreditedToBatua = obj.paidAmount - obj.promocodeAmount;
                var feeCharged;
                obj.amountCreditedToBatua = amountCreditedToBatua;
                if (obj.promocodeAmount) {
                    feeCharged = obj.merchant.fee * obj.paidAmount;
                    obj.feeCharged = feeCharged;
                }
                if (obj.offerDiscountId) {
                    obj.feeCharged = obj.merchant.fee * amountCreditedToBatua;
                }
                if (obj.offerDiscountId) {
                    obj.settlementAmount = amountCreditedToBatua - feeCharged;
                }
                if (obj.promocodeAmount) {
                    obj.settlementAmount = obj.paidAmount - feeCharged;
                }
            });
            return callback(null, result);
        });
    }

}

module.exports = SettlementService;

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
    }];
}
