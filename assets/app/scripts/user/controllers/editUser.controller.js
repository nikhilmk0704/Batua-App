angular.module('app').controller('editUserController', ['$scope', '$state', '$stateParams', 'userService', 'toastr', 'imageUpload', 

    function($scope, $state, $stateParams, userService, toastr, imageUpload) {

        var vm = this;

        vm.userId = $stateParams.userId;

        userService.getUserData(vm.userId, function(response) {
            if (response.status === 200) {
                vm.editUserData = response.data
                return;
            }
            if (response.status === 400) {
                return toastr.error(response.data);
            }
            return toastr.error(response.data);
        });

        vm.editUser = function(user) {

            userService.editUser(user, function(response) {
                if (response.status === 200) {
                    $state.go('userList');
                    return toastr.success('User Details has been updated successfully.');
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
            var imgOld = vm.editUserData.profileImageUrl;
            var _URL = window.URL || window.webkitURL;
            if ((file = file.file)) {
                image = new Image();
                image.onload = function() {
                    $scope.$apply(function() {
                        vm.editUserData.profileImageUrl = imgOld;
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
                            vm.editUserData.profileImageUrl = response.data;
                        });
                        vm.editUserData.profileImageUrl = response.data;
                        return vm.editUserData.profileImageUrl;
                    }, 1500);
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                return toastr.error(response.data);
            });
        };

        /* --- END Image Upload --- */



    }
]);
