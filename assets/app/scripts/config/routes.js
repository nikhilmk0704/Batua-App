(function () {

    angular.module('app').factory('routes', routes);

    function routes() {

        return {
            login: "/admin/user/login",
            forgetPassword: "/admin/user/forgotpassword",
            resetPassword: "/admin/user/resetpassword",
            changepassword: "/admin/user/changepassword",
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
            promocodeStatus: "/promocode/:id/status",
            pushNotification: "/admin/activeuser/notify",
            activeMobileUsers: "/admin/activeuser",
            paymentReport: "/admin/payment/settlement?merchantId=:merchantId&fromDate=:fromDate&toDate=:toDate",
            paymentDetails: "/admin/payment/details?merchantId=:merchantId",
            transactionReport: "/admin/transaction/report?merchantId=:merchantId&fromDate=:fromDate&toDate=:toDate&userId=:userId",
            addSettlement: "/admin/settlement",
            cancelTransaction: "/admin/transaction/cancel"
        }

    }
})();