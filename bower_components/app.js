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
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);
});

app.factory('Coaches', function ($resource) {
	var resourceResult = $resource('/api/coaches/:id', { id: '@id' }, {
	    'update': { method: 'PUT' }
	});
	return resourceResult;
});

app.factory('Page', function(){
	var titles = {
		homeTitle: 'Parkour Endure - A community for the Scranton area',
		classesTitle: 'Parkour Endure - Classes in the Scranton area',
		privateLessonsTitle: 'Parkour Endure - Private lessons in the Scranton area',
		coachesTitle: 'Parkour Endure - Coaches in the Scranton area',
		contactTitle: 'Parkour Endure - Contact details'
	};
	var currentTitle = titles['homeTitle'];
	return {
		title: function(){
			return currentTitle;
		},
		setTitle: function(newTitle){
			if(titles[newTitle]){
				currentTitle = titles[newTitle];
			}
			else{
				currentTitle = titles['homeTitle'];
			}
		}
	};
})

app.controller('MainController', function($scope, Page){
	$scope.Page = Page;
});

app.controller('HomeController', function($scope, $location, Page){
	Page.setTitle('hometitle');
	$scope.url = $location.absUrl();
});

app.controller('ClassesController', function($scope, Page){
	Page.setTitle('classesTitle');
});

app.controller('PrivateLessonsController', function($scope, Page){
	Page.setTitle('privateLessonsTitle');
});

app.controller('CoachesController', function($scope, Coaches, Page){
	Page.setTitle('coachesTitle');
	$scope.coaches = Coaches.query();
	$scope.selected = {index:0};
});

app.controller('ContactController', function($scope, Page){
	Page.setTitle('contactTitle');
});

app.controller('CarouselController', function($scope, $http, $timeout){
	$scope.carouselItems = [];
	
	$http.get('/api/carousel')
	.success(function(data, status, headers, config){
		$scope.carouselItems = data;
		
		//This is required to run Slick after Angular renders the view.
		$timeout(function () { $scope.runSlickOnCarousel(data); }, 0); //0ms timeout
	})
	.error(function(data, status, headers, config){
		$scope.carouselItems = [];
	});
	
	$scope.runSlickOnCarousel = function()
    {
		$('.image-carousel').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
		});
    };
});