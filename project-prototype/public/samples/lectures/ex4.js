window.onload = function(){


// get the canvas
let canvas = document.getElementById("testCanvas");

//get the context
let context = canvas.getContext("2d");
//declare an array of shapes
let shapeList = [];
//declare the number of shapes we want
const NUM_SHAPES=25;
//fill the array with shapes
for(let i=0; i< NUM_SHAPES;i++){

  //Math.random is between 0 and 1 --> scale to range of 0-255

  let r = Math.floor(Math.random() * 256) //returns a  random int from 0 to 255 (convert from decimal to whole num)
  let g = Math.floor(Math.random() * 256) //returns a  random int from 0 to 255 (convert from decimal to whole num)
  let b = Math.floor(Math.random() * 256) //returns a  random int from 0 to 255 (convert from decimal to whole num)



  //use random for speed diff::
  let sX = Math.floor(Math.random() * 10)+1;
  let sY = Math.floor(Math.random() * 3)+1;
  //use arrays...
  shapeList.push(new CustomShape(i,i,50,50,r,g,b,1.0,sX,sY,context,canvas));
}


requestAnimationFrame(run);

//our run method
function run(){

  context.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0; i< NUM_SHAPES;i++){

    shapeList[i].display();
    shapeList[i].update();
  }

  //recursive call
  requestAnimationFrame(run);

}

}
