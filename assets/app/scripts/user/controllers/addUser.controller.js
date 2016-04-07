angular.module('app').controller('addUserController', ['$state', '$scope', '$timeout', 'userService', 'toastr', 'imageUpload', function($state, $scope, $timeout, userService, toastr, imageUpload) {

    var vm = this;

    vm.addUser = function(user) {

        userService.addUser(user, function(response) {
            if (response.status === 201) {
                $state.go('userList');
                return toastr.success('User has been created successfully.');
            }
            if (response.status === 400) {
                return toastr.error(response.data);
            }
            return toastr.error(response.data);
        });
    };

    /* --- START Image Upload --- */

        vm.profileImageUpload = function(file, event, $flow) {
            var file, image;
            var imgOld = vm.editMerchantData.profileImageUrl;
            var _URL = window.URL || window.webkitURL;
            if ((file = file.file)) {
                image = new Image();
                image.onload = function() {
                    $scope.$apply(function() {
                        vm.editMerchantData.profileImageUrl = imgOld;
                    });
                    if (this.width < 320 || this.height < 240) {
                        return toastr.error("Please select an image above 320px width and 240px height");
                    }
                    return handleProfileImageUpload(file, event, $flow);
                }
                image.onerror = function() {
                    return toastr.error("not a valid file: " + file.type);
                };
                image.src = _URL.createObjectURL(file);
            }
        };

        var handleProfileImageUpload = function(file, event, $flow) {
            imageUpload.uploadImage(file, function(response) {
                $flow.files = [];
                if (response.status === 200) {
                    $timeout(function() {
                        $scope.$apply(function() {
                            vm.editMerchantData.profileImageUrl = response.data;
                        });
                        vm.editMerchantData.profileImageUrl = response.data;
                        return vm.editMerchantData.profileImageUrl;
                    }, 1500);
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                return toastr.error(response.data);
            });
        };

        /* --- END Image Upload --- */


}]);
