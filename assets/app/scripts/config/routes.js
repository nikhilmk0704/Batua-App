(function () {

    angular.module('app').factory('routes', routes);

    function routes() {

        return {
            login: "/admin/user/login",
            forgetPassword: "/admin/user/forgotpassword",
            resetPassword: "/admin/user/resetpassword",
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
            userGroups: "/usergroup",
            offer: "/offer",
            updateOffer: "/offer/:id",
            offerStatus: "/offer/:id/status",
            promocode: "/promocode",
            updatePromocode: "/promocode/:id",
            promocodeStatus: "/promocode/:id/status"
        }

    }
})();