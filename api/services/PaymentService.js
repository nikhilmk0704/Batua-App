'use strict';

var PaymentsRepository = require('../repositories/PaymentsRepository.js');

var TransactionDetailsRepository = require('../repositories/TransactionDetailsRepository.js');
var MerchantRepository = require('../repositories/MerchantRepository.js');

var request = require('request');
var crypto = require('crypto');
var moment = require('moment');
var fs = require('fs');

class PaymentService {

    save(params, callback) {

        request({
            method: 'POST',
            url: 'https://' + sails.config.connections.razorpayKeyId + ':' + sails.config.connections.razorPayKeySecret + '@api.razorpay.com/v1/payments/' + params.paymentId + '/capture',
            form: {
                amount: parseFloat(params.amount) * 100
            }
        }, function(error, response, body) {

            body = JSON.parse(body);

            if (response.statusCode == 200) {

                generateOrderNo(function(sequenceNumber) {

                    var transactionDetailParam = {};

                    transactionDetailParam.orderNumber = sequenceNumber;
                    transactionDetailParam.transactionId = sequenceNumber;
                    transactionDetailParam.paymentId = params.paymentId;
                    transactionDetailParam.status = params.status;
                    transactionDetailParam.mode = body.method;

                    var transactionDetailsRepository = new TransactionDetailsRepository();

                    transactionDetailsRepository.save(transactionDetailParam, function(err, transactionDetail) {
                        if (err)
                            return callback(err, null);
                        /*---save payment for each transaction---*/

                        var savePaymentParam = {};

                        savePaymentParam.transactionDetailId = transactionDetail.id;
                        savePaymentParam.userId = params.userId;
                        savePaymentParam.merchantId = params.merchantId;
                        savePaymentParam.paymentModeId = params.paymentmodeId;
                        savePaymentParam.type = params.type;
                        if (params.promocode) {
                            savePaymentParam.promocodeId = params.promocode.id;
                        } else {
                            savePaymentParam.promocodeId = null;
                        }
                        if (params.offer) {
                            savePaymentParam.offerDiscountId = params.offer.id;
                        } else {
                            savePaymentParam.offerDiscountId = null;
                        }

                        getMerchantFee(params.merchantId, function(merchantFee) {
                            if (params.promocode) {

                                promocodeOperation(params, merchantFee[0].fees, function(resultArray) {
                                    savePaymentParam.initialAmount = parseFloat(params.amount);
                                    savePaymentParam.reducedAmount = (parseFloat(resultArray.reducedAmount) + parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply) + parseFloat(resultArray.fee));
                                    savePaymentParam.paidAmount = parseFloat(resultArray.paidAmount);
                                    savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
                                    savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
                                    savePaymentParam.merchantFee = parseFloat(resultArray.fee);

                                    return savePaymentDetails(savePaymentParam, function(err, result) {
                                        if (err) {
                                            return callback(err, null);
                                        }
                                        findPaymentDetail(result, function(err, detailResult) {
                                            if (err) {
                                                return callback(err, null);
                                            }
                                            var sendObj = {};
                                            sendObj.amount = detailResult.initialAmount;
                                            sendObj.type = detailResult.transactionDetail.mode;
                                            sendObj.merchantName = detailResult.merchant.name;
                                            sendObj.transactionId = detailResult.transactionDetail.transactionId;
                                            sendObj.createdAt = detailResult.createdAt;
                                            sendObj.balance = detailResult.balance;
                                            sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.user.email, 'User');
                                            sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.merchant.email, 'Merchant');
                                            return callback(null, detailResult);
                                        });

                                    });
                                });


                            } else if (params.offer) {
                                offerOperation(params, merchantFee[0].fees, function(resultArray) {
                                    savePaymentParam.initialAmount = parseFloat(params.amount);
                                    savePaymentParam.reducedAmount = (parseFloat(resultArray.reducedAmount) + parseFloat(resultArray.fee));
                                    savePaymentParam.paidAmount = parseFloat(resultArray.paidAmount);
                                    savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
                                    savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
                                    savePaymentParam.merchantFee = parseFloat(resultArray.fee);
                                    return savePaymentDetails(savePaymentParam, function(err, result) {
                                        if (err) {
                                            return callback(err, null);
                                        }
                                        findPaymentDetail(result, function(err, detailResult) {
                                            if (err) {
                                                return callback(err, null);
                                            }
                                            var sendObj = {};
                                            sendObj.amount = detailResult.initialAmount;
                                            sendObj.type = detailResult.transactionDetail.mode;
                                            sendObj.merchantName = detailResult.merchant.name;
                                            sendObj.transactionId = detailResult.transactionDetail.transactionId;
                                            sendObj.createdAt = detailResult.createdAt;
                                            sendObj.balance = detailResult.balance;
                                            sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.user.email, 'User');
                                            sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.merchant.email, 'Merchant');
                                            return callback(null, detailResult);
                                        });

                                    });
                                });

                            } else {
                                var deductionFee = parseFloat(params.amount) * (parseFloat(merchantFee[0].fees) / 100)
                                savePaymentParam.initialAmount = parseFloat(params.amount);
                                savePaymentParam.reducedAmount = deductionFee;
                                savePaymentParam.paidAmount = parseFloat(params.amount) - deductionFee;
                                savePaymentParam.promocodeAmount = 0;
                                savePaymentParam.batuaCommission = 0;
                                savePaymentParam.merchantFee = parseFloat(deductionFee);
                                return savePaymentDetails(savePaymentParam, function(err, result) {
                                    if (err) {
                                        return callback(err, null);
                                    }
                                    findPaymentDetail(result, function(err, detailResult) {
                                        if (err) {
                                            return callback(err, null);
                                        }
                                        var sendObj = {};
                                        sendObj.amount = detailResult.initialAmount;
                                        sendObj.type = detailResult.transactionDetail.mode;
                                        sendObj.merchantName = detailResult.merchant.name;
                                        sendObj.transactionId = detailResult.transactionDetail.transactionId;
                                        sendObj.createdAt = detailResult.createdAt;
                                        sendObj.balance = detailResult.balance;
                                        sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.user.email, 'User');
                                        sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.merchant.email, 'Merchant');
                                        return callback(null, detailResult);
                                    });
                                });
                            }
                        });
                    });
                });
            } else {
                var newErr = {}
                newErr.errorCode = 406;
                newErr.message = body.error.description;
                return callback(newErr, null);
            }

        });
    }

    recharge(params, callback) {

        var paymentId = params.paymentId;
        var userId = params.userId;
        var amount = parseFloat(params.amount);
        var paymentmodeId = params.paymentmodeId;
        var status = params.status;
        var type = params.type;

        var paymentsRepository = new PaymentsRepository();
        var transactionDetailsRepository = new TransactionDetailsRepository();

        request({
            method: 'POST',
            url: 'https://' + sails.config.connections.razorpayKeyId + ':' + sails.config.connections.razorPayKeySecret + '@api.razorpay.com/v1/payments/' + paymentId + '/capture',
            form: {
                amount: parseFloat(params.amount) * 100
            }
        }, function(error, response, body) {

            var body = JSON.parse(body);

            if (response.statusCode == 200) {
                generateOrderNo(function(orderNo) {
                    var saveTxnObj = {};
                    saveTxnObj.status = status;
                    saveTxnObj.paymentId = paymentId;
                    saveTxnObj.transactionId = orderNo;
                    saveTxnObj.orderNumber = orderNo;
                    saveTxnObj.mode = body.method;

                    transactionDetailsRepository.save(saveTxnObj, function(err, txnData) {
                        if (err)
                            return callback(err);
                        var savePayObj = {};
                        savePayObj.userId = userId;
                        savePayObj.initialAmount = amount;
                        savePayObj.type = type;
                        savePayObj.reducedAmount = 0;
                        savePayObj.paidAmount = amount;
                        savePayObj.promocodeAmount = 0;
                        savePayObj.batuaCommission = 0;
                        savePayObj.merchantFee = 0;
                        savePayObj.isConfirmed = true;
                        savePayObj.isCancelled = false;
                        savePayObj.paymentmodeId = paymentmodeId;
                        savePayObj.transactionDetailId = txnData.id;

                        paymentsRepository.save(savePayObj, function(err, paymentData) {
                            if (err)
                                return callback(err);
                            var userPayObj = {};
                            userPayObj.userId = userId;
                            userPayObj.paymentmodeId = paymentmodeId;
                            userPayObj.balance = amount;
                            UsersPaymentmodes.find({ where: { userId: userId } }).then(function(data) {
                                if (!data) {
                                    UsersPaymentmodes.create(userPayObj);
                                    var sendData = {};
                                    sendData = JSON.parse(JSON.stringify(paymentData));
                                    sendData.balance = amount;
                                    callback(null, sendData);
                                }
                                if (data) {
                                    UsersPaymentmodes.update({ balance: amount + data.balance }, { where: { userId: userId } });
                                    var sendData = {};
                                    sendData = JSON.parse(JSON.stringify(paymentData));
                                    var total = parseFloat(data.balance) + parseFloat(amount);
                                    sendData.balance = +total.toFixed(2);
                                    sendData.mode = txnData.mode;
                                    callback(null, sendData);
                                }
                            });
                        });
                    });
                });
            } else {
                var newErr = {}
                newErr.errorCode = 406;
                newErr.message = body.error.description;
                return callback(newErr, null);
            }
        });
    }

    batuaWalletPayment(params, callback) {

        checkWallet(params.userId, params.amount, function(err, walletData) {

            if (err)
                return callback(err);

            generateOrderNo(function(sequenceNumber) {
                var transactionDetailParam = {};
                transactionDetailParam.orderNumber = sequenceNumber;
                transactionDetailParam.transactionId = sequenceNumber;
                transactionDetailParam.paymentId = "pay_" + sequenceNumber;
                transactionDetailParam.status = params.status;
                transactionDetailParam.mode = "Batua Wallet";

                var transactionDetailsRepository = new TransactionDetailsRepository();

                transactionDetailsRepository.save(transactionDetailParam, function(err, transactionDetail) {
                    if (err)
                        return callback(err, null);
                    /*---save payment for each transaction---*/

                    var savePaymentParam = {};

                    savePaymentParam.transactionDetailId = transactionDetail.id;
                    savePaymentParam.userId = params.userId;
                    savePaymentParam.merchantId = params.merchantId;
                    savePaymentParam.paymentModeId = params.paymentmodeId;
                    savePaymentParam.type = params.type;
                    if (params.promocode) {
                        savePaymentParam.promocodeId = params.promocode.id;
                    } else {
                        savePaymentParam.promocodeId = null;
                    }
                    if (params.offer) {
                        savePaymentParam.offerDiscountId = params.offer.id;
                    } else {
                        savePaymentParam.offerDiscountId = null;
                    }

                    getMerchantFee(params.merchantId, function(merchantFee) {
                        if (params.promocode) {

                            promocodeOperation(params, merchantFee[0].fees, function(resultArray) {
                                savePaymentParam.initialAmount = parseFloat(params.amount);
                                savePaymentParam.reducedAmount = (parseFloat(resultArray.reducedAmount) + parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply) + parseFloat(resultArray.fee));
                                savePaymentParam.paidAmount = parseFloat(resultArray.paidAmount);
                                savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
                                savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
                                savePaymentParam.merchantFee = parseFloat(resultArray.fee);

                                return savePaymentDetails(savePaymentParam, function(err, result) {
                                    if (err) {
                                        return callback(err, null);
                                    }
                                    updateBatuaWallet(params.userId, params.amount, function(newBalance) {
                                        findPaymentDetail(result, function(err, detailResult) {
                                            if (err) {
                                                return callback(err, null);
                                            }
                                            var resultObj = {};
                                            resultObj = JSON.parse(JSON.stringify(detailResult));
                                            resultObj.balance = newBalance;
                                            var sendObj = {};
                                            sendObj.amount = detailResult.initialAmount;
                                            sendObj.type = detailResult.transactionDetail.mode;
                                            sendObj.merchantName = detailResult.merchant.name;
                                            sendObj.transactionId = detailResult.transactionDetail.transactionId;
                                            sendObj.createdAt = detailResult.createdAt;
                                            sendObj.balance = resultObj.balance;
                                            sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.user.email, 'User');
                                            sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.merchant.email, 'Merchant');
                                            return callback(null, resultObj);
                                        });
                                    });
                                });
                            });


                        } else if (params.offer) {
                            offerOperation(params, merchantFee[0].fees, function(resultArray) {
                                savePaymentParam.initialAmount = parseFloat(params.amount);
                                savePaymentParam.reducedAmount = (parseFloat(resultArray.reducedAmount) + parseFloat(resultArray.fee));
                                savePaymentParam.paidAmount = parseFloat(resultArray.paidAmount);
                                savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
                                savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
                                savePaymentParam.merchantFee = parseFloat(resultArray.fee);
                                return savePaymentDetails(savePaymentParam, function(err, result) {
                                    if (err) {
                                        return callback(err, null);
                                    }
                                    updateBatuaWallet(params.userId, params.amount, function(newBalance) {
                                        findPaymentDetail(result, function(err, detailResult) {
                                            if (err) {
                                                return callback(err, null);
                                            }
                                            var resultObj = {};
                                            resultObj = JSON.parse(JSON.stringify(detailResult));
                                            resultObj.balance = newBalance;
                                            var sendObj = {};
                                            sendObj.amount = detailResult.initialAmount;
                                            sendObj.type = detailResult.transactionDetail.mode;
                                            sendObj.merchantName = detailResult.merchant.name;
                                            sendObj.transactionId = detailResult.transactionDetail.transactionId;
                                            sendObj.createdAt = detailResult.createdAt;
                                            sendObj.balance = resultObj.balance;
                                            sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.user.email, 'User');
                                            sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.merchant.email, 'Merchant');
                                            return callback(null, resultObj);
                                        });
                                    });
                                });
                            });

                        } else {
                            var deductionFee = parseFloat(params.amount) * (parseFloat(merchantFee[0].fees) / 100)
                            savePaymentParam.initialAmount = parseFloat(params.amount);
                            savePaymentParam.reducedAmount = deductionFee;
                            savePaymentParam.paidAmount = parseFloat(params.amount) - deductionFee;
                            savePaymentParam.promocodeAmount = 0;
                            savePaymentParam.batuaCommission = 0;
                            savePaymentParam.merchantFee = parseFloat(deductionFee);
                            return savePaymentDetails(savePaymentParam, function(err, result) {
                                if (err) {
                                    return callback(err, null);
                                }
                                updateBatuaWallet(params.userId, params.amount, function(newBalance) {
                                    findPaymentDetail(result, function(err, detailResult) {
                                        if (err) {
                                            return callback(err, null);
                                        }
                                        var resultObj = {};
                                        resultObj = JSON.parse(JSON.stringify(detailResult));
                                        resultObj.balance = newBalance;
                                        var sendObj = {};
                                        sendObj.amount = detailResult.initialAmount;
                                        sendObj.type = detailResult.transactionDetail.mode;
                                        sendObj.merchantName = detailResult.merchant.name;
                                        sendObj.transactionId = detailResult.transactionDetail.transactionId;
                                        sendObj.createdAt = detailResult.createdAt;
                                        sendObj.balance = resultObj.balance;
                                        sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.user.email, 'User');
                                        sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.merchant.email, 'Merchant');
                                        return callback(null, resultObj);
                                    });
                                });
                            });
                        }
                    });
                });
            });
        });
    }

    history(params, callback) {

        var userId = params.userId;

        var paymentsRepository = new PaymentsRepository();

        var whereObject = {};
        whereObject.include = includeModels();
        whereObject.where = {};
        whereObject.where.$and = {};
        whereObject.where.$and.userId = userId;
        whereObject.where.$and.type = {};
        whereObject.where.$and.type.$not = 'recharge';
        whereObject.order = [
            ['createdAt', 'DESC']
        ];

        paymentsRepository.findAll(whereObject, callback);
    }

    wallet(params, callback) {

        var userId = params.userId;

        async.parallel({

            balance: function(walletCallback) {
                getWalletBalance(userId, function(err, balance) {
                    if (err)
                        walletCallback(err)
                    walletCallback(null, balance);
                })
            },

            recharge: function(walletCallback) {
                getRechargedList(userId, function(err, recharge) {
                    if (err)
                        walletCallback(err)
                    walletCallback(null, recharge);
                })
            },

            payment: function(walletCallback) {
                getPaymentList(userId, function(err, payment) {
                    if (err)
                        walletCallback(err)
                    walletCallback(null, payment)
                })
            },

            cashback: function(walletCallback) {
                getCashbackList(userId, function(err, cashback) {
                    if (err)
                        walletCallback(err)
                    walletCallback(null, cashback)
                })
            }

        }, function(err, result) {
            if (err)
                return callback(err);
            return callback(null, result);
        })
    }

    transactionReport(params, callback) {

        var merchantId = params.merchantId;
        var userId = params.userId;
        var fromDate = params.fromDate;
        var toDate = params.toDate;
        var isValidFromDate = (fromDate.length > 2);
        var isValidToDate = (toDate.length > 2);

        if ((isValidFromDate && !isValidToDate) || (!isValidFromDate && isValidToDate))
            return callback("Select From Date and To Date both or none");

        var paymentsRepository = new PaymentsRepository();

        var whereObject = {};
        whereObject.include = [{
            model: Merchants,
            as: 'merchant',
            attributes: ['id', 'name'],
            required: false
        }, {
            model: Users,
            as: 'user',
            attributes: ['id', 'name'],
            required: false
        }, {
            model: Users,
            as: 'cancelledBy',
            attributes: ['id', 'name'],
            required: false
        }, {
            model: TransactionDetails,
            as: 'transactionDetail',
            attributes: ['id', 'orderNumber', 'transactionId', 'paymentId', 'createdAt'],
            required: false
        }, {
            model: Settlements,
            as: 'settlement',
            required: false
        }];
        (merchantId || userId || isValidFromDate || isValidToDate) ? (whereObject.where = {}) : (null);
        (merchantId || userId || isValidFromDate || isValidToDate) ? (whereObject.where.$and = {}) : (null);
        (merchantId) ? (whereObject.where.$and.merchantId = merchantId) : (null);
        (userId) ? (whereObject.where.$and.userId = userId) : (null);
        (isValidFromDate && isValidToDate) ? (whereObject.where.$and.createdAt = {}) : (null);
        if (isValidFromDate && isValidToDate) {
            fromDate = fromDate.replace(/"/g, "");
            toDate = toDate.replace(/"/g, "");
            fromDate = moment(fromDate).format('YYYY-MM-DD');
            toDate = moment(toDate).format('YYYY-MM-DD');
            toDate = moment(moment(toDate).add(1, 'days')._d).format('YYYY-MM-DD');
            whereObject.where.$and.createdAt.$between = [fromDate, toDate]
        }
        whereObject.order = [
            ['createdAt', 'DESC']
        ];
        var txnArray = [];
        var count = 0;
        Payments.findAll(whereObject).then(function(result) {
            if (!result.length)
                return callback(null, []);
            result.forEach(function(obj) {
                count++;
                var txnObj = {};
                txnObj.id = obj.id;
                txnObj.merchantName = (obj.merchant) ? (obj.merchant.name) : (null);
                txnObj.userName = (obj.user) ? (obj.user.name) : (null);
                txnObj.orderNumber = obj.transactionDetail.orderNumber;
                txnObj.transactionId = obj.transactionDetail.paymentId;
                txnObj.transactionDate = obj.createdAt;
                txnObj.paymentAmount = obj.initialAmount;
                if (obj.offerDiscountId) {
                    txnObj.cashbackByOffer = obj.promocodeAmount;
                    txnObj.cashbackByPromo = 0;
                }
                if (obj.promocodeId) {
                    txnObj.cashbackByOffer = 0;
                    txnObj.cashbackByPromo = obj.promocodeAmount;
                }
                if (!obj.offerDiscountId && !obj.promocodeId) {
                    txnObj.cashbackByOffer = 0;
                    txnObj.cashbackByPromo = 0;
                }
                txnObj.amountCreditedToBatua = obj.paidAmount;
                txnObj.transactionCancelledBy = (obj.cancelledBy) ? (obj.cancelledBy.name) : (null);
                txnObj.transactionCancelledOn = obj.cancellationDate;
                txnObj.cancellationDescription = obj.cancellationDescription;
                txnArray.push(txnObj);
                if (count == result.length)
                    return callback(null, txnArray);
            });
        }).catch(function(exception) {
            callback(exception);
        });
    }

    cancelTransaction(params, callback) {

        var paymentId = params.paymentId;
        var cancellationDate = params.cancellationDate;
        var cancellationDescription = params.cancellationDescription;
        var adminId = params.adminId;
        if (!paymentId)
            return callback("Provide Payment Id");
        if (!adminId)
            return callback("Provide Admin Id");
        var updateObject = {};
        updateObject.isCancelled = true;
        updateObject.cancellationDate = cancellationDate;
        updateObject.cancellationDescription = cancellationDescription;
        updateObject.adminId = adminId;
        var whereObject = {};
        var findObject = {};
        whereObject.where = {};
        whereObject.where.id = paymentId;
        findObject = JSON.parse(JSON.stringify(whereObject));

        var paymentsRepository = new PaymentsRepository();

        paymentsRepository.updateAndFind(updateObject, whereObject, findObject, callback);
    }

    generateOtp(params, callback) {
        var phone = params.phone;
        var merchantSecretKey = sails.config.connections.merchantSecretKey;
        request({
            method: 'POST',
            url: 'https://uatsky.yesbank.in/app/uat/merchants/generate_otp.json',
            headers: sails.config.connections.headers,
            json: true,
            body: {
                "mobile_number": phone,
                "merchant_secret_key": merchantSecretKey
            }
        }, function(error, response, body) {
            if (error)
                return callback(error, null);
            if (body.code)
                return callback(body, null);
            return callback(null, body);
        });
    }

    verifyOtp(params, callback) {
        var userId = "" + params.userId;
        var phone = params.phone;
        var otp = "" + params.otp;
        var merchantSecretKey = sails.config.connections.merchantSecretKey;
        request({
            method: 'POST',
            url: 'https://uatsky.yesbank.in/app/uat/merchants/verify_otp.json',
            headers: sails.config.connections.headers,
            json: true,
            body: {
                "mobile_number": phone,
                "merchant_secret_key": merchantSecretKey,
                "otp": otp
            }
        }, function(error, response, body) {
            if (error)
                return callback(error, null);
            if (body.code)
                return callback(body, null);
            var newParams = {};
            newParams.phone = phone;
            newParams.merchantSecretKey = merchantSecretKey;
            newParams.authToken = body.auth_token;
            var psk = sails.config.connections.psk;
            var text = "" + phone + "|" + psk;
            newParams.signature = generateSignature(text);
            getBalanceThirdParty(newParams, callback);
            Users.update({ yesAuthToken: body.auth_token, yesPhone: phone }, { where: { id: userId } });
        });
    }

    getYesWalletBalance(params, callback) {
        var userId = params.userId;
        Users.find({ where: { id: userId } }).then(function(data) {
            if (!data)
                return callback("Incorrect userId !!!");
            if (data && !data.yesAuthToken)
                return callback("Please Verify YES Wallet !!!");
            var psk = sails.config.connections.psk;
            var newParams = {};
            newParams.phone = data.yesPhone;
            newParams.authToken = data.yesAuthToken;
            newParams.merchantSecretKey = sails.config.connections.merchantSecretKey;
            var text = "" + data.yesPhone + "|" + psk;
            newParams.signature = generateSignature(text);
            getBalanceThirdParty(newParams, callback);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    executeTxnThirdParty(params, callback) {
        var phone = params.phone;
        var merchantSecretKey = sails.config.connections.merchantSecretKey;
        var amount = +params.amount;
        var authToken = params.authToken;
        var merchantReferenceNumber = "ref" + (new Date().getTime());
        var psk = sails.config.connections.psk;
        var text = "" + phone + "|" + psk + "|" + amount + "|" + merchantReferenceNumber;
        var signature = generateSignature(text);
        request({
            method: 'POST',
            url: 'https://uatsky.yesbank.in/app/uat/merchants/execute_txn_thirdparty.json',
            headers: sails.config.connections.headers,
            json: true,
            body: {
                "mobile_number": phone,
                "merchant_secret_key": merchantSecretKey,
                "amount": amount,
                "merchant_reference_number": merchantReferenceNumber,
                "description": params.description,
                "signature": signature,
                "auth_token": authToken
            }
        }, function(error, response, body) {
            if (error)
                return callback(error, null);
            if (body.code)
                return callback(body, null);
            return callback(null, body);
        });
    }

    makeYesBankWalletPayment(params, callback) {

        generateOrderNo(function(sequenceNumber) {
            var transactionDetailParam = {};
            transactionDetailParam.orderNumber = sequenceNumber;
            transactionDetailParam.transactionId = sequenceNumber;
            transactionDetailParam.paymentId = params.paymentId;
            transactionDetailParam.status = params.status;
            transactionDetailParam.mode = 'Yes Bank';

            var transactionDetailsRepository = new TransactionDetailsRepository();

            transactionDetailsRepository.save(transactionDetailParam, function(err, transactionDetail) {
                if (err)
                    return callback(err, null);
                /*---save payment for each transaction---*/

                var savePaymentParam = {};

                savePaymentParam.transactionDetailId = transactionDetail.id;
                savePaymentParam.userId = params.userId;
                savePaymentParam.merchantId = params.merchantId;
                savePaymentParam.paymentModeId = params.paymentmodeId;
                savePaymentParam.type = params.type;
                if (params.promocode) {
                    savePaymentParam.promocodeId = params.promocode.id;
                } else {
                    savePaymentParam.promocodeId = null;
                }
                if (params.offer) {
                    savePaymentParam.offerDiscountId = params.offer.id;
                } else {
                    savePaymentParam.offerDiscountId = null;
                }

                getMerchantFee(params.merchantId, function(merchantFee) {
                    if (params.promocode) {

                        promocodeOperation(params, merchantFee[0].fees, function(resultArray) {
                            savePaymentParam.initialAmount = parseFloat(params.amount);
                            savePaymentParam.reducedAmount = (parseFloat(resultArray.reducedAmount) + parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply) + parseFloat(resultArray.fee));
                            savePaymentParam.paidAmount = parseFloat(resultArray.paidAmount);
                            savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
                            savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
                            savePaymentParam.merchantFee = parseFloat(resultArray.fee);

                            return savePaymentDetails(savePaymentParam, function(err, result) {
                                if (err) {
                                    return callback(err, null);
                                }
                                findPaymentDetail(result, function(err, detailResult) {
                                    if (err) {
                                        return callback(err, null);
                                    }
                                    var sendObj = {};
                                    sendObj.amount = detailResult.initialAmount;
                                    sendObj.type = detailResult.transactionDetail.mode;
                                    sendObj.merchantName = detailResult.merchant.name;
                                    sendObj.transactionId = detailResult.transactionDetail.transactionId;
                                    sendObj.createdAt = detailResult.createdAt;
                                    sendObj.balance = detailResult.balance;
                                    sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.user.email, 'User');
                                    sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.merchant.email, 'Merchant');
                                    return callback(null, detailResult);
                                });

                            });
                        });


                    } else if (params.offer) {
                        offerOperation(params, merchantFee[0].fees, function(resultArray) {
                            savePaymentParam.initialAmount = parseFloat(params.amount);
                            savePaymentParam.reducedAmount = (parseFloat(resultArray.reducedAmount) + parseFloat(resultArray.fee));
                            savePaymentParam.paidAmount = parseFloat(resultArray.paidAmount);
                            savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
                            savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
                            savePaymentParam.merchantFee = parseFloat(resultArray.fee);
                            return savePaymentDetails(savePaymentParam, function(err, result) {
                                if (err) {
                                    return callback(err, null);
                                }
                                findPaymentDetail(result, function(err, detailResult) {
                                    if (err) {
                                        return callback(err, null);
                                    }
                                    var sendObj = {};
                                    sendObj.amount = detailResult.initialAmount;
                                    sendObj.type = detailResult.transactionDetail.mode;
                                    sendObj.merchantName = detailResult.merchant.name;
                                    sendObj.transactionId = detailResult.transactionDetail.transactionId;
                                    sendObj.createdAt = detailResult.createdAt;
                                    sendObj.balance = detailResult.balance;
                                    sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.user.email, 'User');
                                    sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.merchant.email, 'Merchant');
                                    return callback(null, detailResult);
                                });

                            });
                        });

                    } else {
                        var deductionFee = parseFloat(params.amount) * (parseFloat(merchantFee[0].fees) / 100)
                        savePaymentParam.initialAmount = parseFloat(params.amount);
                        savePaymentParam.reducedAmount = deductionFee;
                        savePaymentParam.paidAmount = parseFloat(params.amount) - deductionFee;
                        savePaymentParam.promocodeAmount = 0;
                        savePaymentParam.batuaCommission = 0;
                        savePaymentParam.merchantFee = parseFloat(deductionFee);
                        return savePaymentDetails(savePaymentParam, function(err, result) {
                            if (err) {
                                return callback(err, null);
                            }
                            findPaymentDetail(result, function(err, detailResult) {
                                if (err) {
                                    return callback(err, null);
                                }
                                var sendObj = {};
                                sendObj.amount = detailResult.initialAmount;
                                sendObj.type = detailResult.transactionDetail.mode;
                                sendObj.merchantName = detailResult.merchant.name;
                                sendObj.transactionId = detailResult.transactionDetail.transactionId;
                                sendObj.createdAt = detailResult.createdAt;
                                sendObj.balance = detailResult.balance;
                                sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.user.email, 'User');
                                sendSuccessPayment(sendObj, 'support@thebatua.com', detailResult.merchant.email, 'Merchant');
                                return callback(null, detailResult);
                            });
                        });
                    }
                });
            });
        });
    }

    errorConstructionForPayment(params, callback) {

        var self = this;
        self = params;

        async.waterfall([
            async.apply(getMerchantDetails, self),
            getTransactionDetails,
            getIntialAmount,
            getPromoCodeAmount
        ], function(error, result) {
            if (error || result) {
                return callback(null, self);
            }
        });
    }

}

