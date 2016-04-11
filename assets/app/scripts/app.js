(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'ngCookies', 'ngLodash', 'datatables', 'httpi', 'toastr', 'angular-loading-bar', 'flow', 'angucomplete-alt'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider'];

    function config($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = false;

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/categoryList");

        // Now set up the states
        $stateProvider

        .state('addCategory', {
            url: '/addCategory',
            templateUrl: 'app/views/category/add_category.html',
            controller: 'addCategoryController',
            controllerAs: 'vm'
        })

        .state('editCategory', {
            url: '/editCategory/:categoryId',
            templateUrl: 'app/views/category/edit_category.html',
            controller: 'editCategoryController',
            controllerAs: 'vm'
        })

        .state('categoryList', {
            url: '/categoryList',
            templateUrl: 'app/views/category/category_list.html',
            controller: 'categoryController',
            controllerAs: 'vm'
        })

        .state('merchantList', {
            url: '/merchantList',
            templateUrl: 'app/views/merchant/merchant_list.html',
            controller: 'merchantController',
            controllerAs: 'vm'
        })

        .state('editMerchant', {
            url: '/editMerchant/:merchantId',
            templateUrl: 'app/views/merchant/merchant_details.html',
            controller: 'editMerchantController',
            controllerAs: 'vm',
            resolve: {
                categories: ['merchantService', function(merchantService) {
                    return merchantService.getCategories();
                }],
                cities: ['merchantService', function(merchantService) {
                    return merchantService.getCities();
                }]
            }
        })

        .state('addUser', {
            url: '/addUser',
            templateUrl: 'app/views/user/add_user.html',
            controller: 'addUserController',
            controllerAs: 'vm',
            resolve: {
                userGroups: ['userService', function(userService) {
                    return userService.getUserGroups();
                }]
            }
        })

        .state('editUser', {
            url: '/editUser/:userId',
            templateUrl: 'app/views/user/edit_user.html',
            controller: 'editUserController',
            controllerAs: 'vm'
        })

        .state('userList', {
            url: '/userList',
            templateUrl: 'app/views/user/user_list.html',
            controller: 'userController',
            controllerAs: 'vm'
        })

    }

    run.$inject = [];

    function run() {}

})();