'use strict';

var PromocodesRepository = require('../repositories/PromocodesRepository.js');

var MerchantsPromocodeRepository = require('../repositories/MerchantsPromocodeRepository.js');

class PromocodesService {

    save(params, callback) {

        var promocodesRepository = new PromocodesRepository();
        
        promocodesRepository.save(params, function(err,result){
            if (err)
                return callback(err);

            /*---save promocode for each merchants---*/
            var bulkSaveParams = {};
            
            bulkSaveParams.baseId = result.id;
            bulkSaveParams.associateIds = params.merchantId;
            
            return addPromoCodeToMerchants(bulkSaveParams, function(err, result) {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            });

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
console.log(bulkSaveParams);
   var merchantsPromocodeRepository = new MerchantsPromocodeRepository();
   merchantsPromocodeRepository.bulkSave(bulkSaveParams, function(err,result){

    if(err){
        callback(err);
    }
    callback(result);

   });

   /*merchantsPromocodeService.bulkSave(bulkSaveParams, function(err, result) {
    if (err) {
        promocodesService.delete({ where: { 'id': promocodeResult.id } }, function(err, result) {
            if (err) return res.badRequest(err);
            return res.json(400, { message: "Please provide correct merchantIds" });
        });
    } else {
        return res.json(201, { result: promocodeResult });
    }*/
/*});*/

}
