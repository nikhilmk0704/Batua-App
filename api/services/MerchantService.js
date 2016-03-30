'use strict'

var MerchantRepository = require('../repositories/MerchantRepository.js');
var UserRepository = require('../repositories/UserRepository.js');

class MerchantService {

    // if status is drafted, creates merchant without checking mandatory fields
    // if status is pending, creates merchant and checks for mandatory fields
    save(params, callback) {
        var merchantService = new MerchantService();
        if (merchantService.validateRequest(params) && params.status == "Pending for approval") {
            return merchantService.createMerchant(params, callback);
        } 
        if (params.status == "Drafted") {
            return merchantService.createMerchant(params, callback);
        } 
        return callback("Mandatory fields missing");
    }

    // shows only active merchants for user app
    // shows all merchants for admin portal
    // shows only those merchants created by particular sales agent
    find(params, callback) {
        var merchantService = new MerchantService();
        var id=params.id;
        var userId=params.userId;
        var salesAgentId=params.salesAgentId;
        var adminId=params.adminId;
        var newParams = {};
        newParams.include = merchantService.getIncludeModels();
        newParams.where = {};
        merchantService.getUserGroup(newParams,id,userId,salesAgentId,adminId,callback);
    }

    // updates the partialy saved merchant i.e status is drafted
    // updates the fully saved merchant i.e status is not drafted
    update(params, callback) {
        var merchantService = new MerchantService();
        var options = {};
        options.where = {};
        options.where.id = params.id;
        if (merchantService.validateRequest(params) && params.status != "Drafted") { // true if all mandatory fields are supplied
            return merchantService.updateMerchant(params, options, callback);
        } 
        if (params.status == "Drafted") {
            return merchantService.updateMerchant(params, options, callback);
        } 
        return callback("Mandatory fields missing");
    }

    // delete the merchant based on shortcode (unique field)
    delete(params) {
        var options = {};
        options.where = {};
        options.where.shortCode = params.shortCode;
        Merchants.destroy(options);
    }

    // update status of merchant
    setStatus(params, callback) {
        var newParams = {};
        var options = {};
        var findObject={};
        newParams.status = params.status;
        options.where = {};
        options.where.id = params.id;
        findObject=options;
        var merchantRepository = new MerchantRepository();
        merchantRepository.updateAndFind(newParams, options, findObject, callback);
    }

    // validates for mandatory fields
    validateRequest(params) {
        var merchantService = new MerchantService();
        return _.every(merchantService.getMandatoryFields(), function(element) {
            if (params[element]) {
                return true;
            } 
        });
    }

