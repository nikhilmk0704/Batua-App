(function () {

    angular.module('app').factory('routes', routes);

    function routes() {

        return {
            login: "/user/login",
            addCategory: "/category"
        }

    }
})();