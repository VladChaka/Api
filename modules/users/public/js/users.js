var usersApp = angular.module("usersApp", []);

usersApp.controller('usersController', function($scope, $http) {
    $scope.addElement = function(element) {
        var cell = document.getElementById(element).content.cloneNode(true);
        addedTemplates.appendChild(cell);
    };

    $http.get('database.json').then(function(response) {
        $scope.users = {
            info: response.data
        };
    });
    $scope.counter = 0;
    $scope.currentPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
        return Math.ceil($scope.users.info.length / $scope.pageSize);
	}
	$scope.openProfile = function(event, place, id){
		console.log(event.currentTarget);
		var parent = event.currentTarget.parentNode.parentNode;
		var popup = parent.getElementsByClassName('user-profile-container')[0];
		popup.style.display = "flex";
		console.log($scope.users.info[0].username);
/*		popup.innerHTML = '<div class="user-profile">\n' +
            '\t<div class="close-editform" onclick="hideEditForm(this)">+</div>\n' +
            '\t<form class="user-edit" name="EditForm" id="{{user._id}}" ng-submit="submitEditForm(EditForm.$valid)"  novalidate>\n' +
            '\t\t<input type="hidden" name="_method" value="PUT" placeholder="id" required>\n' +
            '\t\t<input type="hidden" name="id" value="{{user._id}}" placeholder="id" required>\n' +
            '\t\t<div><span>Username</span><input ng-class="{ \'invalid\' : EditForm.username.$invalid && !EditForm.username.$pristine }" value="" name="username" ng-minlength="4" ng-maxlength="16" type="text" placeholder="Enter username" ng-model="object.propety">\n' +
            '\t\t</div>\n' +
            '\t\t<p ng-show="EditForm.username.$invalid && !EditForm.username.$pristine">You name is required.</p>\n' +
            '\t\t<p ng-show="EditForm.username.$error.minlength">Username is too short.</p>\n' +
            '\t\t<p ng-show="EditForm.username.$error.maxlength">Username is too long.</p>\n' +
            '\t\t<div><span>E-mail</span><input ng-class="{ \'invalid\' : EditForm.email.$invalid && !EditForm.email.$pristine }" value="{{user.email}}" name="email" ng-model="user.email" type="email" placeholder="Enter email"> </div>\n' +
            '\t\t<p ng-show="EditForm.email.$invalid && !EditForm.email.$pristine">Enter a valid email.</p>\n' +
            '\t\t<div><span>Post</span><input ng-class="{ \'invalid\' : EditForm.post.$error.required && EditForm.post.$dirty }" value="{{user.post}}" ng-required="true" type="text" name="post" ng-model="user.post" placeholder="User post"> </div>\n' +
            '\t\t<p ng-show="EditForm.post.$error.required && EditForm.post.$dirty">Enter a user post.</p>\n' +
            '\t\t<div><span>Phone</span><input ng-class="{ \'invalid\' : EditForm.phone.$error.required && !EditForm.phone.$error.tel && EditForm.phone.$dirty }" value="{{user.phone}}"  ng-minlength="7" ng-maxlength="13" name="phone" type="tel" ng-required="true" ng-model="user.phone" placeholder="Enter phone number"> </div>\n' +
            '\t\t<p ng-show="EditForm.phone.$error.required && !EditForm.phone.$error.tel && EditForm.phone.$dirty">Enter valid phone number.</p>\n' +
            '\t\t<p ng-show="EditForm.phone.$error.minlength || EditForm.phone.$error.maxlength">Enter a correct length phone.</p>\n' +
            '\n' +
            '\t\t<div><span>Password</span><input ng-class="{ \'invalid\' : EditForm.password.$invalid && !EditForm.password.$pristine }" value="{{user.password}}"  name="password" ng-model="user.password" ng-minlength="8" type="password" placeholder="Enter password"> </div>\n' +
            '\t\t<p ng-show="EditForm.password.$invalid && !EditForm.password.$pristine ">Password is required.</p>\n' +
            '\t\t<p ng-show="EditForm.password.$error.minlength">Password is too short.</p>\n' +
            '\t\t<div><span>Full name</span><input ng-class="{ \'invalid\' : EditForm.fullname.$invalid && !EditForm.fullname.$pristine}" value="{{user.fullname}}" ng-required="true" name="fullname" ng-model="user.fullname" type="text" placeholder="Full name of user"> </div>\n' +
            '\t\t<p ng-show="EditForm.fullname.$error.required && !EditForm.fullname.$error.text && EditForm.fullname.$dirty">Enter full name.</p>\n' +
            '\t\t<div class="user-edit-btn">\n' +
            '\t\t\t<button type="submit" ng-disabled="EditForm.$invalid" onclick="updateUser(this)">Edit user <span>✓</span></button>\n' +
            '\t\t</div>\n' +
            '\t</form>\n' +
            '</div>' */
		if (document.body.offsetHeight > window.innerHeight) {
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = '15px';
		};
	}
    $scope.submitEditForm = function(isValid){
        if(isValid){

        }
    }
    $scope.submitAddForm = function(isValid){

        if (isValid){
            $.post('http://localhost:4001/user/add', $('#add').serialize(), function(response) {
				console.log(response);
				if (response.error !== undefined) {
					console.log(response.error);
				} else {
					console.log(response.success);
				}
            });
            var x = document.getElementById('AddForm');
            console.log(x);
            document.getElementById("popupsContainer").style.display = "none";
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0';
        };
    };
});

usersApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});
function updateUser(param) {
    console.log(param);
    var id = "#" + param.parentNode.parentNode.id.value;
    $.post('http://localhost:4001/user/update', $(id).serialize(), function(response) {
        console.log(response);
    });
    var y = param.parentNode.parentNode.parentNode.parentNode.parentNode;
    y.getElementsByClassName('user-profile-container')[0].style.display = "none";
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0';
    };
}
function show(element, id) {
    document.getElementById(element).style.display = "flex";
    document.getElementById("popupsContainer").style.display = "flex";
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
    } else {
        document.getElementById("orderPopup").style.display = "none";
    }
}
var activeFiltler = document.getElementsByClassName('filters-order-active');

function filterByRating() {
    var rating = document.getElementsByClassName('list-user-rating');
    var date = document.getElementsByClassName('list-user-date');
    for (i = 0; i < date.length; i++) {
        date[i].style.display = "none";
    }
    for (i = 0; i < rating.length; i++) {
        rating[i].style.display = "block";
    }
    activeFiltler[0].innerHTML = "By Rating";
    showHideOrders();
}

function deleteUser(user) {
    var id = "." + user.parentNode.id.value;
    $.post('http://localhost:4001/user/delete', $(id).serialize(), function(response) {
        console.log(response);
    });
    var x = user.parentNode.parentNode.parentNode.style.display = "none";
}

function filterByDate() {
    var rating = document.getElementsByClassName('list-user-rating');
    var date = document.getElementsByClassName('list-user-date');
    for (i = 0; i < rating.length; i++) {
        rating[i].style.display = "none";
    }
    for (i = 0; i < date.length; i++) {
        date[i].style.display = "block";
    }
    activeFiltler[0].innerHTML = "By Date";
    showHideOrders();
}
