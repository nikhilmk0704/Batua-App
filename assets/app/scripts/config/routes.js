(function () {

    angular.module('app').factory('routes', routes);

    function routes() {

        return {
            login: "/user/login",
            category: "/category",
            updateCategory: "/category/:id",
            getMerchants: "/admin/:adminId/merchant",
            merchantDetails: "/admin/:adminId/merchant/:id",
            updateMerchant: "/merchant",
            cities: "/city",
            imageUpload: "/image/upload",
            setStatus: "/merchant/setstatus",
            user: "/admin/user",
            userDetails: "/admin/user/:id",
            userStatus: "/admin/user/setstatus",
            userGroups: "/usergroup"
        }

    }
})();