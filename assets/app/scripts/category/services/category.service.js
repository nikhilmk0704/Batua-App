(function () {    
 'use strict';

 angular.module('app').factory('categoryService', categoryService);

 categoryService.$inject = ['$http', 'API', '$localStorage', '$cookieStore', '$state'];

 function categoryService($http, API, $localStorage, $cookieStore, $state) {

  var service = {};

  service.addCategory = addCategory;

  return service;

  function addCategory(data, callback) {
   $http.post(API.addCategory, data).then(function (response) {
    callback(response);
   }, function (err) {
    callback(err);
   });
  }


 }

})();
