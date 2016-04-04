angular.module('app').controller('merchantController', ['$state', 'merchantService', 'toastr', function($state, merchantService, toastr) {

    var vm = this;

    var adminId = 2; //adminId is static after login module make it dynamic

    merchantService.getMerchantList(adminId, function(response) {
        if (response.status === 200) {
            vm.merchants = response.data;
            return;
        }
        if (response.status === 400) {
            return toastr.error(response.data);
        }
        return toastr.error(response.data);
    });

    vm.editMerchantData = function(merchant) {
        if (merchant.status == 'Drafted' || merchant.status == 'Suspend') {
            return;
        } else {
            $state.go('editMerchant', { merchantId: merchant.id });
        }
    };

    vm.checkMerchantStatus = function(merchant) {
        if (merchant.status == 'Drafted' || merchant.status == 'Suspend') {
            return true;
        } else {
            return false;
        }
    };

    vm.showActions = function(merchant) {
        if (merchant.status == 'Drafted' || merchant.status == 'Pending for approval') {
            return true;
        } else {
            return false;
        }
    };

    vm.setStatus = function(merchantId, status) {
        merchantService.setStatus(merchantId, status, function(response) {
            if (response.status === 200) {
                $state.reload();
                return toastr.success('Merchant status has been changed successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data);
            }
            return toastr.error(response.data);
        });
    };


}]);
