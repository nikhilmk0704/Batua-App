angular.module('app').controller('addCategoryController', ['$state', 'categoryService', 'toastr', function($state, categoryService, toastr) {

    var vm = this;

    vm.cancel = function() {
        $state.go('categoryList');
    };

    vm.addCategory = function(category) {

        categoryService.addCategory(category, function(response) {
            if (response.status === 201) {
                $state.go('categoryList');
                return toastr.success('Category has been created successfully.');
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
