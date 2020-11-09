"use strict";

function drawKeypoints() {
  if (poses.length > 0) {
    for (let i = 0; i < smoothPoseKeypoints.length; i++) {
      let x = smoothPoseKeypoints[i].x;
      let y = smoothPoseKeypoints[i].y;
      fill(255, 0, 0);
      noStroke();
      ellipse(x, y, 10, 10);
    }
  }
}
