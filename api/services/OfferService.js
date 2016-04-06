'use strict';

var OffersRepository = require('../repositories/OffersRepository.js');

var MerchantsOffersRepository = require('../repositories/MerchantsOffersRepository.js');

class PromocodesService {

    save(params, callback) {

        var offersRepository = new OffersRepository();
        
        offersRepository.save(params, function(err,result){
            if (err)
                return callback(err,null);
            /*---save offer for each merchants---*/
            var bulkSaveParams = {};    
            bulkSaveParams.baseId = result.id;
            bulkSaveParams.associateIds = params.merchantId;
            
            return addOffersToMerchants(bulkSaveParams, function(err, merchantSaveResult) {
                if (err) {
                    return callback(err,null);
                }
                return callback(null, result);
            });
            /*---/save offer for each merchants---*/
        });
    }

    updateAndFind(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var findObject=options;
        var offersRepository = new OffersRepository();
        offersRepository.updateAndFind(params, options, findObject, function(err,result){
            if (err) {
                return callback(err,null);
            }
            /*---save offer for each merchants---*/
            
            return deleteMerchantOffer(params,function(err,merchantDeleteResult){
               if (err) {
                return callback(err,null);
            }
            var bulkSaveParams = {};    
            bulkSaveParams.baseId = params.id;
            bulkSaveParams.associateIds = params.merchantId;
            
            return addOffersToMerchants(bulkSaveParams, function(err, merchantSaveResult) {
                if (err) {
                    return callback(err,null);
                }
                return callback(null, result);
            });

        })
            /*---/save offer for each merchants---*/    
        });
    }
    statusUpdateAndFind(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var findObject=options;
        var offersRepository = new OffersRepository();
        offersRepository.updateAndFind(params, options, findObject, function(err,result){
            if (err) {
                return callback(err,null);
            }
            return callback(null, result);
        });
    }
    

    find(params, callback) {
        var offersRepository = new OffersRepository();
        offersRepository.find(params, callback);
    }

    findAll(params, callback) {
     var offersRepository = new OffersRepository();
     offersRepository.findAll(params, callback);
 }

}

module.exports = PromocodesService;

function addOffersToMerchants(params, callback) {

   var bulkSaveParams = {};
   bulkSaveParams.baseId = params.baseId;
   bulkSaveParams.associateIds = params.associateIds;
   bulkSaveParams.baseAttribute = 'offerId';
   bulkSaveParams.associateAttribute = 'merchantId';

   var merchantsOffersRepository = new MerchantsOffersRepository();
   merchantsOffersRepository.bulkSave(bulkSaveParams, function(err,result){
    if(err){

       return callback(err,null); 
   }
   return callback(null,result); 
});

}

function deleteMerchantOffer(params,callback){
    var options = {};
    options.where = {};
    options.where.offerId = params.id;
    var merchantsOffersRepository = new MerchantsOffersRepository();
    merchantsOffersRepository.remove(options, function(err,result){
        if(err){

           return callback(err,null); 
       }
       return callback(null,result); 
   });

}
