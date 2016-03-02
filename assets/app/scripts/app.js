(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

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

            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html'
            })

    }

    run.$inject = [];

    function run() {}

})();