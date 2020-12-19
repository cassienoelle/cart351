//FOR 6 ...
function CustomShape(x,y,w,h,r,g,b,a, speedX,speedY,rectID,theContext, theCanvas){
  //set a bool
    this.isActive =false; //new
    this.rectID=rectID;
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
    // the coordinates are now relative to the new origin
    // please note: rects draw from corner so we want to shift it
    //up and left so that x,y is in its center
    this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);

      //restore state
    this.context.restore();

  }

// checking in run if the shape is active
  this.checkActive = function(){
    //put the active test in the UPDATE..
    if (this.isActive ===true){
      console.log(`the mouse is over rect ${this.rectID}`);
      this.theta+=0.02;

    }
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
  }


  // NEW COLLISON CHECK
  this.hitTest = function(event){
          this.isActive =false; //reset
         let domRect = this.canvas.getBoundingClientRect();
        // note drawing coordinates start at 0,0 in the canvas - so we need the diff
        // between the mouse and where the canvas starts  ...
       let diffX =  event.clientX-domRect.x;
       let diffY =  event.clientY-domRect.y;
// range detection:: note e could use the distance formula ...
if(diffX>this.x-this.w/2 && diffX<(this.x+this.w/2)){
    if(diffY>this.y-this.h/2 && diffY<this.y+this.h/2){
      this.isActive =true;
    }
  }
}

}