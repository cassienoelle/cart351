"use strict";

// Canvas and camera variables
let canvas;
let video;
let videoWidth, videoHeight;
// Pose tracking variables
let poseNet;
let poses = [];
let smoothing = [];

function setup() {

  // videoWidth = 800;
  // videoHeight = 800;

  // Setup canvas and webcam feed
  canvas = createCanvas(800, 800);
  video = createCapture(VIDEO);
  video.size(800, 800);
  video.hide();

  // Initialize PoseNet
  // Fill poses array with results every time a new pose is detected
  poseNet = ml5.poseNet(video, {minConfidence: 0.5, scoreThreshold: 0.5, detectionType: 'single'}, modelReady);
  poseNet.on('pose', results => {
    poses = results;
    console.log(poses);
  });

  function modelReady() {
    console.log('Model Loaded');
  }

}

function draw() {

  videoToCanvas();
  trackWrist();

}

function videoToCanvas() {
  // Display webcam video as image on canvas
  // Flip horizontally
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0);
}

function trackWrist() {
  // Loop through poses detected
  for (let i = 0; i < poses.length; i++)  {
    // Select wrist keypoints, pass position to variables
    let leftWrist = poses[i].pose.keypoints[9];
    console.log(leftWrist);
    //let rightWrist = poses[i].pose.keypoints[10];

    let c = color(255, 204, 0);
    fill(c);

    if (leftWrist.score > 0.1)  {
      circle(leftWrist.position.x,leftWrist.position.y,50);
    }
    /*
    if (rightWrist.score > 0.1) {
      circle(rightWrist.x,rightWrist.y,50);
    }
    */

  }
}
