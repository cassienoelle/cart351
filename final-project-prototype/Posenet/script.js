"use strict";
// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let synth;

let eX;
let eY;
let eW;

let leftWrist = 9;
let rightWrist = 10;

let played = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  // Instrument setup
  //create a synth and connect it to the main output (your speakers)
  synth = new Tone.Synth().toDestination();

  eX = width/2;
  eY = height/2;
  eW = 50;
}

function modelReady() {
  console.log("model loaded");
}

function draw() {
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  fill(0, 0, 255);
  noStroke();
  ellipse(eX, eY, eW, eW);



  if (trackKeypoints(leftWrist) !== undefined) {
    console.log(trackKeypoints(leftWrist)[0]);
    console.log(trackKeypoints(leftWrist)[1]);

    if (checkPosition(trackKeypoints(leftWrist)[0], trackKeypoints(leftWrist)[1]) === true) {
      if (!played) {
        //play a middle 'C' for the duration of an 8th note
        synth.triggerAttackRelease("C4", "8n");
        played = true;
      }
    } else {
      if (played) {
        played = false;
      }
    }
  }


  // We can call both functions to draw all keypoints and the skeletons
  //drawKeypoints();
  //drawSkeleton();
}

function checkPosition(x, y) {
  let keyX = x;
  let keyY = y;
  if (keyX > (eX - eW/2) && mouseX < (eX + eW/2) ) {
    if (keyY > (eY -eW/2) && mouseY < (eY + eW/2) ) {
      return true;
    }
  } else {
    return false;
  }
}

function trackKeypoints(key) {
  let currentKey = key;
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[0].pose;
    let keypoint = pose.keypoints[key];
    if (keypoint.score > 0.1) {
      fill(255, 0, 0);
      noStroke();
      ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      return [keypoint.position.x, keypoint.position.y];
    }
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[0].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[0].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
