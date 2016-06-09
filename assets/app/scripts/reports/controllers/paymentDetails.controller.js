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

    // vm.exportData = function() {

    //     vm.listOfMerchants = angular.copy(vm.merchants);

    //     vm.filteredData = _.map(vm.listOfMerchants, function(data){
    //         var cityName = ((data.locations && data.locations.cities) ? data.locations.cities.name : '');
    //         var merchants = {'Name': data.name, 'Category': data.categories.name, 'ShortCode': data.shortCode, 'City': cityName, 'Created By': data.users.name, 'Status':data.status}
    //         return merchants;
    //     });

    //     alasql('SELECT * INTO XLSX("download.xlsx",{headers:true}) FROM ?', [vm.filteredData]);
    // }

}]);
