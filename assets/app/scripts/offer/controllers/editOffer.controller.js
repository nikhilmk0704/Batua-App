angular.module('app').controller('editOfferController', ['$state', 'offerService', 'toastr', function($state, offerService, toastr) {

    var vm = this;


    vm.editOffer = function(offer) {

        offerService.editOffer(offer, function(response) {
            if (response.status === 200) {
                $state.go('offerList');
                return toastr.success('Offer has been updated successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }
            return toastr.error(response.data);
        });
    };


}]);