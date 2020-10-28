"use strict";

$(document).ready(function() {

  console.log("ready");
/*
  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  if (hasGetUserMedia()) {
    // Success!
  }
  else {
    alert('getUserMedia() is not supported by your browser');
  }

  */

  const constraints = {
    video: true
  }

  const video = document.querySelector('video');
  const canvas = document.querySelector('canvas');

  navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {video.srcObject = stream});

  let context = canvas.getContext('2d');

  let videoToCanvas = function() {

    let self = this;
              // Redraw the next frame
              setTimeout(function() {
                  self.videoToCanvas();
              }, 0);
  }


  /**** ANIMATION CODE *****************/
  requestAnimationFrame(animationLoop);
   /*MAIN ANIMATION LOOP */
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
  /**** END ANIMATION CODE *****************/



});
