'use strict';

var PromocodesRepository = require('../repositories/PromocodesRepository.js');

var MerchantsPromocodeRepository = require('../repositories/MerchantsPromocodeRepository.js');

class PromocodesService {

    save(params, callback) {

        var promocodesRepository = new PromocodesRepository();
        
        promocodesRepository.save(params, function(err,result){
            if (err)
                return callback(err,null);
            /*---save promocode for each merchants---*/
            var bulkSaveParams = {};    
            bulkSaveParams.baseId = result.id;
            bulkSaveParams.associateIds = params.merchantId;
            
            return addPromoCodeToMerchants(bulkSaveParams, function(err, merchantSaveResult) {
                if (err) {
                    return callback(err,null);
                }
                return callback(null, result);
            });
            /*---/save promocode for each merchants---*/
        });
    }

    updateAndFind(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var findObject=options;
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.updateAndFind(params, options, findObject, function(err,result){
            if (err) {
                return callback(err,null);
            }
            /*---save promocode for each merchants---*/
            return deleteMerchantPromoCode(params,function(err,merchantDeleteResult){
               if (err) {
                return callback(err,null);
            }
            var bulkSaveParams = {};    
            bulkSaveParams.baseId = params.id;
            bulkSaveParams.associateIds = params.merchantId;
            
            return addPromoCodeToMerchants(bulkSaveParams, function(err, merchantSaveResult) {
                if (err) {
                    return callback(err,null);
                }
                return callback(null, result);
            });

        })
            
            /*---/save promocode for each merchants---*/    
        });
    }

    bulkSave(params, callback) {
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.bulkSave(params, callback);
    }

    find(params, callback) {
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.find(params, callback);
    }

    findAll(params, callback) {
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.findAll(params, callback);
    }

    update(params, options, callback) {

        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.update(params, options, callback);

    }

    delete(options, callback) {
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.remove(options, callback);
    }

}

module.exports = PromocodesService;

function addPromoCodeToMerchants(params, callback) {

   var bulkSaveParams = {};
   bulkSaveParams.baseId = params.baseId;
   bulkSaveParams.associateIds = params.associateIds;
   bulkSaveParams.baseAttribute = 'promocodeId';
   bulkSaveParams.associateAttribute = 'merchantId';

   var merchantsPromocodeRepository = new MerchantsPromocodeRepository();
   merchantsPromocodeRepository.bulkSave(bulkSaveParams, function(err,result){
    if(err){

       return callback(err,null); 
   }
   return callback(null,result); 
});

}

function deleteMerchantPromoCode(params,callback){
    var options = {};
    options.where = {};
    options.where.promocodeId = params.id;
    var merchantsPromocodeRepository = new MerchantsPromocodeRepository();
    merchantsPromocodeRepository.remove(options, function(err,result){
        if(err){

           return callback(err,null); 
       }
       return callback(null,result); 
   });

}
