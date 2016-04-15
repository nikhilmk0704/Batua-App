'use strict';

angular.module('app').controller('changePasswordController', ['$state', 'loginService', 'toastr', 'authenticationService'

    function($state, loginService, toastr, authenticationService) {

        var vm = this;

        vm.changePassword = function(oldPassword, newPassword) {

            loginService.changePassword(oldPassword, newPassword, function(response) {
                if (response.status === 200) {
                    authenticationService.clearCredentials();
                    $state.go('login');
                    return toastr.info('The password has been changed successfully');
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                return toastr.error(response.data);
            });
        };

    }
]);
