//custom circle.
function CustomCircShape(x,y,r,redC,greenC,blueC,alphaC,angSpeed,theta,context,canvas,canvasObject){
  //member props
  this.sharedCanvObj = canvasObject;
  this.canvas = canvas;
  this.context =context;
  this.x =x;
  this.y =y;
  this.r =r;
  this.redC = redC;
  this.greenC = greenC;
  this.blueC = blueC;
  this.alphaC = alphaC;
  this.angularSpeed = angSpeed;
  //pass initial theta as a parameter
  this.theta =theta;


  //display
  this.display = function(){
  this.col = "rgba("+this.redC+","+this.greenC+","+this.blueC+","+this.alphaC+")";
  this.strokeCol = "rgba("+255+","+255+","+255+","+(0.65)+")";


  this.context.beginPath();
  this.context.fillStyle = this.col;
  this.context.strokeStyle = this.strokeCol;
  this.context.lineWidth = 2;
  this.context.arc(this.x,this.y,this.r,0,2*Math.PI,true);
  //ALWAYS put fill()
  //after the shape...
  this.context.fill();
  this.context.stroke();
  this.context.closePath();
}
this.update =function(){
  //use cos and sin to determine x and y placement
  this.x = Math.cos(this.sharedCanvObj.mouseAngleFromCenter+this.theta)*this.sharedCanvObj.cntrRadius + this.sharedCanvObj.cntrX;
  this.y = Math.sin(this.sharedCanvObj.mouseAngleFromCenter+this.theta)*this.sharedCanvObj.cntrRadius + this.sharedCanvObj.cntrY;
  //this.theta+=this.angularSpeed;
}





}
