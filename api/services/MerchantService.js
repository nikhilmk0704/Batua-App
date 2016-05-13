'use strict'

var MerchantRepository = require('../repositories/MerchantRepository.js');
var UserRepository = require('../repositories/UserRepository.js');
var _ = require('lodash');

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
        return callback("Mandatory fields missing");
    }

    validateLocationAndCreateMerchant(params, callback) {
        var merchantService = new MerchantService();
        if (params.area || params.pincode || params.cityId) {
            var locationParams = {};
            (params.area) ? (locationParams.area = params.area) : (locationParams);
            (params.pincode) ? (locationParams.pincode = params.pincode) : (locationParams);
            (params.cityId) ? (locationParams.cityId = params.cityId) : (locationParams);
            Locations.create(locationParams).then(function(result) {
                params.locationId = result.id;
                merchantService.createMerchant(params, callback);
                return null;
            }).catch(function(exception) {
                callback(exception);
            });
        } else {
            merchantService.createMerchant(params, callback);
        }
    }

    validatePartialRequest(params) {
        var merchantService = new MerchantService();
        return _.every(merchantService.getPartialMandatoryFields(), function(element) {
            if (params[element] || params[element] == 0 || params[element] == null) {
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
            var type = "create";
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
        var id = (params.id) ? (+params.id) : (null);
        var userId = params.userId;
        var salesAgentId = params.salesAgentId;
        var adminId = params.adminId;
        var locationObject = {};
        locationObject.latitude = params.latitude;
        locationObject.longitude = params.longitude;
        var newParams = {};
        newParams.include = merchantService.getIncludeModels();
        newParams.where = {};
        merchantService.getUserGroup(newParams, id, userId, salesAgentId, adminId, locationObject, callback);
    }

    // updates the partialy saved merchant i.e status is drafted
    // updates the fully saved merchant i.e status is not drafted
    update(params, callback) {
        var merchantService = new MerchantService();
        var options = {};
        options.where = {};
        options.where.id = params.id;
        var status = params.status;
        if (merchantService.validateAllRequest(params) && status != "Drafted") { // true if all mandatory fields are supplied
            return merchantService.updateMerchant(params, options, callback);
        }
        if (merchantService.validatePartialRequest(params) && status == "Drafted") {
            return merchantService.updateMerchant(params, options, callback);
        }
        return callback("Mandatory fields missing");
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
        var findObject = {};
        newParams.status = params.status;
        options.where = {};
        options.where.id = params.id;
        findObject = options;
        var merchantRepository = new MerchantRepository();
        merchantRepository.updateAndFind(newParams, options, findObject, callback);
    }

    // validates for mandatory fields
    validateAllRequest(params) {
        var merchantService = new MerchantService();
        return _.every(merchantService.getAllMandatoryFields(), function(element) {
            if (params[element] || params[element] == 0 || params[element] == null) {
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
        merchantService.findMerchants(params, merchantId, options, findObject, callback);
        return null;
    }

    findMerchants(params, merchantId, options, findObject, callback) {
        var merchantService = new MerchantService();
        var merchantParams = {};
        merchantParams.where = {};
        merchantParams.where.id = merchantId;
        Merchants.find(merchantParams).then(function(result) {
            if (result && result.locationId) {
                merchantService.updateLocations(params, result, merchantId, options, findObject, callback);
            } else {
                merchantService.createLocations(params, result, merchantId, options, findObject, callback);
            }
            return null;
        }).catch(function(exception) {
            return callback(exception);
        })
    }

    createLocations(params, result, merchantId, options, findObject, callback) {
        var merchantService = new MerchantService();
        var createObject = {};
        var area = params.area;
        var pincode = params.pincode;
        var cityId = params.cityId;
        (area) ? (createObject.area = area) : (createObject);
        (pincode) ? (createObject.pincode = pincode) : (createObject);
        (cityId) ? (createObject.cityId = cityId) : (createObject);
        Locations.create(createObject).then(function(result) {
            params.locationId = result.id;
            merchantService.updateMerchantAndGalleries(params, result, merchantId, options, findObject, callback);
            return null;
        }).catch(function(exception) {
            return callback(exception);
        });
    }

    updateLocations(params, result, merchantId, options, findObject, callback) {
        var merchantService = new MerchantService();
        var whereObject = {};
        var updateObject = {};
        var area = params.area;
        var pincode = params.pincode;
        var cityId = params.cityId;
        (area) ? (updateObject.area = area) : (updateObject);
        (pincode) ? (updateObject.pincode = pincode) : (updateObject);
        (cityId) ? (updateObject.cityId = cityId) : (updateObject);
        whereObject.where = {};
        whereObject.where.id = result.locationId;
        Locations.update(updateObject, whereObject).then(function(result) {
            merchantService.updateMerchantAndGalleries(params, result, merchantId, options, findObject, callback);
            return null;
        }).catch(function(exception) {
            return callback(exception);
        });
    }

    updateMerchantAndGalleries(params, result, merchantId, options, findObject, callback) {
        var merchantService = new MerchantService();
        (result.shortCode == params.shortCode) ? (delete params.shortCode) : (params);
        (result.phone == params.phone) ? (delete params.phone) : (params);
        merchantService.destroyMerchantsGalleries(params, merchantId, options, findObject, callback);
    }

    destroyMerchantsGalleries(params, merchantId, options, findObject, callback) {
        var merchantService = new MerchantService();
        var merchantsGalleriesParams = {};
        merchantsGalleriesParams.where = {};
        merchantsGalleriesParams.where.merchantId = merchantId;
        MerchantsGalleries.destroy(merchantsGalleriesParams).then(function(result) {
            merchantService.updateMerchantAndCreateGalleryAndFindMerchant(params, merchantId, options, findObject, callback);
            return null;
        }).catch(function(exception) {
            return callback(exception);
        });
    }

    updateMerchantAndCreateGalleryAndFindMerchant(params, merchantId, options, findObject, callback) {
        var merchantService = new MerchantService();
        Merchants.update(params, options).then(function(result) {
            var type = "update";
            merchantService.createGalleryAndFindMerchant(params, merchantId, findObject, type, callback);
            return null;
        }).catch(function(exception) {
            return callback(exception);
        });
    }

    // creates image gallery and shows merchant result
    createGalleryAndFindMerchant(params, merchantId, findObject, type, callback) {
        var merchantService = new MerchantService();
        var count = 0;
        var imageGalleryArrayLength = (params.imageGallery) ? (params.imageGallery.length) : null;
        if (imageGalleryArrayLength) {
            params.imageGallery.forEach(function(imageUrl) {
                count++;
                merchantService.createGalleries(imageUrl, merchantId, findObject, imageGalleryArrayLength, count, type, callback);
            });
        } else {
            merchantService.getMerchantById(findObject, callback);
        }
    }

    createGalleries(imageUrl, merchantId, findObject, imageGalleryArrayLength, count, type, callback) {
        var merchantService = new MerchantService();
        var galleryParams = {};
        galleryParams.url = imageUrl;
        Galleries.create(galleryParams).then(function(result) {
            var galleryId = result.id;
            merchantService.createMerchantsGalleries(merchantId, galleryId, findObject, imageGalleryArrayLength, count, type, callback);
            return null
        }).catch(function(exception) {
            if (type === "create")
                merchantService.delete({ id: merchantId });
            return callback(exception);
        });
    }

    createMerchantsGalleries(merchantId, galleryId, findObject, imageGalleryArrayLength, count, type, callback) {
        var merchantService = new MerchantService();
        var merchantsGalleriesParams = {};
        merchantsGalleriesParams.merchantId = merchantId;
        merchantsGalleriesParams.galleryId = galleryId;
        MerchantsGalleries.create(merchantsGalleriesParams).then(function(result) {
            if (imageGalleryArrayLength == count) {
                merchantService.getMerchantById(findObject, callback);
            }
            return null;
        }).catch(function(exception) {
            if (type === "create")
                merchantService.delete({ id: merchantId });
            return callback(exception);
        });
    }

    getMerchantById(findObject, callback) {
        Merchants.find(findObject).then(function(result) {
            return callback(null, result);
        }).catch(function(exception) {
            return callback(exception);
        });
    }

    // returns models to be included while getting merchant
    getIncludeModels() {
        return [{
            model: Users,
            as: 'users',
            attributes: ['id', 'name', 'phone', 'email'],
            required: false
        }, {
            model: Galleries,
            as: 'galleries',
            required: false
        }, {
            model: Categories,
            as: 'categories',
            required: false
        }, {
            model: Locations,
            as: 'locations',
            include: [{ model: Cities, as: 'cities', required: false }],
            required: false
        }];
    }

    // returns array of all mandatory fields
    getAllMandatoryFields() {
        return [
            'name', 'shortCode', 'phone', 'pincode', 'profileImageUrl',
            'fees', 'cityId', 'categoryId', 'bankName', 'createdSalesId',
            'accountHolder', 'accountNumber', 'ifscCode', 'status'
        ];
    }

    getPartialMandatoryFields() {
        return [
            'name', 'shortCode', 'phone', 'fees', 'categoryId', 'status', 'createdSalesId'
        ];
    }

    // get merchant lists for user,admin,salesAgent,super admin
    getUserGroup(params, id, userId, salesAgentId, adminId, locationObject, callback) {
        var findObject = {};
        findObject.include = [{ model: UserGroups, as: 'userGroups', required: false }];
        findObject.where = {};
        findObject.where.id = (userId | salesAgentId | adminId);
        Users.find(findObject).then(function(data) {
            var groupName = (data && data.userGroups.name);
            var merchantService = new MerchantService();
            var merchantRepository = new MerchantRepository();
            if (data && id) {
                params.where.id = id;
                merchantRepository.find(params, callback);
                return null;
            }
            if (data && userId && !id && groupName == 'User') {
                var merchantService = new MerchantService();
                params.where.status = 'Active';
                merchantRepository.findAll(params, function(err, result) {
                    if (err)
                        callback(err);
                    if (!result.length)
                        callback(null, result);
                    if (result.length)
                        merchantService.getAllMerchantsWithDistance(result, locationObject, callback);
                });
                return null;
            }
            if (data && salesAgentId && !id && groupName == 'Field Sales Agent') {
                params.where.$and = {};
                params.where.$and.createdSalesId = salesAgentId;
                params.where.$and.$or = [{ status: "Pending for approval" }, { status: "Active" }, { status: "Drafted" }];
                merchantRepository.findAll(params, callback);
                return null;
            }
            if (data && adminId && !id && (groupName == 'Admin' || groupName == 'Super Admin')) {
                params.where.status = {};
                params.where.status.$not = "Permanent Suspend";
                merchantRepository.findAll(params, callback);
                return null;
            }
            return callback("Please provide correct id");
        });
    }

    getAllMerchantsWithDistance(arrayOfMerchants, locationObject, callback) {
        var count = 0;
        var result = [];
        async.each(arrayOfMerchants, function(element) {
            var lon1 = element.longitude;
            var lat1 = element.latitude;
            var lat2 = locationObject.latitude;
            var lon2 = locationObject.longitude;
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
            element.dataValues.distance = dist;
            result.push(element.dataValues);
            count++;
            if (count == arrayOfMerchants.length)
                callback(null, _.orderBy(result, ['distance'], ['asc']));
        });
    }

    getActiveMerchants(params, callback) {
        var id = params.id;
        var whereObject = {};
        whereObject.where = {};
        (id) ? (whereObject.where.id = id) : (whereObject.where.status = 'Active');
        var merchantRepository = new MerchantRepository();
        merchantRepository.findAll(whereObject, callback);
    }

}

module.exports = MerchantService;
