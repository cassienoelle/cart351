"use strict";

let video;
let poseNet;
let poses = [];
let amt = 0.4; // lerp amount
let smoothPoseKeypoints = [];
let smoothPose = {
  nose: {
    i: 0,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  leftEye: {
    i: 1,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  rightEye: {
    i: 2,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  leftEar: {
    i: 3,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  rightEar: {
    i: 4,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  leftShoulder: {
    i: 5,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  rightShoulder: {
    i: 6,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  leftElbow: {
    i: 7,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  rightElbow: {
    i: 8,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  leftWrist: {
    i: 9,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  rightWrist: {
    i: 10,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  leftHip: {
    i: 11,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  rightHip: {
    i: 12,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  leftKnee: {
    i: 13,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  rightKnee: {
    i: 14,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  leftAnkle: {
    i: 15,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  },
  rightAnkle: {
    i: 16,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0
  }
};

function updateSmoothPoseKeypoints() {
  smoothPoseKeypoints.splice(0, smoothPoseKeypoints.length);
  smoothPoseKeypoints.push(smoothPose.nose);
  smoothPoseKeypoints.push(smoothPose.leftEye);
  smoothPoseKeypoints.push(smoothPose.rightEye);
  smoothPoseKeypoints.push(smoothPose.leftEar);
  smoothPoseKeypoints.push(smoothPose.rightEar);
  smoothPoseKeypoints.push(smoothPose.leftShoulder);
  smoothPoseKeypoints.push(smoothPose.rightShoulder);
  smoothPoseKeypoints.push(smoothPose.leftElbow);
  smoothPoseKeypoints.push(smoothPose.rightElbow);
  smoothPoseKeypoints.push(smoothPose.leftWrist);
  smoothPoseKeypoints.push(smoothPose.rightWrist);
  smoothPoseKeypoints.push(smoothPose.leftHip);
  smoothPoseKeypoints.push(smoothPose.rightHip);
  smoothPoseKeypoints.push(smoothPose.leftKnee);
  smoothPoseKeypoints.push(smoothPose.rightKnee);
  smoothPoseKeypoints.push(smoothPose.leftAnkle);
  smoothPoseKeypoints.push(smoothPose.rightAnkle);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  updateSmoothPoseKeypoints();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
  poses = results;
  if (poses.length > 0) {
    let pose = poses[0].pose;
    for (let i = 0; i < pose.keypoints.length; i++) {
      let k = pose.keypoints[i].position;
      smoothPoseKeypoints[i].x = lerp(smoothPoseKeypoints[i].x, k.x, amt);
      smoothPoseKeypoints[i].y = lerp(smoothPoseKeypoints[i].y, k.y, amt);
    }
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  drawKeypoints();
}

function drawKeypoints() {
  if (poses.length > 0) {
    for (let i = 0; i < smoothPoseKeypoints.length; i++) {
      let x = smoothPoseKeypoints[i].x;
      let y = smoothPoseKeypoints[i].y;
      fill(255, 0, 0);
      noStroke();
      ellipse(x, y, 20, 20);
    }
  }
}