module.exports = PaymentService;

function getMerchantDetails(self, callback) {

    var merchantRepository = new MerchantRepository();
    var merchantId = self.merchantId;

    var query = "SELECT *,NOW() as currentDate FROM Merchants where id= :merchantId";

    var queryType = sequelize.QueryTypes.SELECT;

    var replacement = {
        merchantId: merchantId
    }

    merchantRepository.exec(query, replacements, queryType, function(err, result) {
        if (err || result.length < 0) {
            self.merchant = {};
            self.merchant.id = null;
            self.merchant.name = null;
            self.merchant.address = null;
            self.createdAt = result[0].currentDate;
            self.merchant.fees = null;
            return callback(null, self);
        }

        if (result.length > 0) {
            self.merchant = {};
            self.merchant.id = result[0].id;
            self.merchant.name = result[0].name;
            self.merchant.address = result[0].address;
            self.createdAt = result[0].currentDate;
            self.merchant.fees = result[0].fees
            return callback(null, self);
        }

    });

}

function getTransactionDetails(self, callback) {
    self.transactionDetail = {};
    self.transactionDetail.orderNumber = null;
    self.transactionDetail.transactionId = null;
    return callback(null, self);
}

function getIntialAmount(self, callback) {
    self.initialAmount = self.amount;
    return callback(null, self);
}

