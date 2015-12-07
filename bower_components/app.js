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
		.otherwise({
			templateUrl: 'views/404.html'
		});

	$locationProvider.html5Mode(true);
});

app.factory('Coaches', function ($resource) {
	var resourceResult = $resource('/api/coaches/:id', { id: '@id' }, {
	    'update': { method: 'PUT' }
	});
	return resourceResult;
});

app.factory('EmailList', function ($resource){
	var resourceResult = $resource('/api/mailing-list/:emailId', { emailId: '@emailId' });
	return resourceResult;
});

app.factory('CarouselItems', function($resource){
	var resourceResult = $resource('/api/carousel');
	return resourceResult;
});

app.factory('Page', function(){

	var descriptions = {
		homeDescription: 'Parkour and freerunning community, classes, and lessons in Scranton, Pennsylvania.',
		adultClassesDescription: 'Adult parkour and freerunning classes in Scranton, Pennsylvania.',
		kidsClassesDescription: 'Kids parkour and freerunning classes in Scranton, Pennsylvania.',
		privateLessonsDescription: 'Parkour and freerunning private lessons in Scranton, Pennsylvania.',
		coachesDescription: 'Parkour and freerunning coaches in Scranton, Pennsylvania.',
		contactDescription: 'Contact information for Parkour Endure in Scranton, Pennsylvania.'
	}
	var currentDescription = descriptions['homeDescription'];

	var backgroundImageClasses = {
		kidsClass: 'kids-class',
		adultClass: 'adult-class'
	}
	var currentBackground = '';

	return {
		description: function(){
			return currentDescription;
		},
		setDescription: function(newDescription){
			if(descriptions[newDescription]){
				currentDescription = descriptions[newDescription];
			}
			else{
				currentDescription = descriptions['homeDescription'];
			}
		},
		background: function(){
			return currentBackground;
		},
		setBackground: function(newBackground){
			if(backgroundImageClasses[newBackground]){
				currentBackground = backgroundImageClasses[newBackground];
			}
			else{
				currentBackground = '';
			}
		}
	};
});

app.factory('Login', function($resource){
	var resourceResult = $resource('/api/login');
	return resourceResult;
});

app.factory('Signup', function($resource){
	var resourceResult = $resource('/api/signup');
	return resourceResult;
});

app.controller('MainController', function($scope, Page){
	$scope.Page = Page;
});

app.controller('HomeController', function($scope, $location, Page){
	Page.setDescription('homeDescription');
	Page.setBackground('');
	$scope.url = $location.absUrl();
});

app.controller('AdultClassesController', function($scope, Page){
	Page.setDescription('adultClassesDescription');
	Page.setBackground('adultClass');
});

app.controller('KidsClassesController', function($scope, Page){
	Page.setDescription('kidsClassesDescription');
	Page.setBackground('kidsClass');
});

app.controller('PrivateLessonsController', function($scope, Page){
	Page.setDescription('privateLessonsDescription');
	Page.setBackground('');
});

app.controller('CoachesController', function($scope, Coaches, Page){
	Page.setDescription('coachesDescription');
	Page.setBackground('');
	$scope.coaches = Coaches.query();
	$scope.selected = {index:0};
});

app.controller('ContactController', function($scope, Page){
	Page.setDescription('contactDescription');
	Page.setBackground('');
});

app.controller('EmailListController', function($scope, $http, $timeout, EmailList){
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

app.controller('LoginController', function($scope, Login){
	$scope.newLogin = new Login();

	$scope.attemptLogin = function(){
		$scope.newLogin.$save();
	};
});

app.controller('SignUpController', function($scope, Signup){
	$scope.newSignup = new Signup();

	$scope.attemptSignup = function(){
		$scope.newSignup.$save();
	}
});