
// FOR  3B
function CustomShape(x,y,w,h,r,g,b,a,speedX,speedY,theContext, theCanvas){
    //member properties
    this.canvas = theCanvas;
    this.context = theContext; // NEW PASS THE CONTEXT
    this.x =x;
    this.y =y;
    this.w = w;
    this.h=h;
    this.r =r;
    this.g =g;
    this.b=b;
    this.a=a;
    this.innerW = this.w/2;
    this.innerH = this.h/2;
    //add in when we update
    this.speedX = speedX;
    this.speedY = speedY;
    this.innerX = this.x+this.innerW/2;
    this.innerY = this.y+this.innerH/2;
    //display method
    this.display = function(){
      //lets draw something
    this.col = "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
    this.context.fillStyle = this.col;
    //console.log(this.context);
    this.context.fillRect(this.x,this.y,this.w,this.h);
    this.context.clearRect(this.innerX,this.innerY,this.innerW,this.innerH);

    }

    //update
    this.update = function(){

      //edges bouncing specifically for a rect with corner coords.
      if(this.x>(this.canvas.width-this.w)||this.x<0){
        this.speedX*=-1;
      }
      if(this.y>(this.canvas.height-this.h)||this.y<0){
        this.speedY*=-1;
      }

      //change by speed ...
      this.x+=this.speedX;
      this.y+=this.speedY;
      //need to update the inner vars here ....
      this.innerX = this.x+this.innerW/2;
      this.innerY = this.y+this.innerH/2;
    }
  }
