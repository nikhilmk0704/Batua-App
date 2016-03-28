angular.module('app').controller('editCategoryController', ['$state', 'categoryService', 'toastr', function($state, categoryService, toastr) {

    var vm = this;

    vm.editCategoryData = categoryService.getCategoryData();

    vm.cancel = function() {
        $state.go('categoryList');
    };

    vm.editCategory = function(category) {

        categoryService.editCategory(category, function(response) {
            if (response.status === 200) {
                toastr.success('Category has been updated successfully.');
                $state.go('categoryList');
            }
            
            if (response.status === 400) {
                return toastr.error(response.data);
            }
                
            return toastr.error(response.data);
        });
    };


}]);