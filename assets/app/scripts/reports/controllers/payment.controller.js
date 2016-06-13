angular.module('app').controller('paymentController', ['$scope', '$state', 'reportsService', 'toastr', 'merchantList',

    function($scope, $state, reportsService, toastr, merchantList) {

        var vm = this;
        vm.merchantList = merchantList;

        var params = {};

        function init(params) {

            reportsService.getPaymentReport(params, function(response) {
                if (response.status === 200) {
                    vm.reportsData = response.data;
                    return;
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                return toastr.error(response.data);
            });
        }

        init(params);

        vm.handleFilterClicked = function(data) {
            params = {
                merchantId: data.merchantId,
                fromDate: data.fromDate,
                toDate: data.toDate
            };
            init(params);
        };

        vm.clearFilters = function() {
            delete(vm.filterData);
            params = {};
            init(params);
        }

        vm.exportData = function() {

            vm.list = angular.copy(vm.reportsData);

            vm.filteredData = _.map(vm.list, function(data) {

                var reportsData = {
                    'Merchant Name': data.merchantName,
                    'Net Transaction Amt(Rs)': data.netTransactionAmount,
                    'Net Offer Amt (Rs)': data.netOfferAmount,
                    'Net Promo Offer Amt(Rs)': data.netPromoOfferAmount,
                    'Cashback By Merchant(Rs)': data.netCashbackByMerchant,
                    'Fee Charged(Rs)': data.netFeeCharged,
                    'Settlement Amt(Rs)': data.netSettlementAmount,
                    'Status': data.status
                }
                return reportsData;
            });

            alasql('SELECT * INTO XLSX("download.xlsx",{headers:true}) FROM ?', [vm.filteredData]);
        }

        /*START of Add Settlement*/

        vm.addSettlement = function(settlementDetails) {

            reportsService.addSettlement(settlementDetails, function(response) {
                if (response.status === 200) {
                    $state.go('payments');
                    return toastr.success('Settlement has been created successfully.');
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
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


    }
]);