function getPromoCodeAmount(self, callback) {
    var savePaymentParam = {};

    if (self.promocode) {

        promoCodeComputation(self, self.merchant.fees, function(resultArray) {
            savePaymentParam.initialAmount = parseFloat(params.amount);
            savePaymentParam.reducedAmount = (parseFloat(resultArray.reducedAmount) + parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply) + parseFloat(resultArray.fee));
            savePaymentParam.paidAmount = parseFloat(resultArray.paidAmount);
            savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
            savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
            savePaymentParam.merchantFee = parseFloat(resultArray.fee);
        });

        self.promocodeAmount = savePaymentParam.promocodeAmount;
        return callback(null, self);
    }

    if (self.offer) {
        offerOperation(self, self.merchant.fees, function(resultArray) {
            savePaymentParam.initialAmount = parseFloat(params.amount);
            savePaymentParam.reducedAmount = (parseFloat(resultArray.reducedAmount) + parseFloat(resultArray.fee));
            savePaymentParam.paidAmount = parseFloat(resultArray.paidAmount);
            savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
            savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
            savePaymentParam.merchantFee = parseFloat(resultArray.fee);

        });

        self.promocodeAmount = savePaymentParam.promocodeAmount;
        return callback(null, self);
    }
}

function offerCodeComputation(params, fee, callback) {

    var discountPercentage = params.offer.discountPercentage;
    var amount = params.amount;
    var maximumAmountLimit = params.offer.maximumAmountLimit;

    /*------------ calculate discount amount -----------*/

    var reducedAmount = amount * (discountPercentage / 100);

    /*------------ /calculate discount amount -----------*/

    /*------------ Check discount amount greater than maximumAmountLimit -----------*/

    if (reducedAmount > maximumAmountLimit) {
        reducedAmount = maximumAmountLimit;
    }
    /*------------ /Check discount amount greater than maximumAmountLimit -----------*/

    /*------------ get amount after offer applied  -----------*/

    var amountAfterOfferApply = amount - reducedAmount;

    /*------------ /get amount after offer applied  -----------*/


    /*------------ Paid Amount To Merchants -----------*/
    var deductionFee = amountAfterOfferApply * (fee / 100);
    var paidAmount = amountAfterOfferApply - deductionFee;

    var returnObject = {};

    returnObject.reducedAmount = reducedAmount;
    returnObject.amountAfterOfferApply = amountAfterOfferApply;
    returnObject.paidAmount = paidAmount;
    returnObject.fee = deductionFee;
    returnObject.deductionAmountFromAmountAfterPromocodeApply = 0;

    return callback(returnObject);
}

