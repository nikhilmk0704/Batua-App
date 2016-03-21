angular.module('app').controller('headerController', function($state, authenticationService) {

    var vm = this;

    vm.logout = function() {
        authenticationService.ClearCredentials();
        $state.go('login', { reload: true });
    }


});