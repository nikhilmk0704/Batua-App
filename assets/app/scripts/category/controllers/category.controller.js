angular.module('app').controller('categoryController', ['$state', 'categoryService', 'toastr', function($state, categoryService, toastr) {

    var vm = this;

    categoryService.getCategoryList(function(response) {
        if (response.status === 200) {
            vm.categories = response.data;
            return;
        }
        if (response.status === 400) {
            return toastr.error(response.data.errors[0].message);
        }
        return toastr.error(response.data);
    });


    vm.editCategoryData = function(category) {
        $state.go('editCategory',{categoryId: category.id});
    };

    vm.deleteCategory = function(categoryId) {

        categoryService.deleteCategory(categoryId, function(response) {
            if (response.status === 200) {
                $state.reload();
                return toastr.success('Category has been deleted successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }
            return toastr.error(response.data);
        });
    };


}]);