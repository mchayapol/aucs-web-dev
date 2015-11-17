'use strict';

var app = angular.module('movieApp', ['movieApp.services']);

app.controller('MovieCtrl', function($scope, Movies) {

	$scope.greeting = "Hello How Are You";
	$scope.movies = Movies.all();

	$scope.add = function() {
		var newMovie = {
			name: $scope.name,
			description: $scope.description,
			rating: $scope.rating
		}
		Movies.add( newMovie );
	}
});