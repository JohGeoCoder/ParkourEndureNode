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

app.factory('Coaches', function ($resource) {
  return $resource('/api/coaches/:id', { id: '@id' }, {
    'update': { method: 'PUT' }
  });
});

app.controller('HomeController', function($scope){

});

app.controller('ClassesController', function($scope){

});

app.controller('PrivateLessonsController', function($scope){

});

app.controller('CoachesController', function($scope, Coaches, $http){
	$scope.coaches = Coaches.query();
	var i = 1;

	// $scope.selected = {index:0};
		
	// $scope.updateSelectedCoach = function(index){
	// 	$scope.selected.index = index;
	// };
	
	// $http.get('/api/coaches')
	// .success(function(data, status, headers, config){
	// 	$scope.coaches = data;
	// })
	// .error(function(data, status, headers, config){
	// 	$scope.coaches = [];
	// });
	
	// var i = 10;
});

app.controller('ContactController', function($scope){

});