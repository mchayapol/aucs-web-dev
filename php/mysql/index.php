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


$currentMovie = 0;
if ( isset($_POST['cmd']) && $_POST['cmd'] == 'edit') {
	global $currentMovie;
	// Do form preparation, populate data
	$id = $_POST['id'];
	$sql = "SELECT * FROM movie WHERE id = $id";
	$result = $conn->query($sql);
	$currentMovie = $result->fetch_assoc();
}

if ( isset($_POST['cmd']) && $_POST['cmd'] == 'update') {
	// Do the update
	$id = mysqli_real_escape_string($conn, $_POST['id']);
	$name = mysqli_real_escape_string($conn, $_POST['name']);
	$description = mysqli_real_escape_string($conn, $_POST['description']);
	$rating = mysqli_real_escape_string($conn, $_POST['rating']);
	$cover_image = mysqli_real_escape_string($conn, $_POST['cover_image']);

	$sql = "UPDATE movie SET 
				name = '$name'
			    ,description = '$description'
				,rating = '$rating'
				,cover_image = '$cover_image'
			WHERE id = $id";
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
			."<td><button
			onclick='edit(".$row['id'].")'>Edit</button></td>"
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
function edit(id) {
	document.getElementById('cmd').value="edit";
	document.getElementById('id').value=id;
	document.getElementById('actionForm').submit();
}

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
<?php if ($currentMovie == false) { ?>
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
<?php } else { ?>
	<h3>Update Movie</h3>
	<form method="POST" action="index.php" id="actionForm">
		<input type="hidden" name="cmd" id="cmd" value="update">
		<input type="hidden" name="id" id="id" 
			value="<?php echo $currentMovie['id']; ?>">
		<label>Name:</label><br>
		<input type="text" name="name"
			value="<?php echo $currentMovie['name']; ?>"><br>
		<label>Description:</label><br>
			<textarea name="description"><?php echo $currentMovie['description']; ?></textarea><br>
		<label>Rating</label><br>
			<input type="radio" name="rating" value="1"
				<?php echo ($currentMovie['rating']==1)?'checked':''; ?> >1&nbsp;&nbsp;&nbsp;
			<input type="radio" name="rating" value="2"
				<?php echo ($currentMovie['rating']==2)?'checked':''; ?> 
				>2&nbsp;&nbsp;&nbsp;
			<input type="radio" name="rating" value="3"
				<?php echo ($currentMovie['rating']==3)?'checked':''; ?> 
				>3&nbsp;&nbsp;&nbsp;
			<input type="radio" name="rating" value="4"
				<?php echo ($currentMovie['rating']==4)?'checked':''; ?> 
				>4&nbsp;&nbsp;&nbsp;
			<input type="radio" name="rating" value="5"
				<?php echo ($currentMovie['rating']==5)?'checked':''; ?> 
				>5<br>
		<label>Cover Image:</label><br>
		<input type="text" name="cover_image"
			value="<?php echo $currentMovie['cover_image']; ?>"><br>
		<input type="submit" value="Update">
	</form>
<?php } ?>

</div>