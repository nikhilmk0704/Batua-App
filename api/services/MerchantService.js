'use strict'

var MerchantRepository = require('../repositories/MerchantRepository.js');
var UserRepository = require('../repositories/UserRepository.js');

class MerchantService {

    save(params, callback) {
        var merchantService = new MerchantService();
        if (merchantService.validateRequest(params) && params.status == "Pending for approval") { // true if all mandatory fields are supplied
            return merchantService.createMerchant(params, callback);
        } 
        if (params.status == "Drafted") {
            return merchantService.createMerchant(params, callback);
        } 
        return callback("Error occured");
    }

    find(req, callback) {
        var merchantService = new MerchantService();
        var id = req.param('id');
        var userId = req.param('userId');
        var salesAgentId = req.param('salesAgentId');
        var adminId = req.param('adminId');
        var params = {};
        params.include = merchantService.getIncludeModels();
        params.where = {};
        var merchantRepository = new MerchantRepository();
        if (id) {
            params.where.id = id;
            return merchantRepository.find(params, callback);
        } 
        if (userId && !id && merchantService.getUserGroup(userId) == 'User') {
            params.where.status = 'Active';
            return merchantRepository.findAll(params, callback);
        } 
        if (salesAgentId && !id && merchantService.getUserGroup(salesAgentId) == 'Field Sales Agent') {
            params.where.createdSalesId = salesAgentId;
            return merchantRepository.findAll(params, callback);
        } 
        if (adminId && !id && (merchantService.getUserGroup(adminId) == 'Admin' | 'Super Admin')) {
            return merchantRepository.findAll(params, callback);
        } 
        return callback("Please provide correct id");
    }

    update(req, callback) {
        var merchantService = new MerchantService();
        var params = {};
        params = req.body;
        var options = {};
        options.where = {};
        options.where.id = req.body.id;
        if (merchantService.validateRequest(params) && params.statusId != "Drafted") { // true if all mandatory fields are supplied
            return merchantService.updateMerchant(params, options, callback);
        } 
        if (params.statusId == "Drafted") {
            return merchantService.updateMerchant(params, options, callback);
        } 
        return callback("Error occured");
    }

    delete(params) {
        var options = {};
        options.where = {};
        options.where.shortCode = params.shortCode;
        Merchants.destroy(options);
    }

    setStatus(req, callback) {
        var params = {};
        var options = {};
        params.status = req.body.status;
        options.where = {};
        options.where.id = req.body.id;
        var merchantRepository = new MerchantRepository();
        merchantRepository.update(params, options, callback);
    }

    validateRequest(params) {
        var merchantService = new MerchantService();
        _.every(merchantService.getMandatoryFields(), function(element) {
            if (params[element]) {
                return true;
            } 
            return false;
        });
    }

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

    updateMerchant(params, options, callback) {
        var merchantService = new MerchantService();
        var merchantId = options.where.id;
        var findObject = {};
        findObject.include = merchantService.getIncludeModels();
        findObject.where = {};
        findObject.where.id = merchantId;
        MerchantsGalleries.destroy({ where: { 'merchantId': merchantId } }).then(function(deletedRowCount) {
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
    }

    createGalleryAndFindMerchant(params, merchantId, findObject, callback) {
        var count = 0;
        if (params.imageGallery.length) {
            params.imageGallery.forEach(function(imageUrl) {
                Galleries.create({ 'url': imageUrl }).then(function(galleryResult) {
                    var galleryId = galleryResult.dataValues.id;
                    MerchantsGalleries.create({ 'merchantId': merchantId, 'galleryId': galleryId }).then(function(result) {
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

    getIncludeModels() {
        return [{
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

    getMandatoryFields() {
        return [
            'name', 'shortCode', 'phone', 'pincode',
            'fees', 'cityId', 'categoryId', 'bankName',
            'accountHolder', 'accountNumber', 'ifscCode', 'status'
        ];
    }

    getUserGroup(userId) {
        var userRepository = new UserRepository();
        userRepository.find({ include: [{ model: UserGroups, required: false }], where: { id: userId } }, function(err, data) {
            return data.dataValues.UserGroups.dataValues.name;
        });
    }

}

module.exports = MerchantService;
