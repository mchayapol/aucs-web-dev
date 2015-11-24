<?php
require 'db.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if(! isset($_GET['mid'])) {
	die("Invalid parameter<br><a href='index.php'>Go Back</a>");
}

$mid = $_GET['mid'];

$mid = mysqli_real_escape_string($conn, $mid);

$sql = "SELECT * FROM comment WHERE mid = $mid";	// wild card
$result = $conn->query($sql);	// cursor

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<b>". $row["name"]. ": </b>" 
			. $row["comment"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>
<a href="/">Go Back</a>