'use strict';

var app = angular.module('movieApp', ['movieApp.services']);

app.controller('MovieCtrl', function($scope, Movies) {

	$scope.greeting = "Hello How Are You";
	$scope.movies = Movies.all();

	$scope.add = function() {
		var newMovie = angular.copy( $scope.movie );
		Movies.add( newMovie );
		$scope.movie = {};
	}

	$scope.delete = function(id) {
		if (confirm("Are you sure to delete?"))
		{
			Movies.delete( id );
		}
	}

	$scope.edit = function( id ) {
		$scope.editMode = true;
		$scope.movie = Movies.get( id );
	}

	$scope.update = function( id ) {
		$scope.editMode = false;
		Movies.update( id , $scope.movie);
	}
});