function promoCodeComputation(params, fee, callback) {
    var discountPercentage = params.promocode.discountPercentage;
    var amount = params.amount;
    var maximumAmountLimit = params.promocode.maximumAmountLimit;

    /*------------ calculate discount amount -----------*/

    var reducedAmount = amount * (discountPercentage / 100);

    /*------------ /calculate discount amount -----------*/

    /*------------ Check discount amount greater than maximumAmountLimit -----------*/

    if (reducedAmount > maximumAmountLimit) {
        reducedAmount = maximumAmountLimit;
    }

    /*------------ /Check discount amount greater than maximumAmountLimit -----------*/

    /*------------ get amount after promocode applied  -----------*/

    var amountAfterPromocodeApply = amount - reducedAmount;

    /*------------ /get amount after promocode applied  -----------*/


    /*------------ % cost bourned by merchnats -----------*/

    var merchantBournedPercentage = params.promocode.percentageCostBourneByMerchant;

    var deductionAmountFromAmountAfterPromocodeApply = reducedAmount * (merchantBournedPercentage / 100);

    /*------------ /% cost bourned by merchnats -----------*/

    var payAmountAfterBurned = amount - deductionAmountFromAmountAfterPromocodeApply;

    /*------------ Paid Amount To Merchants -----------*/
    var deductionFee = payAmountAfterBurned * (fee / 100);
    var paidAmount = payAmountAfterBurned - deductionFee;

    var returnObject = {};

    returnObject.reducedAmount = reducedAmount;
    returnObject.amountAfterPromocodeApply = amountAfterPromocodeApply;
    returnObject.deductionAmountFromAmountAfterPromocodeApply = deductionAmountFromAmountAfterPromocodeApply;
    returnObject.paidAmount = paidAmount;
    returnObject.fee = deductionFee;

    return callback(returnObject);
}



