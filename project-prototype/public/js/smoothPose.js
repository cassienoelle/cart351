"use strict";

let video;
let poseNet;
let poses = [];
let amt = 0.4; // lerp amount
let smoothPoseKeypoints = [];
let smoothPoseSkeleton = [
  [15, 13], // L ankle to L knee
  [11, 5], // L hip to L shoulder
  [5, 7], // L shoulder to L elbow
  [7, 9], // L elbow to L wrist
  [16, 14], // R ankle to R knee
  [14, 12], // R knee to R hip
  [12, 6], // R hip to R shoulder
  [6, 8], // R shoulder to R elbow
  [8, 10], // R elbow to R wrist
  [5, 6], // L shoulder to R shoulder
  [11, 12], // L hip to R hip
  [3, 1], // L ear to L eye
  [1, 0], // L eye to nose
  [0, 2], // nose to R eye
  [2, 4], // R eye to R ear
];
let smoothPose = {
  nose: {
    i: 0,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  leftEye: {
    i: 1,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  rightEye: {
    i: 2,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  leftEar: {
    i: 3,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  rightEar: {
    i: 4,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  leftShoulder: {
    i: 5,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  rightShoulder: {
    i: 6,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  leftElbow: {
    i: 7,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  rightElbow: {
    i: 8,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  leftWrist: {
    i: 9,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  rightWrist: {
    i: 10,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  leftHip: {
    i: 11,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  rightHip: {
    i: 12,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  leftKnee: {
    i: 13,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  rightKnee: {
    i: 14,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  leftAnkle: {
    i: 15,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
  },
  rightAnkle: {
    i: 16,
    x: 0,
    y: 0,
    nX: 0,
    nY: 0,
    score: 0,
    cal: 0,
    t: 0,
    pass: false,
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
