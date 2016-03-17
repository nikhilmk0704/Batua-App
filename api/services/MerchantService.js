'use strict'

var MerchantRepository = require('../repositories/MerchantRepository.js');

class MerchantService {

    save(params, callback) {
        var merchantService = new MerchantService();
        if (merchantService.validateRequest && params.statusId == 2) { // true if all mandatory fields are supplied
            merchantService.createMerchant(params, callback);
        } else if (params.statusId == 1) {
            merchantService.createMerchant(params, callback);
        } else {
            callback("Error occured");
        }
    }

    find(params, callback) {
        var merchantRepository = new MerchantRepository();
        merchantRepository.find(params, callback);
    }

    findAll(params, callback) {
        var merchantRepository = new MerchantRepository();
        merchantRepository.findAll(params, callback);
    }

    updateStatus(params, options, findObject, callback) {
        var merchantRepository = new MerchantRepository();
        merchantRepository.updateAndFind(params, options, findObject, callback);
    }

    update(params, options, callback) {
        var merchantService = new MerchantService();
        if (merchantService.validateRequest && params.statusId != 1) { // true if all mandatory fields are supplied
            merchantService.updateMerchant(params, options, callback);
        } else if (params.statusId == 1) {
            merchantService.updateMerchant(params, options, callback);
        } else {
            callback("Error occured");
        }
    }

    delete(options, callback) {
        var merchantRepository = new MerchantRepository();
        merchantRepository.remove(options, callback);
    }

    validateRequest(params, callback) {
        var mandatoryFields = ['name', 'shortCode', 'phone', 'pincode', 'fees', 'cityId', 'categoryId', 'bankName', 'accountHolder', 'accountNumber', 'ifscCode'];
        _.every(mandatoryFields, function(element) {
            if (params[element]) return true;
            else return false;
        });
    }

    createMerchant(params, callback) {
        Merchants.create(params).then(function(merchantResult) {
            var merchantId = merchantResult.dataValues.id;
            var include = [{ model: Cities, required: false }, { model: Users, required: false }, { model: Statuses, required: false }, { model: Categories, required: false }, { model: Galleries, required: false }];
            var findObject = {};
            findObject.include = include;
            findObject.where = {};
            findObject.where.id = merchantId;
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
                        }).catch(function(exception) {
                            callback(exception);
                        });
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
        }).catch(function(exception) {
            callback(exception);
        });
    }

    updateMerchant(params, options, callback) {
        var merchantId = options.where.id;
        var include = [{ model: Cities, required: false }, { model: Users, required: false }, { model: Statuses, required: false }, { model: Categories, required: false }, { model: Galleries, required: false }];
        var findObject = {};
        findObject.include = include;
        findObject.where = {};
        findObject.where.id = merchantId;
        MerchantsGalleries.destroy({ where: { 'merchantId': merchantId } }).then(function(deletedRowCount) {
            Merchants.update(params, options).then(function(merchantResult) {
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
                            }).catch(function(exception) {
                                callback(exception);
                            });
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
            }).catch(function(exception) {
                callback(exception);
            });
        }).catch(function(exception) {
            callback(exception);
        });

    }
}

module.exports = MerchantService;
