angular.module('app').controller('promocodeController', ['$state', 'promocodeService', 'toastr', function($state, promocodeService, toastr) {

    var vm = this;


    promocodeService.getPromocodeList(function(response) {
        if (response.status === 200) {
            vm.promocodes = response.data;
            return;
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

    vm.setStatus = function(promocodeId, status) {
        promocodeService.setStatus(promocodeId, status, function(response) {
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
