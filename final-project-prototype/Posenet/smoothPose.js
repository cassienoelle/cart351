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
