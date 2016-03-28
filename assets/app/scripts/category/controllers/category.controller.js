angular.module('app').controller('categoryController', ['$state', 'categoryService', 'toastr', function($state, categoryService, toastr) {

    var vm = this;

    vm.getCategoryList = function() {
        categoryService.getCategoryList(function(response) {
            if (response.status === 200) {
                vm.categories = response.data.result;
            } 

            if (response.status === 400) {
                return toastr.error(response.data);
            }
                
            return toastr.error(response.data);
        });
    };

    vm.editCategoryData = function(category) {
        categoryService.setCategoryData(category);
        $state.go('editCategory');
    };

    vm.deleteCategory = function(categoryId) {

        categoryService.deleteCategory(categoryId, function(response) {
            if (response.status === 200) {
                $state.reload();
            }
            
            if (response.status === 400) {
                return toastr.error(response.data);
            }
                
            return toastr.error(response.data);
        });
    };


}]);