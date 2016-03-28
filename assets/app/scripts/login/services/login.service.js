(function() {    
    'use strict';

    angular.module('app').factory('loginService', loginService);

    loginService.$inject = ['httpi', 'API', '$localStorage', '$cookieStore', '$state'];

    function loginService(httpi, API, $localStorage, $cookieStore, $state) {

        var service = {};

        service.Login = Login;
        service.isAuthenticated = isAuthenticated;

        return service;

        function Login(user, callback) {
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

        function isAuthenticated() {
            if ($localStorage.getObject('admin')) {
                $state.go('addCategory');
            }
        }

    }

})();