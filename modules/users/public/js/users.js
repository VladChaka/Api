
var usersApp = angular.module("usersApp", []);

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
    $scope.currentPage = 0;
    $scope.pageSize=15;
    $scope.numberOfPages=function () {
        return Math.ceil($scope.users.info.length/$scope.pageSize);
    }

});
usersApp.filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});

function show(element, id) {
    document.getElementById(element).style.display = "flex";
    document.getElementById("popupsContainer").style.display = "flex";
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
    };
};
function showEditForm(ths) {
    var y = ths.parentNode.parentNode;
    y.getElementsByClassName('user-profile-container')[0].style.display = "flex";
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
    };
};
function hideEditForm(ths) {
    var y = ths.parentNode.parentNode.parentNode;
    y.getElementsByClassName('user-profile-container')[0].style.display = "none";
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0';
    };
};
function hide(element) {
    element.parentNode.style.display = "none";
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
function deleteUser(user) {
	var id = user.parentNode.name;	
	id = "#"+id+"/";
	console.log(id);
	
	
	$.post('http://localhost:4001/user/delete', $(id).serialize(), function (response) {
		console.log(response);
	});
    var x = user.parentNode.parentNode.parentNode.style.display = "none";
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
function addUser() {
	$.post('http://localhost:4001/user/add', $('#add').serialize(), function (response) {
		console.log(response);
	});
	// $(document).ready(function(){  
	// 	setInterval(show,1000);  
	// });
}

function updateUser(param) {
	console.log(param);
    var id = param.parentNode.parentNode.id.value;
	$.post('http://localhost:4001/user/update', $('#'+id).serialize(), function (response) {
		//console.log(response);
	});
}

  