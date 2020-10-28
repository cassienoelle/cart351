<?php
//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'GET')
{
  // if the form was submitted ...
  if($_GET['shape_x']){
    //assign the variables
    $x = $_GET['shape_x'];
    $y = $_GET['shape_y'];
    $w = $_GET['shape_w'];
    $h = $_GET['shape_h'];
    $col = "rgba(255, 255, 255,1.0)"; //all the new ones will be white ..

    // NEXT:: need to read the entire JSON file into an array
    //- append our new object AND then write back the contents to the file...

    //1: use an associative array to structure our shape data ...
    $newShapeArray = array(
                'x' => $x,
                'y' => $y,
				        'w' =>$w,
        	      'h' =>$h,
          	   'col' =>$col
            );

                //open or read json data
                $data_results = file_get_contents('shapesWithColors.json');
                //put into an array (DECODE)
                $tempArray = json_decode($data_results);

                //append additional array to json file
                $tempArray[]=$newShapeArray;
                //save in JSON format (ENCODE)
                $jsonData = json_encode($tempArray);
                //save to the file
                file_put_contents('shapesWithColors.json', $jsonData);
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
   <title>JSON LOAD ASYNCH EX</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script>

  $(document).ready(function(){
    //get FIRST instance
    let canvas  = $("#loadCanvas")[0];
    console.log(canvas);
    //start...
    let context = canvas.getContext("2d");
    let shapesList = [];
    //when button is clicked
    $("#buttonA").click(function(){
      // reset the array..
      shapesList = [];
      let dataFromJSON = null;

    // call our loading function ...
    // does the parsing for us!
    // modify to add colors
    $.getJSON('shapesWithColors.json',function(data) {
         //success
           //step 1: assign the result to a global variable
           //step 2 ; log the result
          dataFromJSON = data;
          console.log(dataFromJSON);
          // fill the array with values from JSON...
          for(let j = 0; j<dataFromJSON.length; j++){
            let shape = dataFromJSON[j];
              shapesList.push(new customShape(parseInt(shape.x),parseInt(shape.y),parseInt(shape.w),parseInt(shape.h),shape.col));
            }
          })
         //fail -- fill IN
         .fail(function(error) {
           console.log("errr");
           //standard error object
           console.log(error);
           let errorP = $("<p>");
           $(errorP).css("color","red");
           errorP.text(error.responseText);
           $(errorP).appendTo("body");
         });
       }); // click


    requestAnimationFrame(loopAni);
    function loopAni(){
      context.clearRect(0,0,canvas.width,canvas.height);

      //draw ::
      for(let i =0; i<shapesList.length; i++){
        shapesList[i].display();
        shapesList[i].update(); //added an update ... (using sin )
      }

      requestAnimationFrame(loopAni);

    }

  // custom SHAPE CLASS
//mod to add col
    function customShape(x,y,w,h,col){
      this.x = x;
      this.y = y;
      this.w =w;
      this.h =h;
      this.theta =0;
      this.col = col; //mod
      this.display  = function(){
        context.fillStyle = this.col;//mod
        context.fillRect(this.x,this.y,this.w,this.h);
      }
      this.update = function(){
            /* using math - sin .... function that oscialltes between -1 and 1 */
        this.w = this.w + Math.sin(this.theta);
        this.h = this.h + Math.sin(this.theta);
        this.theta+=0.02;

      }
    }
});


  </script>
  <style>
  p{
    padding:2px;
    width:100%;
  }
  p label{
    display:inline-block;
    width:5%;
    color:rgba(149, 0, 153,0.85);

  }
  .wrapper{
    width:75%;
    margin-left:12%;
  }
  h2{
    color:rgba(149, 0, 153,0.85);

  }
  input{
    width:5%;
  }
  input[type=submit]{
    width:8%;
  }
  form{
    padding:10px;
    background:rgba(149, 0, 153,0.25);
  }

  </style>
 </head>
  <body>

    <div style = "background:#eeeeee;width:75%;margin-left:12%; padding:1%;">
    <p><input type = "submit" name = "getJson" value = "getJson" id =buttonA /></p>
     <canvas style = "background:black" id = "loadCanvas" width = 500 height =500></canvas>
     <!-- new:: the form for adding a new shape ... -->
     <h2> ADD A NEW SHAPE</h2>
     <form method="get" action="index.php">
       <p><label>x:</label><input type = "number" size="2" maxlength = "3"  name = "shape_x" min="1" max="500" required></p>
       <p><label>y:</label><input type = "number" size="2" maxlength = "3"  name = "shape_y" min="1" max="500" required></p>
       <p><label>w:</label><input type = "number" size="2" maxlength = "3"  name = "shape_w" min="1" max="100" required></p>
        <p><label>h:</label><input type = "number" size="2" maxlength = "3" name = "shape_h" min="1" max="100" required></p>
       <p><input type = "submit" name = "submit" value = "send" id =buttonS /></p>
     </form>
   </div>
</body>
</html>
