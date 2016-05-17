'use strict';

var PaymentsRepository = require('../repositories/PaymentsRepository.js');

var TransactionDetailsRepository = require('../repositories/TransactionDetailsRepository.js');

class PaymentService {

save(params, callback) {

generateOrderNo(function(sequenceNumber){

    var transactionDetailParam = {};

    transactionDetailParam.orderNumber = sequenceNumber;
    transactionDetailParam.transactionId = sequenceNumber;
    transactionDetailParam.paymentId = params.paymentId;
    transactionDetailParam.status = params.status;

    var transactionDetailsRepository = new TransactionDetailsRepository();  
    
    transactionDetailsRepository.save(transactionDetailParam, function(err,transactionDetail){
            if (err)
                return callback(err,null);
            /*---save payment for each transaction---*/

            var savePaymentParam = {};

            savePaymentParam.transactionDetailId = transactionDetail.id;
            savePaymentParam.userId = params.userId;
            savePaymentParam.merchantId = params.merchantId;
            savePaymentParam.paymentModeId = params.paymentmodeId;
            savePaymentParam.type = params.type;
            if(params.promocode){
               savePaymentParam.promocodeId = params.promocode.id; 
            }else{
               savePaymentParam.promocodeId = null; 
            }
            if(params.offer){
               savePaymentParam.offerDiscountId = params.offer.id; 
            }else{
               savePaymentParam.offerDiscountId = null; 
            }

            getMerchantFee(params.merchantId,function(merchantFee){
            // managing promocode 
            if(params.promocode){

                promocodeOperation(params,merchantFee[0].fees,function(resultArray){
                    savePaymentParam.initialAmount = parseFloat(params.amount);
                    savePaymentParam.reducedAmount = (parseFloat(resultArray.reducedAmount) 
                                                        + parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply)
                                                        + parseFloat(resultArray.fee));
                    savePaymentParam.paidAmount = parseFloat(resultArray.paidAmount);
                    savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
                    savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
                    savePaymentParam.merchantFee=parseFloat(resultArray.fee); 
                    
                    return savePaymentDetails(savePaymentParam, function(err, result) {
                        if (err) {
                            return callback(err,null);
                        }
                        findPaymentDetail(result,function(err,detailResult){
                            if (err) {
                                return callback(err,null);
                            }
                          
                            /*var detailResultParsed = JSON.parse(JSON.stringify(detailResult));
                            detailResultParsed.promocodeAmount = parseFloat(resultArray.reducedAmount);
                            detailResultParsed.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
                            detailResultParsed.merchantFee = parseFloat(resultArray.fee); */    
                            return callback(null, detailResult);
                        });
                        
                    });
                });

                
            }else if(params.offer){
                offerOperation(params,merchantFee[0].fees,function(resultArray){
                    savePaymentParam.initialAmount = parseFloat(params.amount);
                    savePaymentParam.reducedAmount = (parseFloat(resultArray.reducedAmount) 
                                                      + parseFloat(resultArray.fee));
                    savePaymentParam.paidAmount = parseFloat(resultArray.paidAmount);
                    savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
                    savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
                    savePaymentParam.merchantFee=parseFloat(resultArray.fee); 
                    return savePaymentDetails(savePaymentParam, function(err, result) {
                        if (err) {
                            return callback(err,null);
                        }
                        findPaymentDetail(result,function(err,detailResult){
                            if (err) {
                                return callback(err,null);
                            }
                           /* var detailResultParsed = JSON.parse(JSON.stringify(detailResult));
                            detailResultParsed.promocodeAmount = parseFloat(resultArray.reducedAmount);
                            detailResultParsed.batuaCommission = 0;
                            detailResultParsed.merchantFee = parseFloat(resultArray.fee);*/
                            return callback(null, detailResult);
                        });
                        
                    });
                });

            }else{
                var deductionFee = parseFloat(params.amount) * (parseFloat(merchantFee[0].fees) / 100)
                savePaymentParam.initialAmount = parseFloat(params.amount);
                savePaymentParam.reducedAmount = deductionFee;
                savePaymentParam.paidAmount =parseFloat(params.amount) - deductionFee;
                savePaymentParam.promocodeAmount = parseFloat(resultArray.reducedAmount);
                savePaymentParam.batuaCommission = parseFloat(resultArray.deductionAmountFromAmountAfterPromocodeApply);
                savePaymentParam.merchantFee=parseFloat(resultArray.fee); 
                
                return savePaymentDetails(savePaymentParam, function(err, result) {
                    if (err) {
                        return callback(err,null);
                    }
                    findPaymentDetail(result,function(err,detailResult){
                            if (err) {
                                return callback(err,null);
                            }
                            /*var detailResultParsed = JSON.parse(JSON.stringify(detailResult));
                            detailResultParsed.promocodeAmount = 0;
                            detailResultParsed.batuaCommission = 0;
                            detailResultParsed.merchantFee = deductionFee;*/
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

function findPaymentDetail(paymentResponse,callback){

    var params = {};
    params.where = {};
    params.where.id = paymentResponse.id;
    var paymentsRepository = new PaymentsRepository();
    paymentsRepository.find(params, function(err,findResult){
        if (err) {
            return callback(err,null);
        }
        var include = [{
            model: Merchants,
            as:'merchant',
            required: false
        },
        {
            model: Users,
            as:'user',
            required: false
        },
        {
            model: Promocodes,
            as:'promocode',
            required: false
        },
        {
            model: Offers,
            as:'offerDiscount',
            required: false
        },
        {
            model: TransactionDetails,
            as:'transactionDetail',
            required: false
        },
        {
            model: Paymentmodes,
            as:'paymentMode',
            required: false
        }
        ];
        params.include = include;

        paymentsRepository.find(params, function(err,findResult){
            if (err) {
                return callback(err,null);
            }
            return callback(null, findResult);
        });
    });

}

function savePaymentDetails(params, callback) {

    var paymentsRepository = new PaymentsRepository();

    paymentsRepository.save(params, function(err,result){
    if(err){

       return callback(err,null); 
    }
    return callback(null,result); 
    });

}

function generateOrderNo(callback){

    var dateNow = new Date();
    var dd = dateNow.getDate();
    var monthSingleDigit = dateNow.getMonth() + 1,
    mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
    var yy = dateNow.getFullYear().toString();

    var formattedDate = dd + mm + yy;

    var rawQueryString = "SELECT AUTO_INCREMENT"+
    " FROM information_schema.TABLES"+
    " WHERE TABLE_SCHEMA = 'batua'"+
    " AND TABLE_NAME = 'TransactionDetails'";

    sequelize.query(rawQueryString,
    { type: sequelize.QueryTypes.SELECT }
    ).then(function(result) {
        console.log(result);
        if(result){
           if(result.length > 0){
            var sequenceNumber = result[0].AUTO_INCREMENT < 100 ? '00' + result[0].AUTO_INCREMENT : result[0].AUTO_INCREMENT
            callback(formattedDate+sequenceNumber);
        }      
        else{
           var sequenceNumber = "001";
           callback(formattedDate+sequenceNumber); 
       }
    }
    });                     

}

function getMerchantFee(merchantId,callback){

    var rawQueryString = "SELECT `fees` FROM `Merchants` WHERE 1 AND `id` = :merchantId";
    sequelize.query(rawQueryString,
        { replacements: {merchantId:merchantId}, 
        type: sequelize.QueryTypes.SELECT }
        ).then(function(result) {
            if(result){
                return callback(result);
            }
        });
}

function promocodeOperation(params,fee,callback){

    var discountPercentage = params.promocode.discountPercentage;
    var amount =  params.amount;
    var maximumAmountLimit = params.promocode.maximumAmountLimit;
    
    /*------------ calculate discount amount -----------*/        

    var reducedAmount = amount * (discountPercentage/100);

    /*------------ /calculate discount amount -----------*/    

    /*------------ Check discount amount greater than maximumAmountLimit -----------*/    

    if(reducedAmount > maximumAmountLimit){
        reducedAmount = maximumAmountLimit;
    }
    
    /*------------ /Check discount amount greater than maximumAmountLimit -----------*/    

    /*------------ get amount after promocode applied  -----------*/

    var amountAfterPromocodeApply = amount - reducedAmount;

    /*------------ /get amount after promocode applied  -----------*/

    
    /*------------ % cost bourned by merchnats -----------*/

    var merchantBournedPercentage = params.promocode.percentageCostBourneByMerchant;
    
    var deductionAmountFromAmountAfterPromocodeApply = reducedAmount * (merchantBournedPercentage/100);
    
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

    updateUserWalletBalance(params.userId,params.paymentmodeId,reducedAmount,function(updateResult){

        if(updateResult){
            return callback(returnObject);
        }

    });

}

function offerOperation(params,fee,callback){

    var discountPercentage = params.offer.discountPercentage;
    var amount =  params.amount;
    var maximumAmountLimit = params.offer.maximumAmountLimit;
    
    /*------------ calculate discount amount -----------*/        

    var reducedAmount = amount * (discountPercentage/100);

    /*------------ /calculate discount amount -----------*/    

    /*------------ Check discount amount greater than maximumAmountLimit -----------*/    

    if(reducedAmount > maximumAmountLimit){
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

    updateUserWalletBalance(params.userId,params.paymentmodeId,reducedAmount,function(updateResult){

        if(updateResult){
            return callback(returnObject);
        }

    });

    

}

function updateUserWalletBalance(userId,paymentmodeId,cashBack,callback){

    var rawQueryString = "SELECT `balance` FROM UsersPaymentmodes WHERE 1 AND userId=:userId";
    sequelize.query(rawQueryString,
        { replacements: {userId:userId}, 
        type: sequelize.QueryTypes.SELECT }
        ).then(function(result) {
            
            if(result.length > 0){
               var balance = result[0].balance;
               var newBalance = parseFloat(balance) + parseFloat(cashBack);
               var rawQueryStringUpdate = "UPDATE `UsersPaymentmodes` SET `balance`=:balance WHERE 1 AND `userId`=:userId";

                sequelize.query(rawQueryStringUpdate,
                    { replacements: {balance:newBalance,userId:userId}, 
                    type: sequelize.QueryTypes.UPDATE }
                    ).then(function(result) {
                        callback(true);
                });
            
            }else{
                var balance = 0;
                var newBalance = parseFloat(balance) + parseFloat(cashBack);
               
                var rawQueryStringUpdate = "INSERT INTO `UsersPaymentmodes`( `balance`,`userId`,`paymentmodeId`) VALUES (:balance,:userId,:paymentmodeId)";

                sequelize.query(rawQueryStringUpdate,
                    { replacements: {balance:newBalance,userId:userId,paymentmodeId:paymentmodeId}, 
                    type: sequelize.QueryTypes.INSERT}
                    ).then(function(result) {
                        callback(true);
                });
            }
            
        });
}        



