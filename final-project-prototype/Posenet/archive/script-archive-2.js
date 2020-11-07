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

let wrist;
let elbow;
let armspan;


const POSENET_KEYPOINTS = {
  nose: 0,
	leftEye: 1,
	rightEye: 2,
	leftEar: 3,
	rightEar: 4,
	leftShoulder: 5,
	rightShoulder: 6,
	leftElbow: 7,
	rightElbow: 8,
	leftWrist: 9,
	rightWrist: 10,
	leftHip: 11,
	rightHip: 12,
	leftKnee: 13,
	rightKnee: 14,
	leftAnkle: 15,
	rightAnkle: 16
};

let played = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  console.log(ml5);

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




  /*

  wrist = trackKeypoint(POSENET_KEYPOINTS.leftWrist);
  elbow = trackKeypoint(POSENET_KEYPOINTS.leftElbow);

  if (wrist !== undefined && elbow !== undefined) {

    armspan = getDistance(
      trackKeypoint(POSENET_KEYPOINTS.leftWrist),
      trackKeypoint(POSENET_KEYPOINTS.leftElbow)
    );

    console.log ("armspan: " + armspan);

  }
*/


/*
  if (trackKeypoint(POSENET_KEYPOINTS.leftWrist) !== undefined) {
    console.log(trackKeypoint(POSENET_KEYPOINTS.leftWrist).x);
    console.log(trackKeypoint(POSENET_KEYPOINTS.leftWrist).y);

    console.log(checkPosition(trackKeypoint(POSENET_KEYPOINTS.leftWrist).x, trackKeypoint(POSENET_KEYPOINTS.leftWrist).y));

    if (checkPosition(trackKeypoint(POSENET_KEYPOINTS.leftWrist).x, trackKeypoint(POSENET_KEYPOINTS.leftWrist).y) === true) {
      console.log('OVERLAP');
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
  */


  // We can call both functions to draw all keypoints and the skeletons
  //drawKeypoints();
  //drawSkeleton();
}

function checkPosition(x, y) {
  let keyX = x;
  let keyY = y;
  fill(0,255,0);
  ellipse(keyX, keyY, 50, 50);
  if (keyX > (eX - eW/2) && keyX < (eX + eW/2) ) {
    if (keyY > (eY -eW/2) && keyY < (eY + eW/2) ) {
      return true;
    }
  } else {
    return false;
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
