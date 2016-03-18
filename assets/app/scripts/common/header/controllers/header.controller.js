angular.module('app').controller('headerController', function ($scope, $state, authenticationService) {

 var _this = this;

 $scope.logout = function () {
  authenticationService.ClearCredentials();
  $state.go('login', {reload:true});
 }


});
