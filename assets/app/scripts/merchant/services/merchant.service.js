(function() {    
    'use strict';

    angular.module('app').factory('merchantService', merchantService);

    merchantService.$inject = ['httpi', 'API', '$cookieStore', '$state', '$q'];

    function merchantService(httpi, API, $cookieStore, $state, $q) {

        var service = {};

        service.getMerchantList = getMerchantList;
        service.updateMerchant = updateMerchant;
        service.getMerchantData = getMerchantData;
        service.getCategories = getCategories;
        service.getCities = getCities;
        service.setStatus = setStatus;

        return service;

        function getMerchantList(adminId, callback) {
            httpi({
                method: "get",
                url: API.getMerchants,
                params: {
                    adminId: adminId
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function updateMerchant(merchant, imageGallery, cityId, coordinates, callback) {
            httpi({
                method: "put",
                url: API.updateMerchant,
                data: {
                    id: merchant.id,
                    name: merchant.name,
                    shortCode: merchant.shortCode,
                    profileImageUrl: merchant.profileImageUrl,
                    email: merchant.email,
                    phone: merchant.phone,
                    imageGallery: imageGallery,
                    fees: merchant.fees,
                    categoryId: merchant.categoryId,
                    cityId: cityId, 
                    address: merchant.address,
                    pincode: merchant.Location.pincode,
                    latitude: coordinates[0],
                    longitude: coordinates[1],
                    accountHolder: merchant.accountHolder,
                    accountNumber: merchant.accountNumber,
                    ifscCode: merchant.ifscCode,
                    branchName: merchant.branchName,
                    bankName: merchant.bankName,
                    status: "Active",
                    createdSalesId: merchant.createdSalesId
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function getMerchantData(merchantId, adminId, callback) {
            httpi({
                method: "get",
                url: API.merchantDetails,
                params: {
                    adminId: adminId,
                    id: merchantId
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function getCategories() {
            var deferred = $q.defer();
            httpi({
                method: "get",
                url: API.category
            }).then(function(response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }

        function getCities() {
            var deferred = $q.defer();
            httpi({
                method: "get",
                url: API.cities
            }).then(function(response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }

        function setStatus(merchantId, status, callback) {
            httpi({
                method: "put",
                url: API.setStatus,
                data: {
                    id: merchantId,
                    status: status
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }


    }

})();
