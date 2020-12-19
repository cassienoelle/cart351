<html>
<head>
<title>SUPER GLOBAL: SERVER</title>
</head>
<body>
<?php
echo("<h2>SUPER GLOBAL: _SERVER::</h2>");
//This is a string denoting the user agent (client browser) being which is accessing the page.
echo($_SERVER['HTTP_USER_AGENT']);
echo("<br>");
//Which request method was used to access the page; i.e. 'GET', 'HEAD', 'POST', 'PUT'.
echo($_SERVER['REQUEST_METHOD']);
echo("<br>");
//The filename of the currently executing php script, relative to the document root
echo($_SERVER['PHP_SELF']);

echo("<br>");
echo($_SERVER['REQUEST_TIME']);
//The timestamp of the start of the request.
//is a Unix timestamp: It is the number of seconds that have elapsed since Jan 1 1970
//in coordinated Universal time (UTC)
echo("<br>");
$utc = $_SERVER['REQUEST_TIME'];
//convert to a date/time object
$dt = new DateTime();
//give the time stamp
$dt->setTimeStamp($utc);
//set time zone (not all are supported - need to look at documentation)
$dt->setTimeZone(new DateTimeZone('America/New_York'));
//format -> see: https://www.w3schools.com/php/func_date_date_format.asp
echo $dt->format('l, F j, Y g:i a');
?>
</body>
</html>
