define([], function() {
    var moduleStartFromFilter = angular.module("moduleStartFromFilter", []);

    moduleStartFromFilter.filter('startFrom', function () {
        return function (input, start) {
            start = +start;
            if (input !== undefined) {
                return input.slice(start);
            }
        }
    });
});