    // creates merchant and its image gallery and display results 
    createMerchant(params, callback) {
        var merchantService = new MerchantService();
        Merchants.create(params).then(function(merchantResult) {
            var merchantId = merchantResult.id;
            var findObject = {};
            findObject.include = merchantService.getIncludeModels();
            findObject.where = {};
            findObject.where.id = merchantId;
            merchantService.createGalleryAndFindMerchant(params, merchantId, findObject, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
    }

    // updates merchant and its image gallery and display results
    updateMerchant(params, options, callback) {
        var merchantService = new MerchantService();
        var merchantId = options.where.id;
        var findObject = {};
        findObject.include = merchantService.getIncludeModels();
        findObject.where = {};
        findObject.where.id = merchantId;
        merchantService.findMerchants(params,merchantId,options,findObject,callback);
        return null;
    }

    findMerchants(params,merchantId,options,findObject,callback){
        var merchantService = new MerchantService();
        Merchants.find({where:{id:merchantId}}).then(function(result){
            (result.shortCode==params.shortCode)?(delete params.shortCode):(params);
            (result.phone==params.phone)?(delete params.phone):(params);
            merchantService.destroyMerchantsGalleries(params,merchantId,options,findObject,callback);
            return null;
        }).catch(function(exception){
            return callback(exception);
        })
    }

    destroyMerchantsGalleries(params,merchantId,options,findObject,callback){
        var merchantService = new MerchantService();
        MerchantsGalleries.destroy({ where: { 'merchantId': merchantId } }).then(function(result){
            merchantService.updateMerchantAndCreateGalleryAndFindMerchant(params,merchantId,options,findObject,callback);
            return null;
        }).catch(function(exception){
            return callback(exception);
        });
    }

    updateMerchantAndCreateGalleryAndFindMerchant(params,merchantId,options,findObject,callback){
        var merchantService = new MerchantService();
        Merchants.update(params,options).then(function(result){
            merchantService.createGalleryAndFindMerchant(params,merchantId,findObject,callback);
            return null;
        }).catch(function(exception){
            return callback(exception);
        });
    }

    // creates image gallery and shows merchant result
    createGalleryAndFindMerchant(params, merchantId, findObject, callback) {
        var merchantService = new MerchantService();
        var count = 0;
        var imageGalleryArrayLength=params.imageGallery.length;
        if (imageGalleryArrayLength) {
            params.imageGallery.forEach(function(imageUrl) {
                count++;
                merchantService.createGalleries(imageUrl,merchantId,findObject,imageGalleryArrayLength,count,callback);
            });
        } else {
            merchantService.getMerchantById(findObject,callback);
        }
    }

    createGalleries(imageUrl,merchantId,findObject,imageGalleryArrayLength,count,callback){
        var merchantService = new MerchantService();
        Galleries.create({'url':imageUrl}).then(function(result){
            var galleryId=result.id;
            merchantService.createMerchantsGalleries(merchantId,galleryId,findObject,imageGalleryArrayLength,count,callback);
            return null
        }).catch(function(exception){
            return callback(exception);
        });
    }

    createMerchantsGalleries(merchantId,galleryId,findObject,imageGalleryArrayLength,count,callback){
        var merchantService = new MerchantService();
        MerchantsGalleries.create({'merchantId':merchantId,'galleryId':galleryId}).then(function(result){
            if(imageGalleryArrayLength==count){
                merchantService.getMerchantById(findObject,callback);
            }
            return null;
        }).catch(function(exception){
            return callback(exception);
        });
    }

    getMerchantById(findObject,callback){
        Merchants.find(findObject).then(function(result){
            return callback(null,result);
        }).catch(function(exception){
            return callback(exception);
        });
    }

    // returns models to be included while getting merchant
    getIncludeModels() {
        return [{                       // return [{all:true}] include all models
            model: Cities,
            required: false
        }, {
            model: Users,
            required: false
        }, {
            model: Galleries,
            required: false
        }, {
            model: Categories,
            required: false
        }];
    }

    // returns array of mandatory fields
    getMandatoryFields() {
        return [
            'name', 'shortCode', 'phone', 'pincode',
            'fees', 'cityId', 'categoryId', 'bankName',
            'accountHolder', 'accountNumber', 'ifscCode', 'status'
        ];
    }

    // get merchant lists for user,admin,salesAgent,super admin
    getUserGroup(params,id,userId,salesAgentId,adminId,callback) {
        var groupId=(userId|salesAgentId|adminId);
        Users.find({ include: [{ model: UserGroups, required: false }], where: { id: groupId } })
        .then(function(data) {
            var groupName=(data.UserGroup.name);
            var merchantRepository = new MerchantRepository();
            if (id) {
                params.where.id = id;
                return merchantRepository.find(params, callback);
            } 
            if (userId && !id && groupName == 'User') {
                params.where.status = 'Active';
                return merchantRepository.findAll(params, callback);
            } 
            if (salesAgentId && !id && groupName == 'Field Sales Agent') {
                params.where.createdSalesId = salesAgentId;
                return merchantRepository.findAll(params, callback);
            } 
            if (adminId && !id && (groupName == 'Admin'|| groupName=='Super Admin')) {
                return merchantRepository.findAll(params, callback);
            } 
            return callback("Please provide correct id");
        });
    }

}

module.exports = MerchantService;
