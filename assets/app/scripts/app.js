(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.bootstrap', 'toastr', 'angularUtils.directives.dirPagination', 'angular-loading-bar', 'ngAnimate', 'ngCookies', 'ngLodash'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider'];

    function config($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = false;
        
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/login");

        // Now set up the states
        $stateProvider
        
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/login/login.html',
                controller: 'loginController',
                controllerAs: 'loginVm'
            })

            .state('addCategory', {
                url: '/addCategory',
                templateUrl: 'app/views/category/add_category.html',
                controller: 'addCategoryController',
                controllerAs: 'addCategoryVm'
            })
        
            .state('categoryList', {
                url: '/categoryList',
                templateUrl: 'app/views/category/category_list.html'
            })

            .state('userList', {
                url: '/userList',
                templateUrl: 'app/views/user/user_list.html'
            })
        
            .state('merchantList', {
                url: '/merchantList',
                templateUrl: 'app/views/merchant/merchant_list.html'
            })

            .state('offerList', {
                url: '/offerList',
                templateUrl: 'app/views/offer/offer_list.html'
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

    run.$inject = ['$rootScope', '$localStorage', '$cookieStore', '$http', '$location', 'lodash', 'authenticationService', '$state'];

    function run($rootScope, $localStorage, $cookieStore, $http, $location, lodash, authenticationService, $state) {
        
        // keep user logged in after page refresh
          $rootScope.globals = $cookieStore.get('globals') || {};
          if ($rootScope.globals.currentUser) {
           $http.defaults.headers.common['accessToken'] = $rootScope.globals.currentUser.userData.accessToken;
          }
        
          $rootScope.isAuthenticated = authenticationService.IsAuthenticated();   

          $rootScope.$on('$locationChangeStart', function (event, next, current) {
           var restrictedRoutes = ['/login'];
           var restrictedPage = $.inArray($location.path(), restrictedRoutes) === -1;
           if (restrictedPage && (_.isEmpty($localStorage.getObject('admin')))) {
            $location.path('/login');
           }
          });
        
    }
    
//      run.$inject = [];
//    
//      function run(){}

})();