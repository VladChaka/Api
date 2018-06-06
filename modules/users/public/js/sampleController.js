
sampleApp.controller('sampleController', function($scope) {
    $scope.addElement = function(element){
        var cell = document.getElementById(element).content.cloneNode(true);
        addedTemplates.appendChild(cell);
    };

});