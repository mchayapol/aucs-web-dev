<!DOCTYPE html>
<head>
</head>
<body>
<h1>Login</h1>

<pre><?php print_r($_POST); ?></pre>

<?php

$role = array(
'1' => 'User',
'2' => 'Admin'
);
	// Validate user
	if ($_POST['username'] == 'abc' && $_POST['pwd'] == '123')
	{
?>
Welcome <b> <?php echo $_POST['username'] ?>.
You are logged in as <?php echo $role[ $_POST['role'] ]; ?>
</b>
<?php
	} else {
?>
	Invalid Username / Password
<?php
	} 
?>


<br>


</body>
</html>
