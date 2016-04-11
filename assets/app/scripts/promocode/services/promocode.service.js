(function() {    
    'use strict';

    angular.module('app').factory('promocodeService', promocodeService);

    promocodeService.$inject = ['httpi', 'API', '$localStorage', '$cookieStore', '$state'];

    function promocodeService(httpi, API, $localStorage, $cookieStore, $state) {

        var service = {};

        service.getPromocodeList = getPromocodeList;
        service.addPromocode = addPromocode;
        service.editPromocode = editPromocode;
        service.getPromocodeData = getPromocodeData;
        service.setStatus = setStatus;

        return service;

        function getPromocodeList(callback) {
            httpi({
                method: "get",
                url: API.promocode
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function addPromocode(promocode, callback) {
            httpi({
                method: "post",
                url: API.promocode,
                data: {
                    promocode:promocode.promocode,
                    discountPercentage: promocode.discountPercentage,
                    description: promocode.description,
                    maximumAmountLimit: promocode.maximumAmountLimit,
                    validFrom: promocode.validFrom,
                    validTo: promocode.validTo,
                    percentageCostBourneByBatua: promocode.percentageCostBourneByBatua,
                    percentageCostBourneByMerchant: promocode.percentageCostBourneByMerchant,
                    merchantId: promocode.merchantId //need to get it confirm array OR single 
                }
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function editPromocode(promocode, callback) {
            httpi({
                method: "put",
                url: API.updatePromocode,
                data: {
                    promocode:promocode.promocode,
                    discountPercentage: promocode.discountPercentage,
                    description: promocode.description,
                    maximumAmountLimit: promocode.maximumAmountLimit,
                    validFrom: promocode.validFrom,
                    validTo: promocode.validTo,
                    percentageCostBourneByBatua: promocode.percentageCostBourneByBatua,
                    percentageCostBourneByMerchant: promocode.percentageCostBourneByMerchant,
                    merchantId: promocode.merchantId
                },
                params: {
                    id: promocode.id
                }
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function getPromocodeData(promocodeId, callback) {
            httpi({
                method: "get",
                url: API.updatePromocode,
                params: {
                    id: promocodeId
                }
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function setStatus(promocodeId, status, callback) {
            httpi({
                method: "put",
                url: API.promocodeStatus,
                data: {
                    status: status
                },
                params: {
                    id: promocodeId
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }


    }

})();