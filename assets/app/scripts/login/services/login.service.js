(function() {    
    'use strict';

    angular.module('app').factory('loginService', loginService);

    loginService.$inject = ['httpi', 'API', '$localStorage', '$cookieStore', '$state'];

    function loginService(httpi, API, $localStorage, $cookieStore, $state) {

        var service = {};

        service.Login = Login;
        service.isAuthenticated = isAuthenticated;

        return service;

        function Login(userModel) {
            return httpi({
                method: "post",
                url: "API.login",
                data: {
                    email: userModel.email,
                    password: userModel.password
                }
            }).then(function(response) {
                debugger;
                return response;
            }, function(err) {
                throw err.data;
            });
        }

        function isAuthenticated() {
            if ($localStorage.getObject('admin')) {
                $state.go('addCategory');
            }
        }

    }

})();