function getWalletBalance(userId, callback) {

    var getWalletBalanceQueryString = "SELECT balance FROM UsersPaymentmodes WHERE userId = :userId";
    var options = {};
    options.replacements = {};
    options.replacements.userId = userId;
    options.type = sequelize.QueryTypes.SELECT;

    sequelize.query(getWalletBalanceQueryString, options).then(function(result) {
        if (result && result.length)
            callback(null, result[0].balance);
        if (!result || !result.length)
            callback(null, 0);
    }).catch(function(exception) {
        callback(exception);
    });
}

function getRechargedList(userId, callback) {

    var paymentsRepository = new PaymentsRepository();

    var whereObject = {};
    whereObject.include = includeModels();
    whereObject.where = {};
    whereObject.where.$and = {};
    whereObject.where.$and.userId = userId;
    whereObject.where.$and.type = 'recharge';
    whereObject.order = [
        ['createdAt', 'DESC']
    ];

    paymentsRepository.findAll(whereObject, function(err, result) {
        if (err)
            return callback(err);
        callback(null, result);
    });
}

function getPaymentList(userId, callback) {

    var paymentsRepository = new PaymentsRepository();

    var whereObject = {};
    whereObject.include = includeModels();
    whereObject.where = {};
    whereObject.where.$and = {};
    whereObject.where.$and.userId = userId;
    whereObject.where.$and.type = 'payment';
    whereObject.where.$and.merchantId = {};
    whereObject.where.$and.merchantId.$not = null;
    whereObject.where.$and.paymentmodeId = 3;
    whereObject.order = [
        ['createdAt', 'DESC']
    ];

    paymentsRepository.findAll(whereObject, function(err, result) {
        if (err)
            return callback(err);
        callback(null, result);
    });
}

