angular.module('app').controller('addOfferController', ['$state', 'offerService', 'toastr', function($state, offerService, toastr) {

    var vm = this;

    vm.addOffer = function(offer) {

        offerService.addOffer(offer, function(response) {
            if (response.status === 200) {
                $state.go('offerList');
                return toastr.success('Offer has been created successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }    
            return toastr.error(response.data);
        });
    };


}]);