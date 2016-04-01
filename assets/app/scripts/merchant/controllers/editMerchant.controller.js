angular.module('app').controller('editMerchantController', ['$state', 'merchantService', 'toastr', '$stateParams', 'categories', 'cities', 'imageUpload', '$scope', '$timeout',

    function($state, merchantService, toastr, $stateParams, categories, cities, imageUpload, $scope, $timeout) {

        var vm = this;

        vm.merchantId = $stateParams.merchantId;
        vm.categories = categories;
        vm.cities = cities;
        vm.uploadedImages = [];


        var adminId = 2; //adminId is static after login module make it dynamic

        $timeout(function() {
            merchantService.getMerchantData(vm.merchantId, adminId, function(response) {
                if (response.status === 200) {
                    vm.editMerchantData = response.data;
                    vm.editMerchantData.profileImageUrl = response.data.profileImageUrl;
                    vm.editMerchantData.latitude = response.data.latitude;
                    vm.editMerchantData.longitude = response.data.longitude;
                    return;
                }
                if (response.status === 400) {
                    return toastr.error(response.data);
                }
                return toastr.error(response.data);
            });
        }, 500);

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

            var imageGallery = vm.getAllImages();

            merchantService.editMerchant(merchant, imageGallery, function(response) {
                if (response.status === 200) {
                    $state.go('merchantList');
                    return toastr.success('Merchant Details has been updated successfully.');
                }
                if (response.status === 400) {
                    return toastr.error(response.data);
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
                    if (this.width < 320 || this.height < 240)
                        toastr.error("Please select an image above 320px width and 240px height");
                    else {
                        imageUpload.uploadImage(file, function(response) {
                            $flow.files = [];
                            if (response.status === 200) {
                                vm.uploadedImages.push(response.data);
                            } else {
                                toastr.error(response.data);
                            }
                        });
                    }
                }
                image.onerror = function() {
                    toastr.error("not a valid file: " + file.type);
                };
                image.src = _URL.createObjectURL(file);
            }
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
                    if (this.width < 320 || this.height < 240)
                        toastr.error("Please select an image above 320px width and 240px height");
                    else {
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
                            } else {
                                toastr.error(response.data);
                            }
                        });
                    }
                }
                image.onerror = function() {
                    toastr.error("not a valid file: " + file.type);
                };
                image.src = _URL.createObjectURL(file);
            }
        };

        /* --- END Image Upload --- */



        /* --- START Google Maps Integration --- */

        $scope.options = {
            map: ".map_canvas",
            location: "NYC"
        };

        var geocoder = new google.maps.Geocoder;
        var reverseGeolocation = function(lat, lng, callback) {
            var latlng = {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            };

            geocoder.geocode({
                'location': latlng
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    callback(results[0].formatted_address);
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });

        };


        var plotMap = function(lat, lng) {

            var myLatLng = {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            };

            var map = new google.maps.Map($('#map')[0], {
                center: myLatLng,
                scrollwheel: false,
                zoom: 15
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                draggable: true,
                map: map,
                title: 'Location'
            });

            google.maps.event.addListener(marker, 'dragend', function(evt) {
                var lat = evt.latLng.lat();
                var lng = evt.latLng.lng();
                reverseGeolocation(lat, lng, function(city) {
                    vm.editMerchantData.latitude = lat;
                    vm.editMerchantData.longitude = lng;
                    vm.editMerchantData.city = city;
                    $scope.$apply();
                });
            });
        };

        $timeout(function() {
            plotMap(vm.editMerchantData.latitude, vm.editMerchantData.longitude);
        }, 1500);

        /* --- END Google Maps Integration --- */


    }
]);
