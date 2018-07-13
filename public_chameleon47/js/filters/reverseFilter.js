define(function() {
    var moduleReverseFilter = angular.module("moduleReverseFilter", []);

    moduleReverseFilter.filter('reverse', function() {
        return function(items) {
            if (items!==undefined) {
                return items.slice().reverse();
            }
        };
    });
});