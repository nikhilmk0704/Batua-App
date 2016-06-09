angular.module('app').controller('paymentController', ['$state', 'reportsService', 'toastr', function($state, reportsService, toastr) {

    var vm = this;

    reportsService.getPaymentReport(function(response) {
        if (response.status === 200) {
            vm.reportsData = response.data;
            return;
        }
        if (response.status === 400) {
            return toastr.error(response.data.errors[0].message);
        }
        return toastr.error(response.data);
    });

    // vm.editMerchantData = function(merchant) {
    //     if (merchant.status == 'Drafted' || merchant.status == 'Suspend') {
    //         return;
    //     }
    //     $state.go('editMerchant', { merchantId: merchant.id });
    // };

    // vm.checkMerchantStatus = function(merchant) {
    //     if (merchant.status == 'Drafted' || merchant.status == 'Suspend') {
    //         return true;
    //     }
    //     return false;
    // };

    // vm.showActions = function(merchant) {
    //     if (merchant.status == 'Drafted' || merchant.status == 'Pending for approval') {
    //         return true;
    //     }
    //     return false;
    // };

    // vm.setStatus = function(merchantId, status) {
    //     reportsService.setStatus(merchantId, status, function(response) {
    //         if (response.status === 200) {
    //             $state.reload();
    //             return toastr.success('Merchant status has been changed successfully.');
    //         }
    //         if (response.status === 400) {
    //             return toastr.error(response.data.errors[0].message);
    //         }
    //         return toastr.error(response.data);
    //     });
    // };

    vm.exportData = function() {

        vm.listOfMerchants = angular.copy(vm.reportsData);

        vm.filteredData = _.map(vm.listOfMerchants, function(data){
            var cityName = ((data.locations && data.locations.cities) ? data.locations.cities.name : '');
            var reportsData = {'Name': data.name, 'Category': data.categories.name, 'ShortCode': data.shortCode, 'City': cityName, 'Created By': data.users.name, 'Status':data.status}
            return reportsData;
        });

        alasql('SELECT * INTO XLSX("download.xlsx",{headers:true}) FROM ?', [vm.filteredData]);
    }


}]);
