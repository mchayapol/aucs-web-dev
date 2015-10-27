<?php
require 'db.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Pre-processing
if ( isset($_POST['cmd']) && $_POST['cmd'] == 'add') {
	// Do the adding!
	$name = mysqli_real_escape_string($conn, $_POST['name']);
	$description = mysqli_real_escape_string($conn, $_POST['description']);
	$rating = mysqli_real_escape_string($conn, $_POST['rating']);
	$cover_image = mysqli_real_escape_string($conn, $_POST['cover_image']);

	$sql = "INSERT INTO movie (name,description,rating,cover_image)
			VALUES ('$name','$description','$rating','$cover_image')";
	if($conn->query($sql)) {
		// success
	}
}
if ( isset($_POST['cmd']) && $_POST['cmd'] == 'delete') {
	// Do the deletion!
	$id = mysqli_real_escape_string($conn, $_POST['id']);

	$sql = "DELETE FROM movie WHERE id = $id";
	if($conn->query($sql)) {
		// success
	}
}

$sql = "SELECT * FROM movie";	// wild card
$result = $conn->query($sql);	// cursor

if ($result->num_rows > 0) {
    // output data of each row
	echo "<table>";
    while($row = $result->fetch_assoc()) {
		echo "<tr>";
        echo "<td><a href='movie-comment.php?mid=".$row['id']."'><b>" 
			. $row["name"]. "</b></a></td>" 
			. "<td>".$row["description"]. "</td>"
			."<td><button>Edit</button></td>"
			."<td><button onclick='confirmDelete(".$row['id'].")'>Delete</button></td>";
		echo "</tr>";
    }
	echo "</table>";
} else {
    echo "0 results";
}
$conn->close();
?>
<script>
function confirmDelete(id) {
	if(confirm('Are you sure?')) {
		// submit to delete
		// pretend that the form is submitted
		document.getElementById('cmd').value="delete";
		document.getElementById('id').value=id;
		console.log(document.getElementById('cmd'));
		console.log(document.getElementById('id'));

		document.getElementById('actionForm').submit();
	} else {
		// phew.... 
	}
}
</script>
<div style="background-color: #efefef;">
<h3>Add New Movie</h3>
<form method="POST" action="index.php" id="actionForm">
	<input type="hidden" name="cmd" id="cmd" value="add">
	<input type="hidden" name="id" id="id" value="">
	<label>Name:</label><br>
	<input type="text" name="name"><br>
	<label>Description:</label><br>
		<textarea name="description"></textarea><br>
	<label>Rating</label><br>
		<input type="radio" name="rating" value="1">1&nbsp;&nbsp;&nbsp;
		<input type="radio" name="rating" value="2">2&nbsp;&nbsp;&nbsp;
		<input type="radio" name="rating" value="3">3&nbsp;&nbsp;&nbsp;
		<input type="radio" name="rating" value="4">4&nbsp;&nbsp;&nbsp;
		<input type="radio" name="rating" value="5">5<br>
	<label>Cover Image:</label><br>
	<input type="text" name="cover_image"><br>
	<input type="submit" value="Add">
</form>
</div>