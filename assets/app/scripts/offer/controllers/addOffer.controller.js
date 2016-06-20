angular.module('app').controller('addOfferController', ['$scope', '$state', 'offerService', 'toastr', 'merchantList', '$uibModal',

    function($scope, $state, offerService, toastr, merchantList, $uibModal) {

        var vm = this;
        vm.merchantList = merchantList;

        vm.addOffer = function(offer) {

            var merchants = _.map(vm.merchants, 'id');

            offerService.addOffer(offer, merchants, function(response) {
                if (response.status === 201) {
                    $state.go('offerList');
                    return toastr.success('Offer has been created successfully.');
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                if (response.status === 406) {
                    vm.merchantsHaveOffer = response.data;
                    return vm.showListOfMerchantsModal();
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
        };

        vm.showListOfMerchantsModal = function() {

            var scope = $scope.$new();
            scope.merchantsHaveOffer = vm.merchantsHaveOffer;

            vm.modalInstance = $uibModal.open({
                animate: true,
                templateUrl: 'app/views/offer/merchants-have-offer-modal.html',
                scope: scope,
                windowClass: 'd-modal modalWindow',
                resolve: {
                    merchantsHaveOffer: function() {
                        return vm.merchantsHaveOffer;
                    }
                }
            });
        };

        /* START merchants multi-select-dropdown */

        vm.merchantsDropdownSettings = {
            scrollableHeight: '300px',
            scrollable: true,
            enableSearch: true,
            displayProp: 'name',
            idProp: 'id',
            externalIdProp: 'id',
            buttonClasses: 'form-control input-circle'
        };

        vm.merchants = [];

        /* END merchants multi-select-dropdown */


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
