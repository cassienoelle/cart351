
"use strict";

/*
function windowResized() {

    resizeCanvas(windowWidth, windowHeight);
    video.size(windowWidth, windowHeight);
    updateStars();
}
*/

function drawKeypoints(p) {
  let r = 10;
  if (poses.length > 0) {
    for (let i = 0; i < smoothPoseKeypoints.length; i++) {
      if (smoothPoseKeypoints[i].pass === true) {
        let x = smoothPoseKeypoints[i].x;
        let y = smoothPoseKeypoints[i].y;
        if (i <= 4) {
          r = 3;
        }
        else {
          r = 7;
        }
        p.fill(255);
        p.noStroke();
        p.ellipse(x, y, r, r);
      }
    }
  }
}

function drawSkeletonPart(p, a, b) {
  let pointA = a;
  let pointB = b;

  p.stroke(255);
  p.line(pointA.x, pointA.y, pointB.x, pointB.y);
}

function drawSkeleton(p) {

  for (let i = 0; i < smoothPoseSkeleton.length; i ++) {
    let a = smoothPoseSkeleton[i][0];
    let b = smoothPoseSkeleton[i][1];
    if (smoothPoseKeypoints[a].pass === true && smoothPoseKeypoints[b].pass === true) {
      drawSkeletonPart(p, smoothPoseKeypoints[a], smoothPoseKeypoints[b]);
    }
  }
}


function initSoundObjects(array, kpts) {
  for (let i = 0; i < array.length; i++) {
    //console.log("array[i]: " + array[i]);
    array[i].display();
    array[i].draggable();
    for (let j = 0; j < kpts.length; j++) {
      if (smoothPoseKeypoints[kpts[j]].score > 0.1) {
        array[i].checkPosition(smoothPoseKeypoints[kpts[j]].x, smoothPoseKeypoints[kpts[j]].y);
      }
    }
  }
}


function drawStars(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].display();
  }
}



function updateStars(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].update();
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
