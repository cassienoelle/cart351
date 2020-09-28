window.onload = function(){


// get the canvas
let canvas = document.getElementById("testCanvas");

//get the context
let context = canvas.getContext("2d");
//declare a shape
//need to pass the context & canavas!
let box = new Box(canvas.width/2,canvas.height/2,50,50);

box.display();

requestAnimationFrame(run);

//our run method
function run(){

  context.clearRect(0,0,canvas.width,canvas.height);
  box.display();
  //call update
  box.update();


  //recursive call
  requestAnimationFrame(run);

}

  function Box(x,y,w,h){

      //member properties

      this.x =x;
      this.y =y;
      this.w = w;
      this.h=h;

      //add in when we update
      this.speedX = 1;
      this.speedY = 4;

      //display method
      this.display = function(){
        //lets draw something
      this.col = "rgba(149, 0, 153,0.95)";
      context.fillStyle = this.col;
      context.fillRect(this.x,this.y,this.w,this.h);

    }
    //need an update
    this.update = function(){
      this.x = this.x+this.speedX;
      this.y = this.y+this.speedY;
    }
  }
}
