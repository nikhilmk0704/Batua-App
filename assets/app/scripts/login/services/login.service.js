(function () {    
    'use strict';

    angular.module('app').factory('loginService', loginService);

    loginService.$inject = ['$http', 'API'];

    function loginService($http, API) {

        var service = {};

        service.Login = Login;

        return service;

        function Login(data, callback) {

            $http.post(API.login, data).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

    }
})();