'use strict';

angular.module('movieApp.services', ['ngResource'])
.service('Movies', function($resource) {
  // CRUD operations
  var self = this;
  var movies = $resource('http://localhost/api/movies/:id',{id: '@id'},
	  { 'get':    {method:'GET'},
<<<<<<< HEAD
		'create': {method:'POST', url: 'http://localhost/api/movies'},
		'query':  {method:'GET', url: 'http://localhost/api/movies', isArray:true},
		'remove': {method:'DELETE'},
		'update': {method:'PUT'} 
=======
		'create': {method:'POST'},
		'query':  {method:'GET', url: 'http://localhost/api/movies', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'} 
>>>>>>> de1b3bd5751b3ee3489f7cdf832c5812805a585f
	}
  );

  self.all = function() {
	  return movies.query();
  }

  self.add = function(newMovie) {
	  console.log(newMovie);
<<<<<<< HEAD
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
=======
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
>>>>>>> de1b3bd5751b3ee3489f7cdf832c5812805a585f

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

<<<<<<< HEAD

=======
  self.update = function(originalName, newMovie) {
	for(var index in movies) {
		var m = movies[index];
		if (m.name == originalName)
		{			
			movies[index] = newMovie;
		}
	}
  }
>>>>>>> de1b3bd5751b3ee3489f7cdf832c5812805a585f

  return self;
});