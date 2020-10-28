"use strict";

$(document).ready(function() {

  console.log("ready");

  camera.init({
  	width: 640, // default: 640
  	height: 480, // default: 480
  	fps: 30, // default: 30
    mirror: true,  // default: false

  	onFrame: function(canvas) {
  		// do something with image data found in the canvas argument
  	},

  	onSuccess: function() {
      console.log("success");
  		// stream succesfully started, yay!
  	},

  	onError: function(error) {
      console.log("error");
  		// something went wrong on initialization
  	},

  	onNotSupported: function() {
      console.log("not supported");
  		// instruct the user to get a better browser
  	}
  });

/*
  //ANIMATION CODE
  requestAnimationFrame(animationLoop);
   // MAIN ANIMATION LOOP
    function animationLoop(){
      context.drawImage(video,0,0,video.videoWidth,video.videoHeight);
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    //  context.fillStyle = "rgba(255,0,0,255)";
    //  context.fillRect(canvas.width/2,canvas.height/2,50,50);
    //  context.clearRect(canvas.width/2+12.5,canvas.height/2+12.5,25,25);

      console.log("vidWidth: " + video.videoWidth);
      console.log("vidHeight: " + video.videoHeight);
      console.log("width: " + canvas.width);
      console.log("height: " + canvas.height);

    requestAnimationFrame(animationLoop);
  }
*/


});
