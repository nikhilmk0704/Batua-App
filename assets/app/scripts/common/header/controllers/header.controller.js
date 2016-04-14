angular.module('app').controller('headerController', ['$state', 'authenticationService', function($state, authenticationService) {

    var vm = this;

    vm.logout = function() {
        authenticationService.clearCredentials();
        $state.go('login', { reload: true });
    }


}]);