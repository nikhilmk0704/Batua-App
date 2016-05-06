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
    statusUpdateAndFind(params, callback) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var findObject=options;
        var promocodesRepository = new PromocodesRepository();
        promocodesRepository.updateAndFind(params, options, findObject, function(err,result){
            if (err) {
                return callback(err,null);
            }
            return callback(null, result);
        });
    }

    validateUserAndPromo(params,callback){
        if (!params.merchantId){
            return callback("Merchant ID deos not exist");
        }
        if (!params.promocode){
            return callback("Promocode missing");
        }

        var rawQueryString = "SELECT `id`, `promocode`, `discountPercentage`, `description`, `maximumAmountLimit`, `validFrom`," + 
        "`validTo`, `percentageCostBourneByBatua`, `percentageCostBourneByMerchant`, `status`, `createdAt`, `updatedAt`" +
        " FROM `Promocodes` WHERE 1 AND `promocode` = :promocode AND `status` = :status AND NOW() between validFrom and validTo"+ 
        " AND id in (SELECT promocodeId from MerchantsPromocodes where merchantId = :merchantId)";
        sequelize.query(rawQueryString,
            { replacements: { status: 'Active', merchantId:params.merchantId,promocode:params.promocode}, 
            type: sequelize.QueryTypes.SELECT }
            ).then(function(result) {
                if(result){
                    return callback(null,result);
                }
            })
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
