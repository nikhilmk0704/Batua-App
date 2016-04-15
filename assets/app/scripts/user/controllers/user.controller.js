angular.module('app').controller('userController', ['$state', 'userService', 'toastr', 'loggedInUser', function($state, userService, toastr, loggedInUser) {

    var vm = this;
    vm.loggedInUser = loggedInUser;

    userService.getUserList(function(response) {
        if (response.status === 200) {
            vm.users = response.data;
            return;
        }
        if (response.status === 400) {
            return toastr.error(response.data.errors[0].message);
        }
        return toastr.error(response.data);
    });

    vm.setStatus = function(userId, status) {
        userService.setStatus(userId, status, function(response) {
            if (response.status === 200) {
                return toastr.success('User status has been changed successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }
            return toastr.error(response.data);
        });
    };

}]);
