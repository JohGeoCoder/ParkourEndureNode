var app = angular.module('ParkourEndureApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when('/home', {
			controller: 'HomeController',
			templateUrl: 'views/home.html'
		})
		.when('/classes', {
			controller: 'ClassesController',
			templateUrl: 'views/classes.html'
		})
		.when('/private-lessons', {
			controller: 'PrivateLessonsController',
			templateUrl: 'views/privateLessons.html'
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
			redirectTo: '/home'
		});

	$locationProvider.html5Mode(true);
});

app.controller('HomeController', function($scope){

});

app.controller('ClassesController', function($scope){

});

app.controller('PrivateLessonsController', function($scope){

});

app.controller('CoachesController', function($scope){

});

app.controller('ContactController', function($scope){

});