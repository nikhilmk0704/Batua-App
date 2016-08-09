angular.module('app').controller('addUserController', ['$state', '$scope', '$timeout', 'userService', 'toastr', 'imageUpload', 'userGroups', 'loggedInUser',

    function($state, $scope, $timeout, userService, toastr, imageUpload, userGroups, loggedInUser) {

        var vm = this;
        vm.addUserData = {};
        vm.userGroups = userGroups;
        vm.loggedInUser = loggedInUser;

        vm.addUser = function(user) {

            userService.addUser(user, function(response) {
                if (response.status === 201) {
                    $state.go('userList');
                    return toastr.success('User has been created successfully.');
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
            var _URL = window.URL || window.webkitURL;
            if ((file = file.file)) {
                image = new Image();
                image.onload = function() {
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
                            vm.addUserData.profileImageUrl = responseData;
                        });
                    }, 1500);
                    toastr.success('Profile image is uploaded successfully');
                    return vm.addUserData.profileImageUrl;
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
