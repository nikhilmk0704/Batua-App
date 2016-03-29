(function () {

    angular.module('app').factory('routes', routes);

    function routes() {

        return {
            login: "/user/login",
            category: "/category",
            updateCategory: "/category/:id",
        }

    }
})();