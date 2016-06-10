angular.module('app').controller('transactionController', ['$scope', '$state', '$stateParams', 'reportsService', 'loginService', 'toastr', 'merchantList', 'users',
    function($scope, $state, $stateParams, reportsService, loginService, toastr, merchantList, users) {

        var vm = this;
        vm.merchantList = merchantList;
        vm.users = users;

        reportsService.getTransactionReport(function(response) {
            if (response.status === 200) {
                vm.reportsData = response.data;
                reportsData = angular.copy(vm.reportsData);
                return;
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }
            return toastr.error(response.data);
        });

        vm.handleFilterClicked = function(data) {

            var filterParams = {};

            vm.reportsData = reportsData;

            if (!data) {
                vm.reportsData = reportsData;
            }

            if (data) {
                if (data.merchantId) {
                    filterParams.merchantId = data.merchantId;
                }
                if (data.userId) {
                    filterParams.userId = data.userId;
                }
                if (data.fromDate) {
                    vm.reportsData = _.filter(reportsData, function(item) {
                        return (moment(moment(data.fromDate, 'dd/MM/yyyy').format("YYYY-MM-DD")).isSameOrBefore(moment(item.instanceDate).format('YYYY-MM-DD')))
                    });
                }
                if (data.toDate) {
                    vm.reportsData = _.filter(vm.reportsData, function(item) {
                        return (moment(moment(data.fromDate, 'dd/MM/yyyy').format("YYYY-MM-DD")).isSameOrAfter(moment(item.instanceDate).format('YYYY-MM-DD')))
                        return item;
                    });
                }
                var finalData = _.where(vm.reportsData, filterParams);
                vm.reportsData = angular.copy(finalData);
            }
        };

        vm.clearFilters = function() {
            delete(vm.filterData);
            vm.reportsData = reportsData;
            vm.handleFilterClicked();
        }

        vm.exportData = function() {

            vm.list = angular.copy(vm.reportsData);

            vm.filteredData = _.map(vm.list, function(data) {
                var userName = (data.user.name ? data.user.name : '');
                var offerCashback = (data.promocodeId ? '' : data.promocodeAmount);
                var promoCashback = (data.promocodeId ? data.promocodeAmount : '');
                var transactionCancelledBy = (data.cancelledBy ? data.cancelledBy.name : '');
                var transactionCancelledOn = (data.cancellationDate ? (data.cancellationDate).format('YYYY-MM-DD') : '');
                var reportsData = { 'Merchant Name': data.merchant.name, 'User Name': userName, 'Order number': data.transactionDetail.orderNumber, 'Transaction ID': data.transactionDetail.transactionId, 'Transaction Date': (data.transactionDetail.createdAt).format('YYYY-MM-DD'), 'Payment Amount(Rs)': data.paidAmount, 'Cashback by Offer': offerCashback, 'Cashback by PromoCode': promoCashback, 'Amount(Rs) credited to Batua': data.batuaCommission, 'Transaction cancelled by': transactionCancelledBy, 'Transaction cancelled on': transactionCancelledOn, 'Cancellation Description': data.status }
                return reportsData;
            });

            alasql('SELECT * INTO XLSX("download.xlsx",{headers:true}) FROM ?', [vm.filteredData]);
        }

        /*START of Cancel Transaction*/

        vm.paymentId = $stateParams.paymentId;

        vm.adminId = loginService.getUserDetails().id;

        vm.cancelTransaction = function(cancellationDetails) {

            reportsService.cancelTransaction(vm.adminId, vm.paymentId, cancellationDetails, function(response) {
                if (response.status === 200) {
                    $state.go('transactions');
                    return toastr.success('Request has been created successfully.');
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                return toastr.error(response.data);
            });
        }

        /*END of Cancel Transaction*/

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
