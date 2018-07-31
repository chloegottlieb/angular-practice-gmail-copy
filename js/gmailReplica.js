function TestCtrl($scope) {
	$scope.firstName = 'john';
	$scope.lastName = 'doe';
	$scope.cost = 1;
	$scope.quantity = 2;
	$scope.total = 3
	$scope.budget = 4;
};

var app = angular.module('EmailApp', [
	'ngRoute'
	]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/inbox', {
			templateUrl: 'views/inbox.html',
			controller: 'InboxCtrl',
			controllerAs: 'inbox'
		})
		.when('/inbox/email/:id', {
			templateUrl: 'views/email.html',
			controller: 'EmailCtrl',
			controllerAs: 'email'
		})
		.otherwise({
			redirectTo: '/inbox'
		});
});

app.factory('InboxFactory', function InboxFactory ($http) {
	var exports = {};

	exports.getMessages = function() {
		return $http.get('json/emails.json')
		.error(function(data) {
			console.log('There was an error!', data);
		});
	};
	return exports;
});

app.controller('InboxCtrl', function($scope, InboxFactory) {
	InboxFactory.getMessages()
		.success(function(jsonData, statusCode) {
			console.log('The request was successful!', statusCode, jsonData)
			$scope.emails = jsonData
		})
});
