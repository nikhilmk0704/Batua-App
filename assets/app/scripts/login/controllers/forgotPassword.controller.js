'use strict';

angular.module('app').controller('forgetPasswordController', ['$state', '$stateParams', 'loginService', 'toastr',

    function($state, $stateParams, loginService, toastr) {

        var vm = this;

        vm.forgetPassword = function(email) {

            loginService.forgetPassword(email, function(response) {
                if (response.status === 200) {
                    $state.go('login');
                    return toastr.info('Link has been sent on your email.');
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