function getCashbackList(userId, callback) {

    var paymentsRepository = new PaymentsRepository();

    var whereObject = {};
    whereObject.include = includeModels();
    whereObject.where = {};
    whereObject.where.$and = {};
    whereObject.where.$and.userId = userId;
    whereObject.where.$and.type = 'payment';
    whereObject.where.$and.merchantId = {};
    whereObject.where.$and.merchantId.$not = null;
    whereObject.where.$and.$or = {};
    whereObject.where.$and.$or.offerDiscountId = {};
    whereObject.where.$and.$or.offerDiscountId.$not = null;
    whereObject.where.$and.$or.promocodeId = {};
    whereObject.where.$and.$or.promocodeId.$not = null;
    whereObject.order = [
        ['createdAt', 'DESC']
    ];

    paymentsRepository.findAll(whereObject, function(err, result) {
        if (err)
            return callback(err);
        callback(null, result);
    });
}

function findPaymentDetail(paymentResponse, callback) {

    var params = {};
    params.where = {};
    params.where.id = paymentResponse.id;
    var paymentsRepository = new PaymentsRepository();
    paymentsRepository.find(params, function(err, findResult) {
        if (err) {
            return callback(err, null);
        }
        var include = [{
            model: Merchants,
            as: 'merchant',
            required: false
        }, {
            model: Users,
            as: 'user',
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
            required: false
        }, {
            model: Paymentmodes,
            as: 'paymentMode',
            required: true
        }, {
            model: Settlements,
            as: 'settlement',
            required: false
        }];
        params.include = include;

        paymentsRepository.find(params, function(err, findResult) {
            if (err) {
                return callback(err, null);
            }
            UsersPaymentmodes.find({ where: { userId: findResult.user.id } }).then(function(data) {
                var result = JSON.parse(JSON.stringify(findResult));
                result.balance = (data) ? (data.balance) : (0);
                return callback(null, result);
            });
        });
    });

}

