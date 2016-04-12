(function() {    
    'use strict';

    angular.module('app').factory('offerService', offerService);

    offerService.$inject = ['httpi', 'API'];

    function offerService(httpi, API) {

        var service = {};

        service.getOfferList = getOfferList;
        service.addOffer = addOffer;
        service.editOffer = editOffer;
        service.getOfferData = getOfferData;
        service.setStatus = setStatus;

        return service;

        function getOfferList(callback) {
            httpi({
                method: "get",
                url: API.offer
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function addOffer(offer, callback) {
            httpi({
                method: "post",
                url: API.offer,
                data: {
                    discountPercentage: offer.discountPercentage,
                    description: offer.description,
                    maximumAmountLimit: offer.maximumAmountLimit,
                    validFrom: offer.validFrom,
                    validTo: offer.validTo,
                    merchantId: offer.merchantId
                }
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function editOffer(offer, callback) {
            httpi({
                method: "put",
                url: API.updateOffer,
                data: {
                    discountPercentage: offer.discountPercentage,
                    description: offer.description,
                    maximumAmountLimit: offer.maximumAmountLimit,
                    validFrom: offer.validFrom,
                    validTo: offer.validTo,
                    merchantId: offer.merchantId
                },
                params: {
                    id: offer.id
                }
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function getOfferData(offerId, callback) {
            httpi({
                method: "get",
                url: API.updateOffer,
                params: {
                    id: offerId
                }
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function setStatus(offerId, status, callback) {
            httpi({
                method: "put",
                url: API.offerStatus,
                data: {
                    status: status
                },
                params: {
                    id: offerId
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }


    }

})();