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

    vm.setStatus = function(offerId, status) {
        offerService.setStatus(offerId, status, function(response) {
            if (response.status === 200) {
                return toastr.success('Updated successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
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


}]);
