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

<<<<<<< HEAD
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
=======
	$scope.delete = function(name) {
		if (confirm("Are you sure to delete "+name+"?"))
		{
			Movies.delete( name );
		}
	}

	$scope.edit = function(name) {
		$scope.editMode = true;
		$scope.movie = angular.copy( Movies.getByName(name) );
		$scope.movie['originalName'] = $scope.movie.name;
	}

	$scope.update = function(originalName) {
		$scope.editMode = false;
		Movies.update(originalName, $scope.movie);
>>>>>>> de1b3bd5751b3ee3489f7cdf832c5812805a585f
	}
});