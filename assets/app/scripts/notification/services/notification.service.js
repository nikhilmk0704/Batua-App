(function() {    
    'use strict';

    angular.module('app').factory('notificationService', notificationService);

    notificationService.$inject = ['httpi', 'API'];

    function notificationService(httpi, API) {

        var service = {};

        service.getActiveMobileUsers = getActiveMobileUsers;
        service.sendNotification = sendNotification;

        return service;

        function getActiveMobileUsers(callback) {
            httpi({
                method: "get",
                url: API.activeMobileUsers
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function sendNotification(notificationData, callback) {
            httpi({
                method: "put",
                url: API.pushNotification,
                data: {
                    id: notificationData.users,
                    message: notificationData.message
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

    }

})();
