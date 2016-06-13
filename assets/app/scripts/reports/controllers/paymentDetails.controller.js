angular.module('app').controller('paymentDetailsController', ['$state', '$stateParams', 'reportsService', 'toastr', function($state, $stateParams, reportsService, toastr) {

    var vm = this;

    vm.merchantId = $stateParams.merchantId;
    vm.merchantName = $stateParams.merchantName;

    reportsService.getPaymentDetailsAgainstMerchant(merchantId, function(response) {
        if (response.status === 200) {
            vm.paymentDetails = response.data;
            return;
        }
        if (response.status === 400) {
            return toastr.error(response.data.errors[0].message);
        }
        return toastr.error(response.data);
    });

}]);
