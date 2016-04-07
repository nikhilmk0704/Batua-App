angular.module('app').controller('userController', ['$state', 'userService', 'toastr', function($state, userService, toastr) {

    var vm = this;

    userService.getUserList(function(response) {
        if (response.status === 200) {
            vm.users = response.data;
            return;
        }
        if (response.status === 400) {
            return toastr.error(response.data);
        }
        return toastr.error(response.data);
    });

    vm.setStatus = function(userId, status) {
        userService.setStatus(userId, status, function(response) {
            if (response.status === 200) {
                // $state.reload();
                return toastr.success('User status has been changed successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data);
            }
            return toastr.error(response.data);
        });
    };



}]);
