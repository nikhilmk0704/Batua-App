angular.module('app').controller('editCategoryController', ['$state', '$stateParams', 'categoryService', 'toastr', function($state, $stateParams, categoryService, toastr) {

    var vm = this;

    vm.categoryId = $stateParams.categoryId;

    categoryService.getCategoryData(vm.categoryId, function(response) {
        if (response.status === 200) {
            vm.editCategoryData = response.data;
            return;
        }
        if (response.status === 400) {
            return toastr.error(response.data.errors[0].message);
        }
        return toastr.error(response.data);
    });

    vm.cancel = function() {
        $state.go('categoryList');
    };

    vm.editCategory = function(category) {

        categoryService.editCategory(category, function(response) {
            if (response.status === 200) {
                $state.go('categoryList');
                return toastr.success('Category has been updated successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }    
            return toastr.error(response.data);
        });
    };


}]);