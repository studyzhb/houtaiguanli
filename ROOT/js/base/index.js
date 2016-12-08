
var app=angular.module('myApp',['ngRoute']);


app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
			.when('/',{
				template:'暂时未处理'
			})
			.when('/first',{
				templateUrl:'templates/first.html'
			})
			.when('/plan',{
				templateUrl:'templates/plan.html'
			})
			.otherwise({redirectTo:'/'});

}])