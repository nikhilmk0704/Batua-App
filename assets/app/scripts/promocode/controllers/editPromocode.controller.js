angular.module('app').controller('editPromocodeController', ['$state', 'promocodeService', 'toastr', function($state, promocodeService, toastr) {

    var vm = this;

    vm.editPromocode = function(promocode) {

        promocodeService.editPromocode(promocode, function(response) {
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


}]);