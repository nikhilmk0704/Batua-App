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

                return toastr.error(response.data);
            });
        }
    }
]);
