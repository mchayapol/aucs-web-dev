<?php
require '../mysql/db.php';
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$app = new \Slim\Slim();

$app->get('/', function () {
    echo "Movie API";
});

// Get all movies in JSON
$app->get('/api/movies', function () use ($app,$conn) {
	$app->response->headers->set("Access-Control-Allow-Origin","*");
	$app->response->headers->set("Content-Type","application/json; charset=UTF-8");

	$sql = "SELECT * FROM movie ORDER BY name";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$movies = array();
		while($row = $result->fetch_assoc()) {
			array_push($movies,$row);
		}
		echo json_encode($movies);
	} else {
		echo json_encode(
			array(
				'status' => 501,
				'message' => 'Server Error'
			)
		);
	}
});

// Get update a movie
$app->put('/api/movies/:id', function($id) use ($app, $conn) {
	$app->response->headers->set("Access-Control-Allow-Origin","*");
	$app->response->headers->set("Content-Type","application/json; charset=UTF-8");

	$updateMovieInfo = json_decode( $app->request->getBody() );
	$name = $updateMovieInfo->name;
	$description = $updateMovieInfo->description;

	if (isset($updateMovieInfo->rating)) {
		$rating = $updateMovieInfo->rating;
	} else {
		$rating = "rating";
	}

	if (isset($updateMovieInfo->cover_image)) {
		$cover_image = "'". $updateMovieInfo->cover_image . "'";
	} else {
		$cover_image = "cover_image";
	}

	$sql = "UPDATE movie SET
			name = '$name'
			, description = '$description'
			, rating = $rating
			, cover_image = $cover_image
			WHERE id = $id";

	$result = $conn->query($sql);
	if ($result == true) {
		echo json_encode(array(
			'status' => 200,
			'message' => 'Updated'
		));
	} else {
		echo json_encode(array(
			'status' => 501,
			'message' => 'Server Error'
		));
	}
});

// Delete a movie
$app->delete('/api/movies/:id', function($id) use($app,$conn) {  
	$app->response->headers->set("Access-Control-Allow-Origin","*");
	$app->response->headers->set("Content-Type","application/json; charset=UTF-8");
	
	$sql = "DELETE FROM movie WHERE id = $id";
	$result = $conn->query($sql);
	if ($result == true) {
		echo json_encode(array(
			'status' => 200,
			'message' => 'Deleted'
		));
	} else {
		echo json_encode(array(
			'status' => 501,
			'message' => 'Server Error'
		));
	}
} );


$app->post('/api/movies', function() use($app,$conn){
	$app->response->headers->set("Access-Control-Allow-Origin","*");
	$app->response->headers->set("Content-Type","application/json; charset=UTF-8");

	$newMovie = json_decode( $app->request->getBody() );
	$name = $newMovie->name;
	$description = $newMovie->description;

	$sql = "INSERT INTO movie (name,description) VALUES ('$name','$description')";

	$result = $conn->query($sql);

	if ($result == true) {
		echo json_encode(array(
			'status' => 200,
			'message' => 'Added'
		));
	} else {
		echo json_encode(array(
			'status' => 501,
			'message' => 'Server Error'
		));
	}
});



$app->get('/api/movies/:id', function ($id) use ($app,$conn) {
	$app->response->headers->set("Access-Control-Allow-Origin","*");
	$app->response->headers->set("Content-Type","application/json; charset=UTF-8");

	$sql = "SELECT * FROM movie WHERE id = $id";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		echo json_encode( $result->fetch_assoc() );
	} else {
		echo json_encode(array(
			'status' => 501,
			'message' => 'Server Error'
		));
	}
});

// List all comments
$app->get('/api/comments',function () use ($app,$conn) {
	$app->response->headers->set("Access-Control-Allow-Origin","*");
	$app->response->headers->set("Content-Type","application/json; charset=UTF-8");

	$sql = "SELECT * FROM comment";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$movies = array();
		while($row = $result->fetch_assoc()) {
			array_push($movies,$row);
		}
		echo json_encode($movies);
	} else {
		echo json_encode(
			array(
				'status' => 501,
				'message' => 'Server Error'
			)
		);
	}
});


// Get the comment of the given id
$app->get('/api/comments/:id',function ($id) use ($app,$conn) {
	$app->response->headers->set("Access-Control-Allow-Origin","*");
	$app->response->headers->set("Content-Type","application/json; charset=UTF-8");

	$sql = "SELECT * FROM comment WHERE id = $id";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		echo json_encode( $result->fetch_assoc() );
	} else {
		echo json_encode(array(
			'status' => 501,
			'message' => 'Server Error'
		));
	}
});

// Get the comment of the movie, given id
$app->get('/api/comments/movie/:mid',function ($mid) use ($app,$conn) {
	$app->response->headers->set("Access-Control-Allow-Origin","*");
	$app->response->headers->set("Content-Type","application/json; charset=UTF-8");

	$sql = "SELECT * FROM comment WHERE mid = $mid";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		echo json_encode( $result->fetch_assoc() );
	} else {
		echo json_encode(array(
			'status' => 501,
			'message' => 'Server Error'
		));
	}
});

$app->run();
$conn->close();
