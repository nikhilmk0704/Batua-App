(function() {
    'use strict';

    angular
        .module('app')
        .factory('imageUpload', imageUpload);

    imageUpload.$inject = ['httpi', 'API', '$q'];

    function imageUpload(httpi, API, $q) {

        var service = {};

        service.uploadImage = uploadImage;

        return service;

        function uploadImage(file, callback) {
            var fd = new FormData();
            fd.append('image', file);

            return httpi({
                method: "post",
                url: API.imageUpload,
                data: fd,
                headers: { 'Content-Type': undefined }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

    }

})();
