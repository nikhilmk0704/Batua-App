  angular.module('app').controller('loginController', ['$location', 'loginService', 'toastr', '$state', 'authenticationService', function($location, loginService, toastr, $state, authenticationService) {

      var vm = this;

      vm.login = function(user) {

          loginService.Login(user, function(response) {
              if (response.status === 200) {
                  authenticationService.SetCredentials(response.data);
                  $state.go('userList');
                  return toastr.success('You have successfully signed in!');
              }

              if (response.status === 400) {
                  return toastr.error('The admin Credentials are incorrect. Please provide the correct email id / password');
              }
  
              return toastr.error(response.data);
          });
      }

  }]);