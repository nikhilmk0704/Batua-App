angular.module('app').controller('transactionController', ['$scope', '$state', '$stateParams', 'reportsService', 'loginService', 'toastr', 'merchantList', 'users',
    function($scope, $state, $stateParams, reportsService, loginService, toastr, merchantList, users) {

        var vm = this;
        vm.merchantList = merchantList;
        vm.users = users;

        var params = {};

        function init(params) {

            reportsService.getTransactionReport(params, function(response) {
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
                toDate: data.toDate,
                userId: data.userId
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
                var userName = (data.userName ? data.userName : ''),
                    transactionCancelledBy = (data.transactionCancelledBy ? data.transactionCancelledBy : ''),
                    transactionCancelledOn = (data.transactionCancelledOn ? data.transactionCancelledOn : ''),
                    cancelledDesc = (data.cancellationDescription ? data.cancellationDescription : '');

                var reportsData = {
                    'Merchant Name': data.merchantName,
                    'User Name': userName,
                    'Order number': data.orderNumber,
                    'Transaction ID': data.transactionId,
                    'Transaction Date': data.transactionDate,
                    'Payment Amount(Rs)': data.paymentAmount,
                    'Cashback by Offer': data.cashbackByOffer,
                    'Cashback by PromoCode': data.cashbackByPromo,
                    'Amount(Rs) credited to Batua': data.batuaCommission,
                    'Transaction cancelled by': transactionCancelledBy,
                    'Transaction cancelled on': transactionCancelledOn,
                    'Cancellation Description': cancelledDesc
                }
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
