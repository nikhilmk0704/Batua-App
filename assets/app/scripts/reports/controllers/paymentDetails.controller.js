angular.module('app').controller('paymentDetailsController', ['$state', '$stateParams', 'reportsService', 'toastr', function($state, $stateParams, reportsService, toastr) {

    var vm = this;

    vm.merchantId = $stateParams.merchantId;
    vm.merchantName = $stateParams.merchantName;

    reportsService.getPaymentDetailsAgainstMerchant(vm.merchantId, function(response) {
        if (response.status === 200) {
            vm.paymentDetails = response.data;
            return;
        }
        if (response.status === 400) {
            return toastr.error(response.data.errors[0].message);
        }
        if (response.status === 404) {
            return toastr.error("No Data Found.");
        }
        if (response.status === 502) {
            return toastr.error("Database Connection Error.");
        }
        if (response.status === 500) {
            return toastr.error("Server Issue.");
        }
        return toastr.error(response.data);
    });

}]);
