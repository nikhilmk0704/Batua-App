(function() {    
    'use strict';

    angular.module('app').factory('loginService', loginService);

    loginService.$inject = ['httpi', 'API'];

    function loginService(httpi, API) {

        var service = {};

        service.login = login;
        service.forgetPassword = forgetPassword;
        service.resetPassword = resetPassword;
        service.changePassword = changePassword;

        return service;

        function login(user, callback) {
            httpi({
                method: "post",
                url: API.login,
                data: {
                    email: user.email,
                    password: user.password
                }
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function forgetPassword(email, callback) {
            httpi({
                method: "put",
                url: API.forgetPassword,
                data: {
                    email: email
                }
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function resetPassword(password, email, auth, callback) {
            httpi({
                method: "put",
                url: API.resetPassword,
                data: {
                    email: email,
                    password: password
                },
                headers: {
                    'Access-Token': auth
                }
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

        function changePassword(oldPassword, newPassword, callback) {
            httpi({
                method: "post",
                url: API.login,
                data: {
                    password: newPassword,
                    oldPassword: oldPassword
                }
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

    }

})();