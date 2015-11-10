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

	$sql = "SELECT * FROM movie";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$movies = array();
		while($row = $result->fetch_assoc()) {
			array_push($movies,$row);
		}
		echo json_encode($movies);
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


$app->run();
$conn->close();
