
"use strict";

function windowResized() {

    resizeCanvas(windowWidth, windowHeight);
    video.size(windowWidth, windowHeight);
    updateStars();
}



function drawKeypoints() {
  let r = 10;
  if (poses.length > 0) {
    for (let i = 0; i < smoothPoseKeypoints.length; i++) {
      if (smoothPoseKeypoints[i].pass === true) {
        let x = smoothPoseKeypoints[i].x;
        let y = smoothPoseKeypoints[i].y;
        if (i <= 4) {
          r = 5;
        }
        else {
          r = 10;
        }
        fill(255);
        noStroke();
        ellipse(x, y, r, r);
      }
    }
  }
}

function drawSkeletonPart(a, b) {
  let pointA = a;
  let pointB = b;

  stroke(255);
  line(pointA.x, pointA.y, pointB.x, pointB.y);
}

function drawSkeleton() {

  for (let i = 0; i < smoothPoseSkeleton.length; i ++) {
    let a = smoothPoseSkeleton[i][0];
    let b = smoothPoseSkeleton[i][1];
    if (smoothPoseKeypoints[a].pass === true && smoothPoseKeypoints[b].pass === true) {
      drawSkeletonPart(smoothPoseKeypoints[a], smoothPoseKeypoints[b]);
    }

  }
}

function initSoundObjects(array, keypts) {
  let keys = keypts;
  for (let i = 0; i < array.length; i++) {
    //console.log("array[i]: " + array[i]);
    array[i].display();
    array[i].draggable();
    for (let j = 0; j < keys.length; j++) {
      if (smoothPoseKeypoints[keys[j]].score > 0.1) {
        array[i].checkPosition(smoothPoseKeypoints[keys[j]].x, smoothPoseKeypoints[keys[j]].y);
      }
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

function updateStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
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
