(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.bootstrap', 'toastr', 'angular-loading-bar', 'ngAnimate', 'ngCookies', 'ngLodash', 'httpi', 'datatables', 'angularjs-dropdown-multiselect'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider'];

    function config($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = false;
        
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/addCategory");

        // Now set up the states
        $stateProvider

        .state('addCategory', {
            url: '/addCategory',
            templateUrl: 'app/views/category/add_category.html',
            controller: 'addCategoryController',
            controllerAs: 'vm'
        })

        .state('editCategory', {
            url: '/editCategory',
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

        .state('userList', {
            url: '/userList',
            templateUrl: 'app/views/user/user_list.html'
        })

        .state('merchantList', {
            url: '/merchantList',
            templateUrl: 'app/views/merchant/merchant_list.html'
        })

        .state('addOffer', {
            url: '/addOffer',
            templateUrl: 'app/views/offer/add_offer.html'
        })

        .state('editOffer', {
            url: '/editOffer',
            templateUrl: 'app/views/offer/edit_offer.html'
        })

        .state('offerList', {
            url: '/offerList',
            templateUrl: 'app/views/offer/offer_list.html'
        })

        .state('addPromocode', {
            url: '/addPromocode',
            templateUrl: 'app/views/promocode/add_promo.html'
        })

        .state('editPromocode', {
            url: '/editPromocode',
            templateUrl: 'app/views/promocode/edit_promo.html'
        })

        .state('promocodeList', {
            url: '/promocodeList',
            templateUrl: 'app/views/promocode/promo_list.html'
        })

        .state('reports', {
            url: '/reports',
            templateUrl: 'app/views/reports/reports.html'
        })

        .state('notification', {
            url: '/notification',
            templateUrl: 'app/views/notification/notification.html'
        })

    }

    run.$inject = [];

    function run() {}

})();