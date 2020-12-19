<html>
<head>
  <title>Hello world example in php</title>
  <link rel="stylesheet" href="testStyle.css">
</head>
<body>
  <?php
    $firstName = "Maria";
    $lastName = "Smith";
    $age = 22;
    $occupation = "Receptionist";
    ?>

    <div id="divWithSpecificStyle">TEST DIV <?php echo$firstName ?></div>

  <?php
    echo"<div id='divWithExtStyle'>";

    echo"<h3>the original assignments to our variables::</h3>";
    echo $firstName."<br>";
    echo $lastName."<br>";
    echo $age."<br>";
    echo $occupation."<br>";
    echo"</div>";
    ?>
</body>
</html>

<!--
Notes:
Debugging is difficult in PHP
There is no console comparable to javascript
Can search for debugging tools, IDEs etc.
echo is actually a function
so you may see it with parentheses
echo("Hello World!");

php variables use $
so don't prefix jquery variables with $ if using
come up with a different convention

concatenation operator is .
not +

can mix with regular html
just be aware it is parsed top down
so everything must be in the right order

-->
