"use strict";

let video;
let poseNet;
let noseX = 0;
let noseY = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    let newX = poses[0].pose.keypoints[9].position.x;
    let newY = poses[0].pose.keypoints[9].position.y;
    noseX = lerp(noseX, newX, 0.4);
    noseY = lerp(noseY, newY, 0.4);
  }
}

function modelReady() {
  console.log('model ready');
}



function draw() {
  image(video, 0, 0);
  fill(255,0,0);
  ellipse(noseX, noseY, 50, 50);
}
