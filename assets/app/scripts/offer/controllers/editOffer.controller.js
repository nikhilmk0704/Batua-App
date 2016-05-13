angular.module('app').controller('editOfferController', ['$scope', '$state', '$stateParams', 'offerService', 'toastr', 'merchantList',

    function($scope, $state, $stateParams, offerService, toastr, merchantList) {

        var vm = this;
        vm.merchantList = merchantList;
        vm.offerId = $stateParams.offerId;

        offerService.getOfferData(vm.offerId, function(response) {
            if (response.status === 200) {
                vm.editOfferData = response.data;
                vm.editOfferData.validFrom = new Date(response.data.validFrom);
                vm.editOfferData.validTo = new Date(response.data.validTo);
                return;
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }
            return toastr.error(response.data);
        });

        vm.editOffer = function(offer) {

            var merchants = _.map(vm.editOfferData.merchants, 'id');

            offerService.editOffer(offer, merchants, function(response) {
                if (response.status === 200) {
                    $state.go('offerList');
                    return toastr.success('Offer has been updated successfully.');
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                if (response.status === 406) {
                    vm.merchantsHaveOffer = response.data;
                    return vm.showListOfMerchantsModal();
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
