angular.module('app').controller('addUserController', ['$state', '$scope', '$timeout', 'userService', 'toastr', 'imageUpload', 'userGroups',

    function($state, $scope, $timeout, userService, toastr, imageUpload, userGroups) {

        var vm = this;
        vm.userGroups = userGroups;

        vm.addUser = function(user) {

            userService.addUser(user, function(response) {
                if (response.status === 201) {
                    $state.go('userList');
                    return toastr.success('User has been created successfully.');
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                return toastr.error(response.data);
            });
        };

        /* --- START Image Upload --- */

        vm.profileImageUpload = function(file, event, $flow) {
            var file, image;
            var _URL = window.URL || window.webkitURL;
            if ((file = file.file)) {
                image = new Image();
                image.onload = function() {
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
                var responseData = response.data;
                if (response.status === 200) {
                    $timeout(function() {
                        $scope.$apply(function() {
                            vm.addUserData.profileImageUrl = responseData;
                        });
                    }, 1500);
                    return vm.addUserData.profileImageUrl;
                }
                if (response.status === 400) {
                    return toastr.error(responseData.errors[0].message);
                }
                return toastr.error(responseData);
            });
        };

        /* --- END Image Upload --- */


    }
]);
