(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'ngCookies', 'ngLodash', 'datatables', 'httpi', 'toastr', 'angular-loading-bar', 'flow', 'angucomplete-alt', 'angularjs-dropdown-multiselect'])
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
            controllerAs: 'vm'
        })

        .state('changePassword', {
            url: '/changePassword',
            templateUrl: 'app/views/changePassword/change_password.html',
            controller: 'changePasswordController',
            controllerAs: 'vm'
        })

        .state('forgetPassword', {
            url: '/forgetPassword',
            templateUrl: 'app/views/login/forgot_password.html',
            controller: 'forgetPasswordController',
            controllerAs: 'vm'
        })

        .state('resetPassword', {
            url: '/resetpassword/:email/:auth',
            templateUrl: 'app/views/resetPassword/reset_password.html',
            controller: 'resetPasswordController',
            controllerAs: 'vm'
        })

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
                }],
                loggedInUser: ['loginService', 'authenticationService', function(loginService, authenticationService){
                    if(loginService.getUserDetails().userGroup == 'Super Admin') {
                        return loginService.getUserDetails().userGroup;
                    }
                    authenticationService.clearCredentials();
                    return;
                }]
            }
        })

        .state('editUser', {
            url: '/editUser/:userId',
            templateUrl: 'app/views/user/edit_user.html',
            controller: 'editUserController',
            controllerAs: 'vm',
            resolve: {
                loggedInUser: ['loginService', 'authenticationService', function(loginService, authenticationService){
                    if(loginService.getUserDetails().userGroup == 'Super Admin') {
                        return loginService.getUserDetails().userGroup;
                    }
                    authenticationService.clearCredentials();
                    return;
                }]
            }
        })

        .state('userList', {
            url: '/userList',
            templateUrl: 'app/views/user/user_list.html',
            controller: 'userController',
            controllerAs: 'vm',
            resolve: {
                loggedInUser: ['loginService', 'authenticationService', function(loginService, authenticationService){
                    if(loginService.getUserDetails().userGroup == 'Super Admin') {
                        return loginService.getUserDetails().userGroup;
                    }
                    authenticationService.clearCredentials();
                    return;
                }]
            }
        })

        .state('addOffer', {
            url: '/addOffer',
            templateUrl: 'app/views/offer/add_offer.html',
            controller: 'addOfferController',
            controllerAs: 'vm',
            resolve: {
                merchantList: ['merchantService', function(merchantService) {
                    return merchantService.getAllActiveMerchants();
                }]
            }
        })

        .state('editOffer', {
            url: '/editOffer/:offerId',
            templateUrl: 'app/views/offer/edit_offer.html',
            controller: 'editOfferController',
            controllerAs: 'vm',
            resolve: {
                merchantList: ['merchantService', function(merchantService) {
                    return merchantService.getAllActiveMerchants();
                }]
            }
        })

        .state('offerList', {
            url: '/offerList',
            templateUrl: 'app/views/offer/offer_list.html',
            controller: 'offerController',
            controllerAs: 'vm'
        })

        .state('addPromocode', {
            url: '/addPromocode',
            templateUrl: 'app/views/promocode/add_promo.html',
            controller: 'addPromocodeController',
            controllerAs: 'vm',
            resolve: {
                merchantList: ['merchantService', function(merchantService) {
                    return merchantService.getAllActiveMerchants();
                }]
            }

        })

        .state('editPromocode', {
            url: '/editPromocode/:promocodeId',
            templateUrl: 'app/views/promocode/edit_promo.html',
            controller: 'editPromocodeController',
            controllerAs: 'vm',
            resolve: {
                merchantList: ['merchantService', function(merchantService) {
                    return merchantService.getAllActiveMerchants();
                }]
            }
        })

        .state('promocodeList', {
            url: '/promocodeList',
            templateUrl: 'app/views/promocode/promo_list.html',
            controller: 'promocodeController',
            controllerAs: 'vm'
        })

    }

    run.$inject = ['$rootScope', '$cookieStore', '$http', '$location', 'authenticationService', '$state', 'loginService'];

    function run($rootScope, $cookieStore, $http, $location, authenticationService, $state, loginService) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            // $http.defaults.headers.common['accessToken'] = $rootScope.globals.currentUser.userData.accessToken;
            // $http.defaults.headers.common['Cache-Control'] = 'no-cache';
            // $http.defaults.headers.common['Pragma'] = 'no-cache';
            $http.defaults.headers.common['content-type'] = 'application/json';
        }

        $rootScope.$auth = authenticationService;

        $rootScope.userGroup = loginService;

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var restrictedRoutes = ['/login', '/forgetPassword'];
            var restrictedPage = $.inArray($location.path(), restrictedRoutes) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });

    }

})();