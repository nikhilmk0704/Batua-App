(function() {    
    'use strict';

    angular.module('app').factory('categoryService', categoryService);

    categoryService.$inject = ['httpi', 'API', '$localStorage', '$cookieStore', '$state'];

    function categoryService(httpi, API, $localStorage, $cookieStore, $state) {

        var service = {};

        service.getCategoryList = getCategoryList;
        service.getCategory = getCategory;
        service.addCategory = addCategory;
        service.editCategory = editCategory;
        service.deleteCategory = deleteCategory;
        service.setCategoryData = setCategoryData;
        service.getCategoryData = getCategoryData;

        return service;

        function getCategoryList(callback) {
            httpi({
                method: "get",
                url: API.category
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function getCategory(categoryId, callback) {
            httpi({
                method: "get",
                url: API.updateCategory,
                params: {
                    id: categoryId
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function addCategory(category, callback) {
            httpi({
                method: "post",
                url: API.category,
                data: {
                    name: category.name
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function editCategory(category, callback) {
            httpi({
                method: "put",
                url: API.updateCategory,
                data: {
                    id: category.id,
                    name: category.name
                },
                params: {
                    id: category.id
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function deleteCategory(categoryId, callback) {
            httpi({
                method: "delete",
                url: API.updateCategory,
                params: {
                    id: categoryId
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function getCategoryData() {
            return $localStorage.getObject('categoryData');
        }

        function setCategoryData(category) {
            $localStorage.setObject('categoryData', category);
        }


    }

})();