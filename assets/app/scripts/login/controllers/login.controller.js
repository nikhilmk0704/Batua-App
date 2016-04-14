  angular.module('app').controller('loginController', ['loginService', 'toastr', '$state', 'authenticationService', function(loginService, toastr, $state, authenticationService) {

      var vm = this;

      vm.login = function(user) {

          loginService.login(user, function(response) {
              if (response.status === 200) {
                  authenticationService.setCredentials(response.data);
                  // if () {
                  //   $state.go('userList');
                  // }

                  // if () {
                  //   $state.go('merchantList');
                  // }
                  $state.go('merchantList');
                  return toastr.success('You have successfully signed in!');
              }

              if (response.status === 400) {
                  return toastr.error('The admin Credentials are incorrect. Please provide the correct email id / password');
              }
  
              return toastr.error(response.data);
          });
      }

  }]);