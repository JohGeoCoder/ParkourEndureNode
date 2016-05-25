(function() {
	var FunctionContainer = function(){
		var init = function(){
			$(document).foundation();
		};
		
		return{
			init:init,
		};
	};
	
	$(function() {
		GlobalFunctions = FunctionContainer();
		GlobalFunctions.init();
	});
	
})();

var app = angular.module('ParkourEndureApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when('/', {
			controller: 'HomeController',
			templateUrl: 'views/home.html'
		})
		.when('/adult-classes', {
			controller: 'AdultClassesController',
			templateUrl: 'views/adult-classes.html'
		})
		.when('/kids-classes', {
			controller: 'KidsClassesController',
			templateUrl: 'views/kids-classes.html'
		})
		.when('/private-lessons', {
			controller: 'PrivateLessonsController',
			templateUrl: 'views/private-lessons.html'
		})
		.when('/coaches', {
			controller: 'CoachesController',
			templateUrl: 'views/coaches.html'
		})
		.when('/contact', {
			controller: 'ContactController',
			templateUrl: 'views/contact.html'
		})
		.when('/admin/coach-list', {
			controller: 'CoachesController',
			templateUrl: 'views/admin/coach-list.html',
			resolve: {loggedIn:onlyLoggedIn}
		})
		.when('/admin/email-list', {
			controller: 'AdminEmailListController',
			templateUrl: 'views/admin/email-list.html',
			resolve: {loggedIn:onlyLoggedIn}
		})
		.when('/logout', {
			controller: 'LogoutController',
			templateUrl: 'views/home.html'
		})
		.otherwise({
			templateUrl: 'views/404.html'
		});

	$locationProvider.html5Mode(true);
});

app.factory('Coaches', function ($resource) {
	var resourceResult = $resource('/api/coaches/:id', { id: '@id' }, {
	    'create': { method: 'PUT' },
	    'update': { method: 'POST'}
	});
	return resourceResult;
});

app.factory('EmailList', function ($resource){
	var resourceResult = $resource('/api/mailing-list/:emailId', { emailId: '@emailId' });
	return resourceResult;
});

app.factory('AdminEmailList', function ($resource){
	var resourceResult = $resource('/api/admin/mailing-list/:emailId', {emailId: '@emailRemoveId'});
	return resourceResult;
});

app.factory('Page', function(){
	var currentBackground = '';
	var isLoggedIn = false;

	return {
		setLoggedIn: function(loggedIn){
			isLoggedIn = loggedIn;
		},
		isLoggedIn: function(){
			return isLoggedIn;
		}
	};
});

app.factory('Login', function($resource){
	var resourceResult = $resource('/api/login');
	return resourceResult;
});

app.factory('Logout', function($resource){
	var resourceResult = $resource('/api/logout');
	return resourceResult;
})

app.factory('Signup', function($resource){
	var resourceResult = $resource('/api/signup');
	return resourceResult;
});

app.factory('LoginStatus', function($resource){
	var resourceResult = $resource('/api/loginstatus');
	return resourceResult;
});

app.controller('MainController', function($scope, Page, LoginStatus){
	$scope.Page = Page;

	$scope.$on('$routeChangeSuccess', function () {
        LoginStatus.get().$promise.then(function(data){
        	Page.setLoggedIn(data.isLoggedIn);
        });
    });
});

app.controller('HomeController', function($scope, $location, Page){
	$scope.url = $location.absUrl();
});

app.controller('AdultClassesController', function($scope, Page){
	
});

app.controller('KidsClassesController', function($scope, Page){

});

app.controller('PrivateLessonsController', function($scope, Page){

});

