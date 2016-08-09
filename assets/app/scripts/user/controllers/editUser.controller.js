angular.module('app').controller('editUserController', ['$scope', '$state', '$timeout', '$stateParams', 'userService', 'toastr', 'imageUpload', 'loggedInUser',

    function($scope, $state, $timeout, $stateParams, userService, toastr, imageUpload, loggedInUser) {

        var vm = this;

        vm.userId = $stateParams.userId;
        vm.loggedInUser = loggedInUser;

        userService.getUserData(vm.userId, function(response) {
            if (response.status === 200) {
                vm.editUserData = response.data;
                return;
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

        vm.editUser = function(user) {

            userService.editUser(user, function(response) {
                if (response.status === 200) {
                    $state.go('userList');
                    return toastr.success('User Details has been updated successfully.');
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
                    if (this.width < 600 || this.height < 600) {
                        return toastr.error("Please select an image above 600px width and 600px height");
                    }
                    if (this.width != this.height) {
                        return toastr.error("Please select an image of 1:1 ratio");
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
                var responseData = response.data;
                if (response.status === 200) {
                    $timeout(function() {
                        $scope.$apply(function() {
                            vm.editUserData.profileImageUrl = responseData;
                        });
                    }, 1500);
                    toastr.success('Profile image is uploaded successfully');
                    return vm.editUserData.profileImageUrl;
                }
                if (response.status === 400) {
                    return toastr.error(responseData.errors[0].message);
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
                return toastr.error(responseData);
            });
        };

        /* --- END Image Upload --- */



    }
]);
