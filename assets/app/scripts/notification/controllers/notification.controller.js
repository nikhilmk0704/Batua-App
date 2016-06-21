angular.module('app').controller('notificationController', ['$state', 'notificationService', 'toastr',

    function($state, notificationService, toastr) {

        var vm = this;

        notificationService.getActiveMobileUsers(function(response) {
            if (response.status === 200) {
                vm.mobileUsers = response.data;
                vm.checkAll();
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

        vm.pushNotification = function(notificationMessage) {

            vm.listOfUsersId = [];
            var notificationData = {};
            angular.forEach(vm.mobileUsers, function(item) {
                if (item.selected) vm.listOfUsersId.push(item.id);
            });
            notificationData.users = vm.listOfUsersId;
            notificationData.message = notificationMessage;
            if (notificationData.users.length > 0) {
                notificationService.sendNotification(notificationData, function(response) {
                    if (response.status === 200) {
                        $state.go('notification');
                        return toastr.success('Notification has been sent successfully to all selected users.');
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
            } else {
                return toastr.error('Please select at least one user!');
            }
        };

        vm.checkAll = function() {
            if (vm.selectedAll) {
                vm.selectedAll = true;
            } else {
                vm.selectedAll = false;
            }
            angular.forEach(vm.mobileUsers, function(item) {
                item.selected = vm.selectedAll;
            });
        };

    }
]);
