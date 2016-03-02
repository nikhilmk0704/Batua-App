angular.module('app').controller('loginController', function ($scope, $location, loginService) {

    var vm = this;

    vm.login = function (userModel) {

        loginService.Login(userModel, function (response) {
            if (response.status == 200) {
                $location.path('/dashboard');
            } else {}
        });
    }
});