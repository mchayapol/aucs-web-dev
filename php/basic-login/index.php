<!DOCTYPE html>
<head>
</head>
<body>

<form action="login.php" method="POST">
	<table>
	  <tr>
		<td>Username</td>
		<td><input type="text" name="username"></td>
	  </tr>
	  <tr>
		<td>Password</td>
		<td><input type="password" name="pwd"></td>
	  </tr>
	  <tr>
		<td>Role</td>
		<td>
			<select name="role">
				<option value="1">User</option>
				<option value="2">Admin</option>
			</select>
		</td>
	  </tr>
	  <tr>
		<td colspan="2" align="center">
			<input type="submit" value="Login">
			<input type="reset" value="Clear">
		</td>
	  </tr>
	</table>
</form>
</body>
</html>
