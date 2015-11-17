'use strict';

angular.module('movieApp.services', [])
.service('Movies', function() {
  // CRUD operations
  var self = this;
  var movies = [];

  self.all = function() {
	  return movies;
  }

  self.add = function(newMovie) {
	  movies[movies.length] = newMovie;
  }

  self.delete = function(movieName) {
	for(var index in movies) {
		var m = movies[index];
		if (m.name == movieName)
		{
			movies.splice(index,1);	// delete an item in the array
			return;
		}
	}
  }

  return self;
});