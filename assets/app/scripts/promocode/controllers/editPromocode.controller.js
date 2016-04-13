angular.module('app').controller('editPromocodeController', ['$scope', '$state', '$stateParams', 'promocodeService', 'toastr', 'merchantList',

    function($scope, $state, $stateParams, promocodeService, toastr, merchantList) {

        var vm = this;
        vm.merchantList = merchantList;
        vm.promocodeId = $stateParams.promocodeId;

        promocodeService.getPromocodeData(vm.promocodeId, function(response) {
            if (response.status === 200) {
                vm.editPromocodeData = response.data;
                vm.editPromocodeData.validFrom = new Date(response.data.validFrom);
                vm.editPromocodeData.validTo = new Date(response.data.validTo);
                return;
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }
            return toastr.error(response.data);
        });

        vm.editPromocode = function(promocode) {

            var merchants = _.map(vm.editPromocodeData.merchants, 'id');

            promocodeService.editPromocode(promocode, merchants, function(response) {
                if (response.status === 200) {
                    $state.go('promocodeList');
                    return toastr.success('Promocode has been updated successfully.');
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                return toastr.error(response.data);
            });
        };

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
            $scope.status.opened1 = false;
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
