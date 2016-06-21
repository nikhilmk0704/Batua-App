'use strict';

angular.module('app').controller('changePasswordController', ['$state', 'loginService', 'toastr', 'authenticationService',

    function($state, loginService, toastr, authenticationService) {

        var vm = this;
        vm.userId = loginService.getUserDetails().id;

        vm.changePassword = function(oldPassword, newPassword) {

            loginService.changePassword(vm.userId, oldPassword, newPassword, function(response) {
                if (response.status === 200) {
                    authenticationService.clearCredentials();
                    $state.go('login');
                    return toastr.info('The password has been changed successfully');
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                if (response.status === 404) {
                    return toastr.error("No Data Found.");
                }
                if (response.status === 502) {
                    return toastr.error("Database Connection Error.");
                }
                if (response.status === 500) {
                    return toastr.error("Server Issue.");
                }
                return toastr.error(response.data);
            });
        };

    }
]);
