(function() {    
    'use strict';

    angular.module('app').factory('loginService', loginService);

    loginService.$inject = ['httpi', 'API', '$localStorage'];

    function loginService(httpi, API, $localStorage) {

        var service = {};

        service.login = login;
        service.forgetPassword = forgetPassword;
        service.resetPassword = resetPassword;
        service.changePassword = changePassword;
        service.setUserDetails = setUserDetails;
        service.getUserDetails = getUserDetails;

        return service;

        function login(user, callback) {
            httpi({
                method: "post",
                url: API.login,
                data: {
                    email: user.email,
                    password: user.password
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
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
            }).then(function(response) {
                callback(response);
            }, function(response) {
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
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function changePassword(userId, oldPassword, newPassword, callback) {
            httpi({
                method: "put",
                url: API.login,
                data: {
                    userId: userId,
                    password: newPassword,
                    oldPassword: oldPassword
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function setUserDetails(data) {
            $localStorage.setObject("userData", data);
        }

        function getUserDetails() {
            return $localStorage.getObject("userData");
        }

    }

})();
