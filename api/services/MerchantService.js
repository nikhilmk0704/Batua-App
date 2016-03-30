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
    find(req, callback) {
        var merchantService = new MerchantService();
        var id = req.param('id');
        var userId = req.param('userId');
        var salesAgentId = req.param('salesAgentId');
        var adminId = req.param('adminId');
        var params = {};
        params.include = merchantService.getIncludeModels();
        params.where = {};
        merchantService.getUserGroup(params,id,userId,salesAgentId,adminId,callback);
    }

    // updates the partialy saved merchant i.e status is drafted
    // updates the fully saved merchant i.e status is not drafted
    update(req, callback) {
        var merchantService = new MerchantService();
        var params = {};
        params = req.body;
        var options = {};
        options.where = {};
        options.where.id = req.body.id;
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
    setStatus(req, callback) {
        var params = {};
        var options = {};
        params.status = req.body.status;
        options.where = {};
        options.where.id = req.body.id;
        var merchantRepository = new MerchantRepository();
        merchantRepository.updateAndFind(params, options, options, callback);
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
            var merchantId = merchantResult.dataValues.id;
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
        Merchants.find({where:{id:merchantId}}).then(function(data){
            (data.dataValues.shortCode==params.shortCode)?(delete params.shortCode):(params);
            (data.dataValues.phone==params.phone)?(delete params.phone):(params);
            MerchantsGalleries.destroy({ where: { 'merchantId': merchantId } })
            .then(function(deletedRowCount) {
                Merchants.update(params, options).then(function(merchantResult) {
                    merchantService.createGalleryAndFindMerchant(params, merchantId, findObject, callback);
                    return null;
                }).catch(function(exception) {
                    callback(exception);
                });
                return null;
            }).catch(function(exception) {
                callback(exception);
            });
            return null;
        }).catch(function(exception){
            callback(exception);
        });
    }

    // creates image gallery and shows merchant result
    createGalleryAndFindMerchant(params, merchantId, findObject, callback) {
        var count = 0;
        if (params.imageGallery.length) {
            params.imageGallery.forEach(function(imageUrl) {
                Galleries.create({ 'url': imageUrl }).then(function(galleryResult) {
                    var galleryId = galleryResult.dataValues.id;
                    MerchantsGalleries.create({ 'merchantId': merchantId, 'galleryId': galleryId })
                    .then(function(result) {
                        count++;
                        if (params.imageGallery.length == count) {
                            Merchants.find(findObject).then(function(data) {
                                callback(null, data);
                            }).catch(function(exception) {
                                callback(exception);
                            });
                        }
                        return null;
                    }).catch(function(exception) {
                        callback(exception);
                    });
                    return null;
                }).catch(function(exception) {
                    callback(exception);
                });
            });
        } else {
            Merchants.find(findObject).then(function(result) {
                callback(null, result);
            }).catch(function(exception) {
                callback(exception);
            });
        }
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
            var groupName=(data.dataValues.UserGroup.dataValues.name);
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
