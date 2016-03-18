angular.module('app').controller('loginController', function($scope, $location, loginService, toastr, $state, authenticationService, $location) {

  // if ($scope.$auth.IsAuthenticated()) {
  //  $state.go('addCategory');
  // }

  var _this = this;

  _this.login = function(userModel) {

    loginService.Login(userModel, function(response) {
      if (response.status == 200) {
        // Success need to save credentials in local storage
        authenticationService.SetCredentials(response.data);
        $state.go('addCategory');
      } else if (response.status === 400) {
        toastr.error('The admin Credentials are incorrect. Please provide the correct email id / password', {
          closeButton: true
        });
      } else if (response.status != 400 || response.status != 200) {
        toastr.error('Oops! Something went wrong. Please check after some time', {
          closeButton: true
        });
      }
    });
  }
});
