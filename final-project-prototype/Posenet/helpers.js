
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

function initSoundObjects(array, keypts) {
  for (let i = 0; i < array.length; i++) {
    console.log("array[i]: " + array[i]);
    array[i].display();
    array[i].draggable();
    for (let j = 0; j < keypoints.length; j++) {
      array[i].checkPosition(smoothPoseKeypoints[keypts[j]].x, smoothPoseKeypoints[keypts[j]].y);
    }
  }
  // harmonizer.display();
  // harmonizer.checkPosition(smoothPoseKeypoints[13].x, smoothPoseKeypoints[13].y);
  // harmonizer.draggable();
  //console.log("harmonizer: " + harmonizer.harmonizeNextNote);
}

function drawStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }
}

// getBezierXY()
//
// Returns coordinates for point along a bezier curve
// Borrowed from:
// http://www.independent-software.com/determining-coordinates-on-a-html-canvas-bezier-curve.html
function getBezierXY (t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
  return {
    x: Math.pow(1-t,3) * sx + 3 * t * Math.pow(1 - t, 2) * cp1x
      + 3 * t * t * (1 - t) * cp2x + t * t * t * ex,
    y: Math.pow(1-t,3) * sy + 3 * t * Math.pow(1 - t, 2) * cp1y
      + 3 * t * t * (1 - t) * cp2y + t * t * t * ey
  };
} // getBezierXY()
