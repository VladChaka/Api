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
	$scope.openProfile = function(event){
		var parent = event.currentTarget.parentNode.parentNode;
        var counter = parent.getElementsByClassName('user-counter')[0].getAttribute('value');
		var id = $scope.users.info[+counter]._id,
			username = $scope.users.info[+counter].username,
            email = $scope.users.info[+counter].email,
            post = $scope.users.info[+counter].post;
		    phone = $scope.users.info[+counter].phone,
            password = $scope.users.info[+counter].password,
            fullname = $scope.users.info[+counter].fullname,
			editForm = document.getElementById('includeEditForm').firstChild.cloneNode(true);
			editForm.style.display = "flex";
			editForm.getElementsByTagName("input")[1].value = id;
		    editForm.getElementsByTagName("input")[2].value = username;
			editForm.getElementsByTagName("input")[3].value = email;
			editForm.getElementsByTagName("input")[4].value = post;
			editForm.getElementsByTagName("input")[5].value = phone;
			editForm.getElementsByTagName("input")[6].value = password;
			editForm.getElementsByTagName("input")[7].value = fullname;
		    parent.appendChild(editForm);
		if (document.body.offsetHeight > window.innerHeight) {
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = '15px';
		};
	};
    $scope.submitAddForm = function(isValid){

        if (isValid){
            $.post('http://localhost:4000/user/add', $('#add').serialize(), function(response) {
				if (response.error !== undefined) {
					if (response.error === "This login duplicate") {
						document.getElementsByClassName('login-used')[0].style.display = "block";
					} else if (response.error === "This email duplicate") {
						document.getElementsByClassName('email-used')[0].style.display = "block";
					}
				} else {
					document.getElementsByClassName('login-used')[0].style.display = "none";
					document.getElementsByClassName('email-used')[0].style.display = "none";

					location.reload(true)
				}
            });	
        };
    };
});

usersApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});

