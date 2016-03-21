(function() {    
    'use strict';

    angular.module('app').factory('categoryService', categoryService);

    categoryService.$inject = ['httpi', 'API', '$localStorage', '$cookieStore', '$state'];

    function categoryService(httpi, API, $localStorage, $cookieStore, $state) {

        var service = {};

        service.addCategory = addCategory;

        return service;

        function addCategory(category) {
            return httpi({
                method: "post",
                url: "API.addCategory",
                data: {
                    name: category
                }
            }).then(function(response) {
                debugger;
                return response;
            }, function(err) {
                throw err.data;
            });
        }


    }

})();