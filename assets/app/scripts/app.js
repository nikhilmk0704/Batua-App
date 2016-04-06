(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.bootstrap', 'toastr', 'angular-loading-bar', 'ngAnimate', 'ngCookies', 'ngLodash', 'httpi', 'datatables', 'ngSanitize', 'flow', 'angucomplete-alt'])
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

    }

    run.$inject = [];

    function run() {}

})();