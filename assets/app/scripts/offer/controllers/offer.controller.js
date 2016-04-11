angular.module('app').controller('offerController', ['$state', 'offerService', 'toastr', function($state, offerService, toastr) {

    var vm = this;


    offerService.getOfferList(function(response) {
        if (response.status === 200) {
            vm.offers = response.data;
            return;
        }
        if (response.status === 400) {
            return toastr.error(response.data);
        }
        return toastr.error(response.data);
    });

    vm.setStatus = function(offerId, status) {
        offerService.setStatus(offerId, status, function(response) {
            if (response.status === 200) {
                return toastr.success('Updated successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }
            return toastr.error(response.data);
        });
    };


}]);
