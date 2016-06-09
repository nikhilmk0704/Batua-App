angular.module('app').controller('transactionController', ['$scope', '$state', '$stateParams', 'reportsService', 'loginService', 'toastr', 'merchantList',
    function($scope, $state, $stateParams, reportsService, loginService, toastr, merchantList) {

        var vm = this;
        vm.merchantList = merchantList;

        reportsService.getTransactionReport(function(response) {
            if (response.status === 200) {
                vm.reportsData = response.data;
                return;
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }
            return toastr.error(response.data);
        });

        // vm.handleFilterClicked = function(data) {

        //     var filterParams = {};

        //     vm.items = reportData;
        //     var checkItems = angular.copy(vm.items);
        //     if (!data && !$scope.dateFrom && !$scope.dateTo)
        //         vm.items = reportData;

        //     else {

        //         if (dateFrom) {
        //             vm.items = _.filter(reportData, function(item) {
        //                 return (moment(moment(dateFrom, 'DD-MM-YYYY').format("YYYY-MM-DD")).isSameOrBefore(moment(item.instanceDate).format('YYYY-MM-DD')))
        //             });
        //         }
        //         if (dateTo) {
        //             vm.items = _.filter(vm.items, function(item) {
        //                 return (moment(moment(dateTo, 'DD-MM-YYYY').format("YYYY-MM-DD")).isSameOrAfter(moment(item.instanceDate).format('YYYY-MM-DD')))
        //                 return item;
        //             });

        //         }
        //     }

        //     if (data) {
        //         if (data.instanceId)
        //             filterParams.instanceId = data.instanceId;
        //         if (data.vendor)
        //             filterParams.vendorName = data.vendor.firstName + ' ' + (data.vendor.lastName ? data.vendor.lastName : '');
        //         var finalData = _.where(vm.items, filterParams);
        //         vm.items = angular.copy(finalData);
        //     }

        //     $timeout(function() {
        //         $("#financialReportList").dataTable();
        //     }, 200);

        // };

        // vm.clearFilters = function() {
        //     delete($scope.dateTo);
        //     delete($scope.dateFrom);
        //     delete(vm.filterData);
        //     vm.items = reportData;
        //     $('#dateFrom').val('');
        //     $('#dateTo').val('');
        //     vm.handleFilterClicked();
        // }

        vm.exportData = function() {

            vm.listOfMerchants = angular.copy(vm.reportsData);

            vm.filteredData = _.map(vm.listOfMerchants, function(data) {
                var cityName = ((data.locations && data.locations.cities) ? data.locations.cities.name : '');
                var reportsData = { 'Name': data.name, 'Category': data.categories.name, 'ShortCode': data.shortCode, 'City': cityName, 'Created By': data.users.name, 'Status': data.status }
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

        $scope.openFrom = function($event) {
            $scope.status.opened = true;
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
            opened: false
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

        /*END of Cancel Transaction*/


    }
]);