function savePaymentDetails(params, callback) {

    var paymentsRepository = new PaymentsRepository();

    paymentsRepository.save(params, function(err, result) {
        if (err) {

            return callback(err, null);
        }
        return callback(null, result);
    });

}

function generateOrderNo(callback) {

    var dateNow = new Date();
    var dd = dateNow.getDate();
    var monthSingleDigit = dateNow.getMonth() + 1,
        mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
    var yy = dateNow.getFullYear().toString();

    var formattedDate = dd + mm + yy;

    var rawQueryString = "SELECT AUTO_INCREMENT" +
        " FROM information_schema.TABLES" +
        " WHERE TABLE_SCHEMA = 'batua'" +
        " AND TABLE_NAME = 'TransactionDetails'";

    sequelize.query(rawQueryString, { type: sequelize.QueryTypes.SELECT }).then(function(result) {
        if (result) {
            if (result.length > 0) {
                var sequenceNumber = result[0].AUTO_INCREMENT < 100 ? '00' + result[0].AUTO_INCREMENT : result[0].AUTO_INCREMENT
                callback(formattedDate + sequenceNumber);
            } else {
                var sequenceNumber = "001";
                callback(formattedDate + sequenceNumber);
            }
        }
    });

}

function getMerchantFee(merchantId, callback) {

    var rawQueryString = "SELECT `fees` FROM `Merchants` WHERE 1 AND `id` = :merchantId";
    sequelize.query(rawQueryString, {
        replacements: { merchantId: merchantId },
        type: sequelize.QueryTypes.SELECT
    }).then(function(result) {
        if (result) {
            return callback(result);
        }
    });
}

function promocodeOperation(params, fee, callback) {

    var discountPercentage = params.promocode.discountPercentage;
    var amount = params.amount;
    var maximumAmountLimit = params.promocode.maximumAmountLimit;

    /*------------ calculate discount amount -----------*/

    var reducedAmount = amount * (discountPercentage / 100);

    /*------------ /calculate discount amount -----------*/

    /*------------ Check discount amount greater than maximumAmountLimit -----------*/

    if (reducedAmount > maximumAmountLimit) {
        reducedAmount = maximumAmountLimit;
    }

    /*------------ /Check discount amount greater than maximumAmountLimit -----------*/

    /*------------ get amount after promocode applied  -----------*/

    var amountAfterPromocodeApply = amount - reducedAmount;

    /*------------ /get amount after promocode applied  -----------*/


    /*------------ % cost bourned by merchnats -----------*/

    var merchantBournedPercentage = params.promocode.percentageCostBourneByMerchant;

    var deductionAmountFromAmountAfterPromocodeApply = reducedAmount * (merchantBournedPercentage / 100);

    /*------------ /% cost bourned by merchnats -----------*/

    var payAmountAfterBurned = amount - deductionAmountFromAmountAfterPromocodeApply;

    /*------------ Paid Amount To Merchants -----------*/
    var deductionFee = payAmountAfterBurned * (fee / 100);
    var paidAmount = payAmountAfterBurned - deductionFee;

    var returnObject = {};

    returnObject.reducedAmount = reducedAmount;
    returnObject.amountAfterPromocodeApply = amountAfterPromocodeApply;
    returnObject.deductionAmountFromAmountAfterPromocodeApply = deductionAmountFromAmountAfterPromocodeApply;
    returnObject.paidAmount = paidAmount;
    returnObject.fee = deductionFee;

    updateUserWalletBalance(params.userId, params.paymentmodeId, reducedAmount, function(updateResult) {

        if (updateResult) {
            return callback(returnObject);
        }

    });

}

