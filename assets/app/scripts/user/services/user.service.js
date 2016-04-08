(function() {    
    'use strict';

    angular.module('app').factory('userService', userService);

    userService.$inject = ['httpi', 'API', '$localStorage', '$cookieStore', '$state'];

    function userService(httpi, API, $localStorage, $cookieStore, $state) {

        var service = {};

        service.getUserList = getUserList;
        service.getUserData = getUserData;
        service.addUser = addUser;
        service.editUser = editUser;

        return service;

        function getUserList(callback) {
            httpi({
                method: "get",
                url: API.user
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function getUserData(userId, callback) {
            httpi({
                method: "get",
                url: API.userDetails,
                params: {
                    id: userId
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function addUser(user, callback) {
            httpi({
                method: "post",
                url: API.user,
                data: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    profileImageUrl: user.profileImageUrl,
                    userGroupId: user.userGroupId
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function editUser(user, callback) {
            httpi({
                method: "put",
                url: API.user,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    profileImageUrl: user.profileImageUrl,
                    userGroupId: user.userGroups.id
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }

        function setStatus(userId, status, callback) {
            httpi({
                method: "put",
                url: API.userStatus,
                data: {
                    id: userId,
                    status: status
                }
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }



    }

})();
