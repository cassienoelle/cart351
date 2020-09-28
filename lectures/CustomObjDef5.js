
function CustomShape(x,y,w,h,r,g,b,a, speedX,speedY,theContext, theCanvas){

    //member properties
    this.theta =0; //add in an angle (5)
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

// NEW DISPLAY
    this.display = function(){
      //lets draw something
    this.col = "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
    this.context.fillStyle = this.col;
    // save current state

    this.context.save();
    // translate the origin to the x and y positions....
    this.context.translate(this.x,this.y);

    // rotate the canvas -> but around the center of the rect
    this.context.rotate(this.theta);
    //increment theta
    this.theta+=0.002;
    // the coordinates are now relative to the new origin
    // please note: rects draw from corner so we want to shift it
    //up and left so that x,y is in its center
    this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);



    //restore state
    this.context.restore();
    // for debug
  //this.context.fillStyle = "#ffffff";
  //this.context.fillRect(this.x,this.y,10,10);

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
    }
  }
