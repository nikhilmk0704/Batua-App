(function() {    
    'use strict';

    angular.module('app').factory('reportsService', reportsService);

    reportsService.$inject = ['httpi', 'API', '$q'];

    function reportsService(httpi, API, $q) {

        var service = {};

        service.getPaymentReport = getPaymentReport;
        service.addSettlement = addSettlement;
        service.getPaymentDetailsAgainstMerchant = getPaymentDetailsAgainstMerchant;
        service.cancelTransaction = cancelTransaction;
        service.getTransactionReport = getTransactionReport;
        service.getListOfUsers = getListOfUsers;

        return service;

        function getPaymentReport(params, callback) {
            httpi({
                method: "get",
                url: API.paymentReport,
                params: params
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function addSettlement(data, callback) {
            httpi({
                method: "post",
                url: API.addSettlement,
                data: {
                    name: data.name,
                    date: data.date,
                    referenceNumber: data.referenceNumber,
                    description: data.description
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
                    merchantId: merchantId
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function cancelTransaction(adminId, paymentId, data, callback) {
            httpi({
                method: "put",
                url: API.cancelTransaction,
                data: {
                    paymentId: paymentId,
                    adminId: adminId,
                    cancellationDate: data.cancellationDate,
                    cancellationDescription: data.cancellationDescription
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function getTransactionReport(params, callback) {
            httpi({
                method: "get",
                url: API.transactionReport,
                params: params
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function getListOfUsers(callback) {
            var deferred = $q.defer();
            httpi({
                method: "get",
                url: API.activeMobileUsers
            }).then(function(response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }


    }

})();
