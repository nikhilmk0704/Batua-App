angular.module('app').controller('editUserController', ['$state', 'userService', 'toastr', '$stateParams', 'categories', 'cities', 'imageUpload'

    function($state, userService, toastr, $stateParams, categories, cities, imageUpload) {

        var vm = this;

        vm.userId = $stateParams.userId;

        userService.getUserData(vm.userId, userId, function(response) {
            if (response.status === 200) {
                vm.editUserData = response.data
                return;
            }
            if (response.status === 400) {
                return toastr.error(response.data);
            }
            return toastr.error(response.data);
        });

        vm.editUser = function(vm.editUserData) {

            userService.editUser(vm.editUserData, userId, function(response) {
                if (response.status === 200) {
                    $state.go('userList');
                    return toastr.success('User Details has been updated successfully.');
                }
                if (response.status === 400) {
                    return toastr.error(response.data);
                }
                return toastr.error(response.data);
            });
        };


    }
]);
