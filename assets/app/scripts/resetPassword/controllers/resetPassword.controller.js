'use strict';

angular.module('app').controller('resetPasswordController', ['$state', '$stateParams', 'loginService', 'toastr', 'authenticationService',

    function($state, $stateParams, loginService, toastr, authenticationService) {

        var vm = this;

        vm.email = $stateParams.email;
        vm.auth = $stateParams.auth;

        vm.resetPassword = function(password) {

            loginService.resetPassword(password, vm.email, vm.auth, function(response) {
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
        }
    }
]);
