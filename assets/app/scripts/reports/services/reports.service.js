(function() {    
    'use strict';

    angular.module('app').factory('reportService', reportService);

    reportService.$inject = ['httpi', 'API'];

    function reportService(httpi, API) {

        var service = {};

        service.getPaymentReport = getPaymentReport;
        service.addSettlement = addSettlement;
        service.getPaymentDetailsAgainstMerchant = getPaymentDetailsAgainstMerchant;
        service.cancelTransaction = cancelTransaction;
        service.getTransactionReport = getTransactionReport;

        return service;

        function getPaymentReport(callback) {
            httpi({
                method: "get",
                url: API.paymentReport
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function addSettlement(merchant, callback) {
            httpi({
                method: "post",
                url: API.addSettlement,
                data: {
                    id: merchant.id,
                    name: merchant.name,
                    description: merchant.shortCode
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function getPaymentDetailsAgainstMerchant(merchantId, callback) {
            httpi({
                method: "get",
                url: API.paymentDetails,
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

        function cancelTransaction(transactionId, callback) {
            httpi({
                method: "put",
                url: API.cancelTransaction,
                data: {
                    id: transactionId,
                    status: status
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function getTransactionReport(callback) {
            httpi({
                method: "get",
                url: API.transactionReport
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

    }

})();
