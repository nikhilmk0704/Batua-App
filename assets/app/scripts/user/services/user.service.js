(function () {    
 'use strict';

 angular.module('app').factory('userService', userService);

 userService.$inject = ['$http', 'API', '$localStorage'];

 function userService($http, API, $localStorage) {

  var service = {};
  service.getUserDetails = getUserDetails;
  service.resendActivationEmail = resendActivationEmail;
  service.blockUserBasedOnStatus = blockUserBasedOnStatus;
  service.searchUser = searchUser;
  return service;

//  



 }

})();
