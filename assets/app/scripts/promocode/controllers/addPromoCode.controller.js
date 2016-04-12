angular.module('app').controller('addPromocodeController', ['$state', 'promocodeService', 'toastr', function($state, promocodeService, toastr) {

    var vm = this;
    // vm.merchantList = merchantList;

    vm.addPromocode = function(promocode) {

        promocodeService.addPromocode(promocode, function(response) {
            if (response.status === 200) {
                $state.go('promocodeList');
                return toastr.success('Promocode has been created successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }
            return toastr.error(response.data);
        });
    };

    vm.merchantsDropdownSettings = {
        scrollableHeight: '300px',
        scrollable: true,
        enableSearch: true,
        displayProp: 'label', 
        idProp: 'id', 
        externalIdProp: 'id'
    };

    vm.merchants = [];

    vm.merchantList = [
        { id: 1, label: "David" },
        { id: 2, label: "Jhon" },
        { id: 3, label: "Lisa" },
        { id: 4, label: "Nicole" },
        { id: 5, label: "Danny" },
        { id: 6, label: "Dan" },
        { id: 7, label: "Dean" },
        { id: 8, label: "Adam" },
        { id: 9, label: "Uri" },
        { id: 10, label: "Phil" }
    ];


}]);