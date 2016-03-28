  angular.module('app').controller('loginController', function($location, loginService, toastr, $state, authenticationService) {

      var vm = this;

      vm.login = function(user) {

          loginService.Login(user, function(response) {
              if (response.status === 200) {
                  // Success need to save credentials in local storage
                  authenticationService.SetCredentials(response.data);
                  $state.go('userList');
              }
              if (response.status === 400) {
                  return toastr.error('The admin Credentials are incorrect. Please provide the correct email id / password', {
                      closeButton: true
                  });
              }
              if (response.status != 400 || response.status != 200) {
                  return toastr.error('Oops! Something went wrong. Please check after some time', {
                      closeButton: true
                  });
              }

              return toastr.error(response.data);
          });
      }

  });