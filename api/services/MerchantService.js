'use strict'

var MerchantRepository = require('../repositories/MerchantRepository.js');
var UserRepository = require('../repositories/UserRepository.js');

class MerchantService {

    // if status is drafted, creates merchant without checking mandatory fields
    // if status is pending, creates merchant and checks for mandatory fields
    save(params, callback) {
        var merchantService = new MerchantService();
        if (merchantService.validatePartialRequest(params) && params.status == "Drafted") {
            return merchantService.validateLocationAndCreateMerchant(params, callback);
        } 
        if (merchantService.validateAllRequest(params) && params.status == "Pending for approval") {
            return merchantService.validateLocationAndCreateMerchant(params, callback);
        } 
        return callback(merchantService.generateErrorMessage("Mandatory fields missing"));
    }

    validateLocationAndCreateMerchant(params,callback){
        var merchantService = new MerchantService();
        if(params.area || params.pincode || params.cityId){
            var locationParams={};
            (params.area)?(locationParams.area=params.area):(locationParams);
            (params.pincode)?(locationParams.pincode=params.pincode):(locationParams);
            (params.cityId)?(locationParams.cityId=params.cityId):(locationParams);
            Locations.create(locationParams).then(function(result){
                params.locationId=result.id;
                merchantService.createMerchant(params,callback);
                return null;
            }).catch(function(exception){
                callback(exception);
            });
        }else{
            merchantService.createMerchant(params, callback);  
        }
    }

    validatePartialRequest(params){
        var merchantService = new MerchantService();
        return _.every(merchantService.getPartialMandatoryFields(), function(element) {
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
            var type="create";
            merchantService.createGalleryAndFindMerchant(params, merchantId, findObject, type, callback);
            return null;
        }).catch(function(exception) {
            callback(exception);
        });
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
        if (merchantService.validateAllRequest(params) && params.status != "Drafted") { // true if all mandatory fields are supplied
            return merchantService.updateMerchant(params, options, callback);
        } 
        if (merchantService.validatePartialRequest(params) && params.status == "Drafted") {
            return merchantService.updateMerchant(params, options, callback);
        } 
        return callback(merchantService.generateErrorMessage("Mandatory fields missing"));
    }

