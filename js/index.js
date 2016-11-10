var app=angular.module('myApp',['ngRoute']);
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
			.when('/organ',{
				templateUrl:'templates/organization.html',
				controller:'organController'
				})
			.when('/user',{
				templateUrl:'templates/organ-input.html'
			})
			.otherwise({redirectTo:'/organ'});

}])
.controller('organController', ['$scope','$location', function($scope,$location){
	
}])