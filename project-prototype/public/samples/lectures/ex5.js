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
  let r = (Math.floor((Math.random() * 255) + 1));
  let g = (Math.floor((Math.random() * 255) + 1));
  let b = (Math.floor((Math.random() * 255) + 1));

  //  //use random for speed diff::
//    let sX = Math.floor(Math.random() * 10)+1; OLD
//    let sY = Math.floor(Math.random() * 3)+1;
    // here we use modulo operator (get the remainder from a divsion ) - gives me a pattern based  on i ...
  shapeList.push(new CustomShape(i*50,50,50,50,r,g,b,1.0,(i%5)+1,(i%6)+2,context,canvas));
}


requestAnimationFrame(run);

//our run method
function run(){

  context.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0; i< NUM_SHAPES;i++){

    shapeList[i].display();
    //shapeList[i].update();
  }

  //recursive call
  requestAnimationFrame(run);

}

}
