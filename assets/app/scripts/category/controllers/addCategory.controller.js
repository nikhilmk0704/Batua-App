angular.module('app').controller('addCategoryController', function ($scope, $state, categoryService) {

 var _this = this;

 _this.addCategory = function(category) {

    categoryService.addCategory(category, function(response) {
      if (response.status == 200) {
        $state.go('categoryList');
      } else if (response.status === 400) {
        toastr.error(response.data);
      } else if (response.status != 400 || response.status != 200) {
        toastr.error(response.data);
      }
    });
  }


});