function offerOperation(params, fee, callback) {

    var discountPercentage = params.offer.discountPercentage;
    var amount = params.amount;
    var maximumAmountLimit = params.offer.maximumAmountLimit;

    /*------------ calculate discount amount -----------*/

    var reducedAmount = amount * (discountPercentage / 100);

    /*------------ /calculate discount amount -----------*/

    /*------------ Check discount amount greater than maximumAmountLimit -----------*/

    if (reducedAmount > maximumAmountLimit) {
        reducedAmount = maximumAmountLimit;
    }
    /*------------ /Check discount amount greater than maximumAmountLimit -----------*/

    /*------------ get amount after offer applied  -----------*/

    var amountAfterOfferApply = amount - reducedAmount;

    /*------------ /get amount after offer applied  -----------*/


    /*------------ Paid Amount To Merchants -----------*/
    var deductionFee = amountAfterOfferApply * (fee / 100);
    var paidAmount = amountAfterOfferApply - deductionFee;

    var returnObject = {};

    returnObject.reducedAmount = reducedAmount;
    returnObject.amountAfterOfferApply = amountAfterOfferApply;
    returnObject.paidAmount = paidAmount;
    returnObject.fee = deductionFee;
    returnObject.deductionAmountFromAmountAfterPromocodeApply = 0;

    updateUserWalletBalance(params.userId, params.paymentmodeId, reducedAmount, function(updateResult) {

        if (updateResult) {
            return callback(returnObject);
        }

    });



}

function updateUserWalletBalance(userId, paymentmodeId, cashBack, callback) {

    var rawQueryString = "SELECT `balance` FROM UsersPaymentmodes WHERE 1 AND userId=:userId";
    sequelize.query(rawQueryString, {
        replacements: { userId: userId },
        type: sequelize.QueryTypes.SELECT
    }).then(function(result) {

        if (result.length > 0) {
            var balance = result[0].balance;
            var newBalance = parseFloat(balance) + parseFloat(cashBack);
            var rawQueryStringUpdate = "UPDATE `UsersPaymentmodes` SET `balance`=:balance WHERE 1 AND `userId`=:userId";

            sequelize.query(rawQueryStringUpdate, {
                replacements: { balance: newBalance, userId: userId },
                type: sequelize.QueryTypes.UPDATE
            }).then(function(result) {
                callback(true);
            });

        } else {
            var balance = 0;
            var newBalance = parseFloat(balance) + parseFloat(cashBack);

            var rawQueryStringUpdate = "INSERT INTO `UsersPaymentmodes`( `balance`,`userId`,`paymentmodeId`) VALUES (:balance,:userId,:paymentmodeId)";

            sequelize.query(rawQueryStringUpdate, {
                replacements: { balance: newBalance, userId: userId, paymentmodeId: paymentmodeId },
                type: sequelize.QueryTypes.INSERT
            }).then(function(result) {
                callback(true);
            });
        }

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

function getBalanceThirdParty(params, callback) {
    var phone = params.phone;
    var authToken = params.authToken;
    var signature = params.signature;
    request({
        method: 'POST',
        url: 'https://uatsky.yesbank.in/app/uat/merchants/get_balance_thirdparty.json',
        headers: sails.config.connections.headers,
        json: true,
        body: {
            "mobile_number": phone,
            "merchant_secret_key": sails.config.connections.merchantSecretKey,
            "signature": signature,
            "auth_token": authToken
        }
    }, function(error, response, body) {
        body.yesPhone = phone;
        if (error)
            return callback(error, null);
        if (body.code)
            return callback(body, null);
        return callback(null, body);
    });
}

function generateSignature(text) {
    var sha = crypto.createHash('sha512').update(text);
    var result = sha.digest('hex');
    return result;
}

function updateBatuaWallet(userId, amount, callback) {

    UsersPaymentmodes.find({ where: { userId: userId } }).then(function(oldBalance) {
        var balance = +(parseFloat(oldBalance.balance) - parseFloat(amount)).toFixed(2);
        UsersPaymentmodes.update({ balance: balance }, { where: { userId: userId } }).then(function(newBalance) {
            callback(balance);
        });
    });
}

function checkWallet(userId, amount, callback) {
    UsersPaymentmodes.find({ where: { userId: userId } }).then(function(data) {
        if (!data) {
            UsersPaymentmodes.create({ userId: userId, balance: 0, paymentmodeId: 3 });
            return callback("Insufficient balance");
        }
        if (data && data.balance < amount)
            return callback("Insufficient balance");
        return callback(null, data);
    }).catch(function(exception) {
        callback(exception);
    });
}

function sendSuccessPayment(sendObj, emailFrom, emailTo, emailToUserType) {
    var awsSesService = new AwsSesService();
    var params = {};
    params.sender = emailFrom;
    params.receivers = [];
    params.subjectText = 'Successful Payment Done';
    params.receivers.push(emailTo);
    if (emailToUserType == 'User') {
        params.bodyText = '';
        var templatPath = './api/templates/success-payments/success-merchant.ejs';
        var template = fs.readFileSync(templatPath, "utf-8");
        var mapObject = {};
        mapObject.ReceivedAmt = sendObj.amount; // Capital case because of template is using the same 
        mapObject.DebitCard = sendObj.type;
        mapObject.MerchantName = sendObj.merchantName;
        mapObject.transid = sendObj.transactionId;
        mapObject.DateOfCredit = sendObj.createdAt;
        mapObject.CreditAmount = sendObj.amount;
        mapObject.AcountBalance = sendObj.amount;
        var regExp = new RegExp(Object.keys(mapObject).join("|"), "gi");
        var htmlTemplate = template.replace(regExp, function(matched) {
            return mapObject[matched];
        });
        params.htmlTemplate = htmlTemplate;
    }
    if (emailToUserType == 'Merchant') {
        params.bodyText = '';
        var templatPath = './api/templates/success-payments/success-user.ejs';
        var template = fs.readFileSync(templatPath, "utf-8");
        var mapObject = {};
        mapObject.DebitCard = sendObj.type;
        mapObject.MerchantName = sendObj.merchantName;
        mapObject.transid = sendObj.transactionId;
        mapObject.DateOfDebit = sendObj.createdAt;
        mapObject.DebitAmount = sendObj.amount;
        mapObject.WalletBalance = sendObj.balance;
        var regExp = new RegExp(Object.keys(mapObject).join("|"), "gi");
        var htmlTemplate = template.replace(regExp, function(matched) {
            return mapObject[matched];
        });
        params.htmlTemplate = htmlTemplate;
    }
    awsSesService.sendEmail(params, function(err, result) {
        if (err)
            console.log(err);
        else
            console.log(result);
    });
}