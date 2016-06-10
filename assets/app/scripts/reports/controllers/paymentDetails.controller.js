angular.module('app').controller('paymentDetailsController', ['$state', 'reportsService', 'toastr', function($state, reportsService, toastr) {

    var vm = this;

    reportsService.getPaymentDetailsAgainstMerchant(adminId, function(response) {
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
