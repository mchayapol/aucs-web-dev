'use strict';

angular.module('movieApp.services', ['ngResource'])
.service('Movies', function($resource) {
  // CRUD operations
  var self = this;
  var movies = $resource('http://localhost/api/movies/:id',{id: '@id'},
	  { 'get':    {method:'GET'},
		'create': {method:'POST'},
		'query':  {method:'GET', url: 'http://localhost/api/movies', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'} 
	}
  );

  self.all = function() {
	  return movies.query();
  }

  self.add = function(newMovie) {
	  console.log(newMovie);
	  var res = movies.create( newMovie );
	  res.$promise.then(
		  function() {
		  console.log('Done');
	  }
		  );

  };

  self.delete = function(movieName) {
	for(var index in movies) {
		var m = movies[index];
		if (m.name == movieName)
		{
			movies.splice(index,1);	// delete an item in the array
			return;
		}
	}
  };

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

  self.update = function(originalName, newMovie) {
	for(var index in movies) {
		var m = movies[index];
		if (m.name == originalName)
		{			
			movies[index] = newMovie;
		}
	}
  }

  return self;
});