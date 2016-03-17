(function () {    
 'use strict';

 angular.module('app').factory('loginService', loginService);

 loginService.$inject = ['$http', 'API', '$localStorage', '$cookieStore', '$state'];

 function loginService($http, API, $localStorage, $cookieStore, $state) {

  var service = {};

  service.Login = Login;
  service.isAuthenticated = isAuthenticated;

  return service;

  function Login(data, callback) {
   $http.post(API.login, data).then(function (response) {
    callback(response);
   }, function (err) {
    callback(err);
   });
  }

  function isAuthenticated() {
   if ($localStorage.getObject('admin')) {
    $state.go('addCategory');
   }
  }

 }

})();
