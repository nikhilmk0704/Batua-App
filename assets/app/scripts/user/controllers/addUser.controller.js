angular.module('app').controller('addUserController', ['$state', 'userService', 'toastr', function($state, userService, toastr) {

    var vm = this;

    vm.addUser = function(user) {

        userService.addUser(user, function(response) {
            if (response.status === 201) {
                $state.go('userList');
                return toastr.success('User has been created successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data);
            }
            return toastr.error(response.data);
        });
    };


}]);
