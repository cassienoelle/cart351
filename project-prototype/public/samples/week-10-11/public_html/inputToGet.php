<html>
<head>
<title>Sample Insert into Gallery Form </title>
<!--set some style properties::: -->
<link rel="stylesheet" type="text/css" href="css/galleryStyle.css">
</head>
<body>
<div class= "formContainer">
<!--form done using more current tags... -->
<form action="insertForm.php" method="post" enctype ="multipart/form-data">
<!-- group the related elements in a form -->
<h3> SUBMIT AN ART WORK :::</h3>
<fieldset>
 <p><label>Artist:</label><input type="text" size="24" maxlength = "40" name = "a_name" required> </p>
<p><label>Title:</label><input type = "text" size="24" maxlength = "40"  name = "a_title" required></p>
<p><label>Geographic Location:</label><input type = "text" size="24" maxlength = "40" name = "a_geo_loc" required></p>
<p><label>Creation Date (DD-MM-YYYY):</label><input type="date" name="a_date" required></p>
<p><label>Description:</label><textarea type = "text" rows="4" cols="50" name = "a_descript" required></textarea></p>
<p><label>Upload Image:</label> <input type ="file" name = 'filename' size=10 required/></p>
<p class = "sub"><input type = "submit" name = "submit" value = "submit my info" id =buttonS /></p>
 </fieldset>
</form>
</div>
</body>
</html>
