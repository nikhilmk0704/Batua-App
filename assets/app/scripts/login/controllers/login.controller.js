  angular.module('app').controller('loginController', ['loginService', 'toastr', '$state', 'authenticationService',

      function(loginService, toastr, $state, authenticationService) {

          var vm = this;

          vm.login = function(user) {

              loginService.login(user, function(response) {
                  if (response.status === 200) {
                      authenticationService.setCredentials(response.data);
                      if (response.data.userGroup == 'Super Admin') {
                          $state.go('userList');
                          // window.location.reload(true);
                          return toastr.success('You have successfully signed in!');
                      }

                      if (response.data.userGroup == 'Admin') {
                          $state.go('merchantList');
                          // window.location.reload(true);
                          return toastr.success('You have successfully signed in!');
                      }
                  }

                  if (response.status === 400) {
                      return toastr.error('The admin Credentials are incorrect. Please provide the correct email id / password');
                  }

                  if (response.status === 404) {
                      return toastr.error("No Data Found.");
                  }
                  if (response.status === 502) {
                      return toastr.error("Database Connection Error.");
                  }
                  if (response.status === 500) {
                      return toastr.error("Server Issue.");
                  }

                  return toastr.error(response.data);
              });
          }

      }
  ]);