    // delete the merchant based on shortcode (unique field)
    delete(params) {
        var options = {};
        options.where = {};
        options.where.id = params.id;
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
    validateAllRequest(params) {
        var merchantService = new MerchantService();
        return _.every(merchantService.getAllMandatoryFields(), function(element) {
            if (params[element]) {
                return true;
            } 
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
            if(result && result.locationId){
                merchantService.updateLocations(params,result,merchantId,options,findObject,callback);
            }else{
                merchantService.createLocations(params,result,merchantId,options,findObject,callback);
            }
            return null;
        }).catch(function(exception){
            return callback(exception);
        })
    }

    createLocations(params,result,merchantId,options,findObject,callback){
        var merchantService = new MerchantService();
        Locations.create(params).then(function(result){
            params.locationId=result.id;
            merchantService.updateMerchantAndGalleries(params,result,merchantId,options,findObject,callback);
            return null;
        }).catch(function(exception){
            return callback(exception);
        });
    }

    updateLocations(params,result,merchantId,options,findObject,callback){
        var merchantService = new MerchantService();
        Locations.update(params,{where:{id:result.locationId}}).then(function(result){
            merchantService.updateMerchantAndGalleries(params,result,merchantId,options,findObject,callback);
            return null;
        }).catch(function(exception){
            return callback(exception);
        });
    }

    updateMerchantAndGalleries(params,result,merchantId,options,findObject,callback){
        var merchantService = new MerchantService();
        (result.shortCode==params.shortCode)?(delete params.shortCode):(params);
        (result.phone==params.phone)?(delete params.phone):(params);
        merchantService.destroyMerchantsGalleries(params,merchantId,options,findObject,callback);
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
            var type="update";
            merchantService.createGalleryAndFindMerchant(params,merchantId,findObject,type, callback);
            return null;
        }).catch(function(exception){
            return callback(exception);
        });
    }

    // creates image gallery and shows merchant result
    createGalleryAndFindMerchant(params, merchantId, findObject, type, callback) {
        var merchantService = new MerchantService();
        var count = 0;
        var imageGalleryArrayLength=(params.imageGallery)?(params.imageGallery.length):null;
        if (imageGalleryArrayLength) {
            params.imageGallery.forEach(function(imageUrl) {
                count++;
                merchantService.createGalleries(imageUrl,merchantId,findObject,imageGalleryArrayLength,count,type,callback);
            });
        } else {
            merchantService.getMerchantById(findObject,callback);
        }
    }

    createGalleries(imageUrl,merchantId,findObject,imageGalleryArrayLength,count,type,callback){
        var merchantService = new MerchantService();
        Galleries.create({'url':imageUrl}).then(function(result){
            var galleryId=result.id;
            merchantService.createMerchantsGalleries(merchantId,galleryId,findObject,imageGalleryArrayLength,count,type,callback);
            return null
        }).catch(function(exception){
            if(type==="create")
                merchantService.delete({id:merchantId});
            return callback(exception);
        });
    }

    createMerchantsGalleries(merchantId,galleryId,findObject,imageGalleryArrayLength,count,type,callback){
        var merchantService = new MerchantService();
        MerchantsGalleries.create({'merchantId':merchantId,'galleryId':galleryId}).then(function(result){
            if(imageGalleryArrayLength==count){
                merchantService.getMerchantById(findObject,callback);
            }
            return null;
        }).catch(function(exception){
            if(type==="create")
                merchantService.delete({id:merchantId});
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
        return [{
            model: Users,
            attributes:['id','name','phone','email'],
            required: false
        }, {
            model: Galleries,
            required: false
        }, {
            model: Categories,
            required: false
        }, {
            model: Locations,
            include:[{model:Cities,required:false}],
            required: false
        }];
    }

    // returns array of all mandatory fields
    getAllMandatoryFields() {
        return [
            'name', 'shortCode', 'phone', 'pincode','profileImageUrl',
            'fees', 'cityId', 'categoryId', 'bankName','createdSalesId',
            'accountHolder', 'accountNumber', 'ifscCode', 'status'
        ];
    }

    getPartialMandatoryFields(){
        return [
            'name','shortCode','phone','fees','categoryId','status','createdSalesId'
        ];
    }

    // get merchant lists for user,admin,salesAgent,super admin
    getUserGroup(params,id,userId,salesAgentId,adminId,callback) {
        var groupId=(userId|salesAgentId|adminId);
        Users.find({ include: [{ model: UserGroups, required: false }], where: { id: groupId } })
        .then(function(data) {
            var groupName=(data && data.UserGroup.name);
            var merchantRepository = new MerchantRepository();
            if (data && id) {
                params.where.id = id;
                return merchantRepository.find(params, callback);
            } 
            if (data && userId && !id && groupName == 'User') {
                params.where.status = 'Active';
                return merchantRepository.findAll(params, callback);
            } 
            if (data && salesAgentId && !id && groupName == 'Field Sales Agent') {
                params.where.createdSalesId = salesAgentId;
                return merchantRepository.findAll(params, callback);
            } 
            if (data && adminId && !id && (groupName == 'Admin'|| groupName=='Super Admin')) {
                return merchantRepository.findAll(params, callback);
            } 
            return callback(merchantService.generateErrorMessage("Please provide correct id"));
        });
    }

    generateErrorMessage(messageOrObject){
        var messageObject={};
        if(typeof messageOrObject == "string")
            messageObject.message=messageOrObject;
        else if(typeof messageOrObject == "object" && messageOrObject.errors)
            messageObject.message=messageOrObject.errors[0].message;
        else if(typeof messageOrObject=="object" && messageOrObject.message)
            messageObject.message=(messageOrObject.message).split(":")[1];
        var array=[];
        array.push(messageObject);
        var errorObject={};
        errorObject.errors=array;
        return errorObject;
    }

}

module.exports = MerchantService;
