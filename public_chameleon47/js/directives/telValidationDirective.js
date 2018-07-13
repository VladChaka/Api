define(function () {
    var validateModule = angular.module('validate', []);

    validateModule.directive('telValidation', function () {
        var isValid = function (s) {
            return s && /^[ 0-9]+$/.test(s);
        };
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    ngModelCtrl.$setValidity('correctNumber', isValid(viewValue));
                    return viewValue;
                });
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    ngModelCtrl.$setValidity('correctNumber', isValid(modelValue));
                    return modelValue;
                });
            }
        };
    });
});