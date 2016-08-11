angular.module('app').controller('paymentDetailsController', ['$scope', '$state', '$stateParams', 'reportsService', 'toastr', function($scope, $state, $stateParams, reportsService, toastr) {

    var vm = this;

    vm.merchantId = $stateParams.merchantId;
    vm.merchantName = $stateParams.merchantName;
    vm.paymentId = $stateParams.paymentId;
    vm.settlementDetails = {};

    reportsService.getPaymentDetailsAgainstMerchant(vm.merchantId, function(response) {
        if (response.status === 200) {
            vm.paymentDetails = response.data;
            vm.settlementDetails.name = vm.merchantName;
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

    /*START of Add Settlement*/

    vm.addSettlement = function(data) {

        var settlementDetails = angular.copy(data);
        settlementDetails.merchantId = vm.merchantId;
        settlementDetails.paymentId = vm.paymentId;

        reportsService.addSettlement(settlementDetails, function(response) {
            if (response.status === 201) {
                $state.go('payments');
                return toastr.success('Settlement has been created successfully.');
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

    }

    /*END of Add Settlement*/

    /* START ui-bootstrap datepicker */

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.toggleMin = function() {
        $scope.minDate = new Date();
    };
    $scope.toggleMin();

    $scope.maxDate = new Date(2050, 12, 31);
    $scope.startDate = new Date(2016, 01, 01);

    $scope.openFrom = function($event) {
        $scope.status.opened = true;
        $scope.status.opened1 = true;
        $scope.status.opened2 = false;
    };

    $scope.openTo = function($event) {
        $scope.status.opened1 = false;
        $scope.status.opened2 = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false,
        opened1: false,
        opened2: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);

    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    /* END ui-bootstrap datepicker */

}]);
