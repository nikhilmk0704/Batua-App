angular.module('app').directive('compareTo', function() {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: '=compareTo'
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                var val1 = modelValue;
                var val2 = scope.otherModelValue;
                return val1 + val2 === 100;
            };
            scope.$watch('otherModelValue', function() {
                ngModel.$validate();
            });
        }
    };
});
