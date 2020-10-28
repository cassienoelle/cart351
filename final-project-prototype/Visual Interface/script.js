"use strict";

$(document).ready(function() {

  console.log("ready");
  let canvas = document.getElementById("testCanvas");
  let context = canvas.getContext("2d");

  let ellipse = new EllipseObject(canvas.width/2,canvas.height/2,50,canvas,context);
  console.log(ellipse);

  /**** ANIMATION CODE *****************/
  requestAnimationFrame(animationLoop);
   /*MAIN ANIMATION LOOP */
    function animationLoop(){

      ellipse.display();

    requestAnimationFrame(animationLoop);
  }
  /**** END ANIMATION CODE *****************/

  function EllipseObject(x,y,r,canvas,context) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.s = 0;
    this.e = Math.PI * 2;
    this.cc = true;
    this.canvas = canvas;
    this.context = context;
    this.fillstyle = "rgb(255,82,13)";

    this.display = function() {
    this.context.fillStyle = this.fillstyle;
    context.beginPath();
    context.arc(this.x,this.y,this.r,this.s,this.e,this.cc); //counter-clockwise
    context.fill();
    context.closePath();
    }
  } // ellipse object


});
