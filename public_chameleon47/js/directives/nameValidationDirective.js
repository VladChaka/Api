define(function () {
    var validateModule = angular.module('validate', []);

    validateModule.directive('nameValidation', function () {
        var isValid = function (s) {
            return s && /^[a-zA-Z\s]+$/.test(s) || /^[А-Яа-яЁё\s]+$/.test(s);
        };
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    ngModelCtrl.$setValidity('realName', isValid(viewValue));
                    return viewValue;
                });
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    ngModelCtrl.$setValidity('realName', isValid(modelValue));
                    return modelValue;
                });
            }
        };
    });
})