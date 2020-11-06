"use strict";


let poseConfig = {
  smoothing: {
    jumpDetection: false, // did pose jump an unrealistic amount from previous position
    smoothing: 0.67, //
    maxJumpRatio: 0.3, // max difference ratio before unrealistic jump is detected
    // jumpResetTime: 1000, //
    // speedSmoothing: 0.8, //
  },
};

let smoothing = poseConfig.smoothing.smoothing;
let maxDistance;


  // trackKeypoint(key)
  //
  // return position data of specified keypoint
  function trackKeypoint(key) {
    let currentKey = key;
    //console.log("currentKey: " + currentKey);
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
      // For first pose detected, get specified keypoint
      let pose = poses[0].pose;
      //console.log(pose);
      let keypoint = pose.keypoints[currentKey];
      //console.log("keypoint: " + keypoint);
      if (keypoint !== undefined && keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        return keypoint.position;
      }
    }
  }


// getDistance(a,b)
//
// pass wrist keypoint and elbow keypoint
function getDistance(a, b) {
  const distX = a.x - b.x;
  const distY = a.y - b.y;
  return Math.sqrt(distX ** 2 + distY ** 2); // ** exponentiation
}
