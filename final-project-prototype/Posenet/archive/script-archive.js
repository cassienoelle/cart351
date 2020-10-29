"use strict";

let poseNet;
let poses = [];

$(document).ready(function() {

  console.log("ready");

  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
  if (hasGetUserMedia()) {
    // Success!
  }
  else {
    alert('getUserMedia() is not supported by your browser');
  }

  const constraints = {
    video: true,
  }

  let video = document.querySelector('video');
  let canvas = document.querySelector('canvas');

  navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {video.srcObject = stream});

  // Draw video onto canvas
  let videoToCanvas = new VideoToCanvas();
  videoToCanvas.init(video, canvas);
  videoToCanvas.linkToVideo();

  // Hide the video element
  $('video').hide();

  /***---POSENET---***/

  // Initialize PoseNet
  // Fill poses array with results every time a new pose is detected
  poseNet = ml5.poseNet(canvas, modelReady);
  poseNet.on('pose', results => {
    poses = results;
  });

  function modelReady() {
  console.log('Model Loaded');
  }





});
