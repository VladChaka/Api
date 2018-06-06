
var templateApp = angular.module("templateApp", []);
var addedTemplates = document.getElementById('addedTemplates');
templateApp.controller('templateController', function($scope,$http) {
    $scope.addElement = function(element){
        var cell = document.getElementById(element).content.cloneNode(true);
        addedTemplates.appendChild(cell);
    };
    $scope.template = {
        templateId: "afaf ",
        templateName: "aaff",
        fullInfo: function() {
            var templateObject;
            templateObject = $scope.template;
            return templateObject.templateId + " " + templateObject.templateName;
        }
    };
    var url = "data.txt";

    $http.get(url).then( function(response) {
        $scope.template = {
            elements: response.data
        };
    });
    /*$scope.addBtn = function(){
        var btns = document.getElementsByClassName("addBtn");
        console.log(btns.length);
        for (var i = 0; i < btns.length; i++) {
            var nani = btns[i].name;
            console.log(btns[i].innerHTML);
            btns[i].innerHTML = 'omae';
        };
           el.setAttribute("ng-click", "NewClick()");
         compile(el);
    };*/
});
function cleanTemplates(){
    document.getElementById("addedTemplates").innerHTML = " ";
}