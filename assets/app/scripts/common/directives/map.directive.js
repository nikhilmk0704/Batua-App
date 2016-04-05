angular.module('app').directive('map', [function() {
    return {
        template: "<div align='center' id='map' class='map_canvas' style='height: 400px; margin-bottom:10px;'><br/></div>",
        restrict: 'E',
        link: function(scope, element, attr) {

            scope.$watch('vm.coordinates', function() {
                if (scope.vm.coordinates === 'undefined' || scope.vm.coordinates.length === 0) {
                    return;
                }

                return plotMap(scope.vm.coordinates[0], scope.vm.coordinates[1]);
            });

            scope.options = {
                map: ".map_canvas"
            };

            var geocoder = new google.maps.Geocoder;
            var reverseGeolocation = function(lat, lng) {
                var latlng = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                };

                geocoder.geocode({
                    'location': latlng
                }, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        return (results[0].formatted_address);
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
                    reverseGeolocation(lat, lng, function() {
                        scope.vm.editMerchantData.latitude = lat;
                        scope.vm.vm.editMerchantData.longitude = lng;
                        $scope.$apply();
                    });
                });
            };

        }
    };

}]);
