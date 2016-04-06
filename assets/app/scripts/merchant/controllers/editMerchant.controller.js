angular.module('app').controller('editMerchantController', ['$state', 'merchantService', 'toastr', '$stateParams', 'categories', 'cities', 'imageUpload', '$scope', '$timeout',

    function($state, merchantService, toastr, $stateParams, categories, cities, imageUpload, $scope, $timeout) {

        var vm = this;

        vm.merchantId = $stateParams.merchantId;
        vm.categories = categories;
        vm.cities = cities;
        vm.uploadedImages = [];

        var adminId = 2; //adminId is static after login module make it dynamic

        merchantService.getMerchantData(vm.merchantId, adminId, function(response) {
            if (response.status === 200) {
                vm.editMerchantData = response.data;
                vm.editMerchantData.profileImageUrl = response.data.profileImageUrl;
                vm.coordinates = [response.data.latitude, response.data.longitude];
                return;
            }
            if (response.status === 400) {
                return toastr.error(response.data.errors[0].message);
            }
            return toastr.error(response.data);
        });

        vm.getAllImages = function() {
            var urls = [];

            vm.editMerchantData.Galleries.forEach(function(image) {
                urls.push(image.url);
            });
            vm.uploadedImages.forEach(function(image) {
                urls.push(image);
            });

            return urls;
        };

        vm.editMerchant = function(merchant) {
            var cityId, coordinates;
            var imageGallery = vm.getAllImages();

            if (angular.isDefined(merchant.cityId)) {
                cityId = merchant.cityId.originalObject.id;
            } else {
                cityId = vm.editMerchantData.Location.cityId;
            }

            coordinates = vm.coordinates;

            merchantService.updateMerchant(merchant, imageGallery, cityId, coordinates, function(response) {
                if (response.status === 200) {
                    $state.go('merchantList');
                    return toastr.success('Merchant Details has been updated successfully.');
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                return toastr.error(response.data);
            });
        };

        vm.deleteImage = function(merchant, imageUrl) {

            var imageGallery = vm.getAllImages();
            var image = imageGallery.indexOf(imageUrl);
            if (image != -1) {
                imageGallery.splice(image, 1);
            }

            var cityId, coordinates;

            if (angular.isDefined(merchant.cityId)) {
                cityId = merchant.cityId.originalObject.id;
            } else {
                cityId = vm.editMerchantData.Location.cityId;
            }

            coordinates = vm.coordinates;

            merchantService.updateMerchant(merchant, imageGallery, cityId, coordinates, function(response) {
                if (response.status === 200) {
                    $state.reload();
                    return toastr.success('Image is deleted successfully');
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                return toastr.error(response.data);
            });
            

        };


        /* --- START Image Upload --- */

        vm.uploadImage = function(file, event, $flow) {
            var file, image;
            var _URL = window.URL || window.webkitURL;
            if ((file = file.file)) {
                image = new Image();
                image.onload = function() {
                    if (this.width < 320 || this.height < 240) {
                        return toastr.error("Please select an image above 320px width and 240px height");
                    }
                    return handleUploadImage(file, event, $flow);
                }
                image.onerror = function() {
                    return toastr.error("not a valid file: " + file.type);
                };
                image.src = _URL.createObjectURL(file);
            }
        };

        var handleUploadImage = function(file, event, $flow) {
            imageUpload.uploadImage(file, function(response) {
                $flow.files = [];
                if (response.status === 200) {
                    vm.uploadedImages.push(response.data);
                    return;
                }
                if (response.status === 400) {
                    return toastr.error(response.data.errors[0].message);
                }
                return toastr.error(response.data);
            });
        };

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


    }
]);
