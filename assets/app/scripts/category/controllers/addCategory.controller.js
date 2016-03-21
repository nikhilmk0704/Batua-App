angular.module('app').controller('addCategoryController', function($state, categoryService) {

    var vm = this;

    vm.addCategory = function(category) {

        categoryService.addCategory(category, function(response) {
            if (response.status == 200) {
                $state.go('categoryList');
            }
            if (response.status === 400) {
                return toastr.error(response.data);
            }
            if (response.status != 400 || response.status != 200) {
                return toastr.error(response.data);
            }
        });
    }


});