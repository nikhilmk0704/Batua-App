angular.module('app').controller('userController', function ($scope, $location, userService, getUserDetails, toastr, $state, $localStorage, $stateParams) {

 var _this = this;
 _this.userDetails = getUserDetails;
 _this.key = $stateParams.key;

 _this.sendActivationEmailForAUser = function (userId) {

  userService.resendActivationEmail(userId, function (response) {
   if (response.status === 200) {
    if (_this.key) {
     userService.searchUser(_this.key, function (response) {
      if (response.status === 200) {
       _this.userDetails = response.data.userDetails;
       toastr.success('Activation Email has been sent successfully');
      }
     });
    } else {
     userService.getUserDetails('userName', 'asc', function (response) {
      if (response.status === 200) {
       _this.userDetails = response.data.userDetails;
       toastr.success('Activation Email has been sent successfully');
      }
     });
    }
   } else if (response.status === 400) {
    toastr.error('Activation Email was not sent');
   } else if (response.status != 400 && response.status != 200) {
    toastr.error('Oops Something went wrong!!! Please try after sometime.');
   }
  });

 }

 _this.blockUser = function (status, userId) {

  userService.blockUserBasedOnStatus(status, userId, function (response) {
   if (response.status === 200) {

    if (_this.key) {
     userService.searchUser(_this.key, function (response) {
      if (response.status === 200) {
       _this.userDetails = response.data.userDetails;
       if (status === 'block') {
        toastr.success('The user is blocked on dKreator.');
       } else if (status === 'unblock') {
        toastr.success('The user is unblocked on dKreator.');
       }
      }
     });
    } else {
     userService.getUserDetails('userName', 'asc', function (response) {
      if (response.status === 200) {
       _this.userDetails = response.data.userDetails;
       if (status === 'block') {
        toastr.success('The user is blocked on dKreator.');
       } else if (status === 'unblock') {
        toastr.success('The user is unblocked on dKreator.');
       }
      }
     });
    }
   } else if (response.status === 400) {
    toastr.error('The user is not blocked on dKreator.');
   } else if (response.status != 400 && response.status != 200) {
    toastr.error('Oops Something went wrong!!! Please try after sometime.');
   }

  });

 }

 _this.keywordSearchUser = function (keyword) {
  userService.searchUser(keyword, function (response) {
   if (response.status === 200) {
    _this.userDetails = response.data.userDetails;
   } else if (response.status === 400) {
    _this.userDetails = [];
    toastr.error('Could not find based on the keyword', {
     positionClass: 'toast-top-center',
    });
   } else if (response.status != 200 && response.status != 400) {
    toastr.error('Oops Something went wrong!!! Please try after sometime.');
   }
  });
 }

});
