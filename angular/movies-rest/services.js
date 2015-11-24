'use strict';

angular.module('movieApp.services', ['ngResource'])
.service('Movies', function($resource) {
  // CRUD operations
  var self = this;
  var movies = $resource('http://localhost/api/movies/:id',{id: '@id'},
	  { 'get':    {method:'GET'},
		'create': {method:'POST', url: 'http://localhost/api/movies'},
		'query':  {method:'GET', url: 'http://localhost/api/movies', isArray:true},
		'remove': {method:'DELETE'},
		'update': {method:'PUT'} 
	}
  );

  self.all = function() {
	  return movies.query();
  }

  self.add = function(newMovie) {
	  console.log(newMovie);
	  movies.create( newMovie );
  };

  self.delete = function(movieId) {
	  movies.remove( {id: movieId} );
  };

  self.get = function(movieId) {
	  return movies.get({id: movieId});
  }

  self.update = function(movieId, newMovie) {
	  movies.update({id: movieId}, newMovie);
  }

  self.getByName = function(movieName) {
	for(var index in movies) {
		var m = movies[index];
		if (m.name == movieName)
		{			
			return m;
		}
	}
	return {};
  };



  return self;
});