angular.module('app').controller('addCategoryController', ['$state', 'categoryService', 'toastr', function($state, categoryService, toastr) {

    var vm = this;

    vm.cancel = function() {
        $state.go('categoryList');
    };

    vm.addCategory = function(category) {

        categoryService.addCategory(category, function(response) {
            if (response.status === 200) {
                toastr.success('Category has been created successfully.');
                $state.go('categoryList');
            }

            if (response.status === 400) {
                return toastr.error(response.data);
            }
                
            return toastr.error(response.data);
        });
    };


}]);