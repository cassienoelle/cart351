<?php
//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'GET')
{
  // if the form was submitted ...
  if($_GET['title']){
    $title = $_GET['title'];
    $ingredients = $_GET['ingredients'];
    $instructions = $_GET['instructions'];

    // NEXT:: need to read the entire JSON file into an array
    //- append our new object AND then write back the contents to the file...

    //1: use an associative array to structure our shape data ...
    $newDataArray = array(
                'title' => $title,
                'ingredients' => $ingredients,
                'instructions' =>$instructions
            );

            //open or read json data
            $data_results = file_get_contents('data.json');
            //put into an array (DECODE)
            $tempArray = json_decode($data_results);

            //append additional array to json file
            $tempArray[]=$newDataArray;
            //save in JSON format (ENCODE)
            $jsonData = json_encode($tempArray);
            //save to the file
            file_put_contents('data.json', $jsonData);
            // ***resend the headers and reload the page (to clear the GET request)
            header("Location: /index.php");
            //NOW... everytime data is submitted
            //and the page reloads and reads from JSON file we have another shape...

  }

}
?>
<html>
  <head>
    <meta charset="utf-8">
     <title>EXERCISE 3 TEST</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script>

      $(document).ready(function(){



      });

    </script>

 </head>
  <body>

    <div style = "background:#eeeeee;width:75%;margin-left:12%; padding:1%;">
    <p><input type = "submit" name = "getJson" value = "getJson" id =buttonA /></p>
     <!-- new:: the form for adding a new shape ... -->
     <h2> ADD A NEW RECIPE</h2>
     <form method="get" action="index.php">
       <p><label>Title:</label><input type = "text" name = "title" required></p>
       <p><label>Ingredients:</label><input type = "text" name = "ingredients" required></p>
       <p><label>Instructions:</label><input type = "text" name = "instructions" required></p>
       <p><input type = "submit" name = "submit" value = "send" id =buttonS /></p>
     </form>
   </div>
</body>
</html>
