
var usersApp = angular.module("usersApp", []);

// var getJSON = function(url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.responseType = 'json';
//     xhr.onload = function() {
//       var status = xhr.status;
//       if (status === 200) {
//         callback(null, xhr.response);
//       } else {
//         callback(status, xhr.response);
//       }
//     };
//     xhr.send();
// };

// getJSON('http://localhost:4001/view',
// function(err, data) {
//   if (err !== null) {
//     alert('Something went wrong: ' + err);
//   } else {
//     console.log(data);
//     nani = data;
//   }
// });

usersApp.controller('usersController', function($scope,$http) {
    $scope.addElement = function(element){
        var cell = document.getElementById(element).content.cloneNode(true);
        addedTemplates.appendChild(cell);
    };

    $http.get('database.json').then( function(response) {
        $scope.users = {
            info: response.data
        };
    });

    /*
        $scope.template = {
            templateId: "afaf ",
            templateName: "aaff",
            fullInfo: function() {
                var templateObject;
                templateObject = $scope.template;
                return templateObject.templateId + " " + templateObject.templateName;
            }
        };
        $scope.addBtn = function(){
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
function show(element, id) {
    console.log(id);
    
    document.getElementById(element).style.display = "flex";
    document.getElementById("popupsContainer").style.display = "flex";
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
    }
}
function hide(element) {
    element.parentNode.style.display = "none";
    document.getElementById("popupsContainer").style.display = "none";
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
}
function hideEdit(){
    document.getElementById("EditForm").style.display = "none";
    document.getElementById("popupsContainer").style.display = "none";
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
}
document.getElementById("orderPopup").style.display = "none";
function showHideOrders() {
    var toggle = document.getElementById("orderPopup").style.display;
    if (toggle == "none") {
        document.getElementById("orderPopup").style.display = "flex";
    } else{
        document.getElementById("orderPopup").style.display = "none";
    }
}
var activeFiltler = document.getElementsByClassName('filters-order-active');
function filterByRating() {
   var rating = document.getElementsByClassName('list-user-rating');
   var date = document.getElementsByClassName('list-user-date');
   for (i=0;i<date.length;i++){
       date[i].style.display = "none";
   }
   for (i=0;i<rating.length;i++){
        rating[i].style.display = "block";
   }
   activeFiltler[0].innerHTML ="By Rating";
    showHideOrders();
}
function filterByDate() {
    var rating = document.getElementsByClassName('list-user-rating');
    var date = document.getElementsByClassName('list-user-date');
    for (i=0;i<rating.length;i++){
        rating[i].style.display = "none";
    }
    for (i=0;i<date.length;i++){
        date[i].style.display = "block";
    }
    activeFiltler[0].innerHTML ="By Date";
    showHideOrders();
}