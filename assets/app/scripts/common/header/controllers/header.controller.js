angular.module('app').controller('headerController', function ($scope, $state) {

 var _this = this;

 $scope.logout = function () {
  $state.go('login');
 }


});
