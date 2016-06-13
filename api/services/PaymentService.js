'use strict';

var PaymentsRepository = require('../repositories/PaymentsRepository.js');

var TransactionDetailsRepository = require('../repositories/TransactionDetailsRepository.js');

var request = require('request');
var crypto = require('crypto');

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
        var amount = params.amount;
        var paymentmodeId = params.paymentmodeId;
        var status = params.status;
        var type = params.type;

        var paymentsRepository = new PaymentsRepository();
        var transactionDetailsRepository = new TransactionDetailsRepository();

        generateOrderNo(function(orderNo) {
            var saveTxnObj = {};
            saveTxnObj.status = status;
            saveTxnObj.paymentId = paymentId;
            saveTxnObj.transactionId = orderNo;
            saveTxnObj.orderNumber = orderNo;

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
                            var sendData={};
                            sendData=JSON.parse(JSON.stringify(paymentData));
                            sendData.balance = amount;
                            callback(null, sendData);
                        }
                        if (data) {
                            UsersPaymentmodes.update({ balance: amount + data.balance }, { where: { userId: userId } });
                            var sendData={};
                            sendData=JSON.parse(JSON.stringify(paymentData));
                            sendData.balance = data.balance + amount;
                            callback(null, sendData);
                        }
                    })
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
        whereObject.where.userId = userId;
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
        whereObject.where = {};
        whereObject.where.$and = {};
        (merchantId) ? (whereObject.where.$and.merchantId = merchantId) : (null);
        (userId) ? (whereObject.where.$and.userId = userId) : (null);
        (fromDate && toDate) ? (whereObject.where.$and.createdAt.$between = [fromDate, toDate]) : (null);
        whereObject.order = [
            ['createdAt', 'DESC']
        ];
        var txnArray = [];
        var count = 0;
        Payments.findAll(whereObject).then(function(result) {
            result.forEach(function(obj) {
                count++;
                var txnObj = {};
                txnObj.id = obj.id;
                txnObj.merchantName = obj.merchant.name;
                txnObj.userName = obj.user.name;
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
        var phone = params.phone;
        var otp = params.otp;
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
        });
    }

    executeTxnThirdParty(params, callback) {
        var phone = params.phone;
        var merchantSecretKey = sails.config.connections.merchantSecretKey;
        var amount = +params.amount;
        var authToken = params.authToken;
        var merchantReferenceNumber = sails.config.connections.merchantReferenceNumber;
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
                "merchent_reference_number": merchantReferenceNumber,
                "description": "test1",
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
            transactionDetailParam.mode = 'Yes Wallet';

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
                                return callback(null, detailResult);
                            });
                        });
                    }
                });
            });
        });
    }

}
module.exports = PaymentService;

function getWalletBalance(userId, callback) {

    var getWalletBalanceQueryString = "SELECT balance FROM UsersPaymentmodes WHERE userId = :userId";
    var options = {};
    options.replacements = {};
    options.replacements.userId = userId;
    options.type = sequelize.QueryTypes.SELECT;

    sequelize.query(getWalletBalanceQueryString, options).then(function(result) {
        callback(null, result[0].balance);
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
            required: false
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
            return callback(null, findResult);
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
        console.log(result);
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