app.controller('CoachesController', function($scope, Coaches, Page){
	$scope.coaches = Coaches.query();
	$scope.selected = {index:0};

	$scope.createNewCoach = function(){
		var newCoach = new Coaches();
		newCoach.$create(function(data, headers){
			$scope.coaches = Coaches.query();
		});
	};

	$scope.updateCoach = function(){
		var selectedCoach = $scope.coaches[$scope.selected.index];
		var newCoach = new Coaches();
		newCoach.objectId = selectedCoach._id;
		newCoach.firstName = selectedCoach.firstName;
		newCoach.lastName = selectedCoach.lastName;
		newCoach.imageUrl = selectedCoach.imageUrl;
		newCoach.details = selectedCoach.details;

		if(newCoach.firstName && newCoach.lastName && newCoach.details){
			newCoach.$save(function(data, headers){
				$scope.coaches = Coaches.query();
			});
		}
	}
});

app.controller('ContactController', function($scope, Page){
	
});

app.controller('AdminEmailListController', function($scope, $http, AdminEmailList){
	$scope.adminEmailList = new AdminEmailList();
	$scope.emails = AdminEmailList.query();

	$scope.emailIdToRemove = '';

	$scope.removeEmail = function(removeEmailId){
		if(removeEmailId){
			$scope.adminEmailList.emailRemoveId = removeEmailId;
			$scope.adminEmailList.$delete({'emailRemoveId' : $scope.adminEmailList.emailRemoveId}, function(data, headers){
				if(data['success'] === true){
					$scope.emails = AdminEmailList.query();
				}
			});

			$scope.resetEmailIdToRemove();
		}
	};

	$scope.setEmailIdToRemove = function(emailId){
		if(emailId){
			$scope.emailIdToRemove = emailId;
		} else{
			$scope.resetEmailIdToRemove();
		}
	};

	$scope.resetEmailIdToRemove = function(){
		$scope.emailIdToRemove = '';
	};
});

app.controller('EmailListController', function($scope, $http, EmailList){
	$scope.newEmail = new EmailList();

	$scope.submitEmail = function(){
		if($scope.newEmail.email){
			$scope.newEmail.$save(function(data, headers){
				$scope.newEmail.submittedEmail = data['email'];
				$scope.newEmail.submittedEmailId = data['_id'];
				$scope.newEmail.email = '';
			});
		}		
	};

	$scope.undoEmailSubmit = function(){
		$scope.newEmail.$delete({'emailId':$scope.newEmail.submittedEmailId}, function(data, headers){
			if(data['result'] == 'success'){
				$scope.newEmail.submittedEmail = '';
				$scope.newEmail.submittedEmailId = '';
			} else{
				$scope.newEmail.undoFailMessage = 'The system was unable to remove your email address. Please go to the Contact Us page and send us an email.'
			}
		});
	};

	$scope.acceptEmailSubmit = function(){
		$scope.newEmail.submittedEmail = '';
		$scope.newEmail.submittedEmailId = '';
	};
});

app.controller('LoginController', function($scope, Login, LoginStatus, Page){
	$scope.newLogin = new Login();

	$scope.attemptLogin = function(){
		$scope.newLogin.$save(function(data){
			if(data['success']){
				$('#loginModal').foundation('reveal', 'close');
				LoginStatus.get().$promise.then(function(data){
					Page.setLoggedIn(data.isLoggedIn);
				});
			}
		});
	};
});

app.controller('LogoutController', function($scope, Logout, Page, LoginStatus){
	Logout.get();
	LoginStatus.get().$promise.then(function(data){
		$('#loginModal').foundation('reveal', 'close');
		Page.setLoggedIn(data.isLoggedIn);
	});
})

app.controller('SignUpController', function($scope, Signup){
	$scope.newSignup = new Signup();

	$scope.attemptSignup = function(){
		$scope.newSignup.$save(function(data){
		});
		$scope.newSignup = new Signup();
	}
});

var onlyLoggedIn = function (LoginStatus, $location) {

	LoginStatus.get().$promise.then(function(data){
		if(!data.isLoggedIn){
			$location.url('/');
		}
	});
};