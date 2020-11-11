"use strict";

$(document).ready(function(){

  var canvas = document.getElementById('myCanvas');
  paper.setup(canvas);
  var path = new paper.Path();
	path.strokeColor = 'black';
	var start = new paper.Point(100, 100);
	path.moveTo(start);
	path.lineTo(start.add([ 200, -50 ]));
	paper.view.draw();

});


/*

function setup() {
  createCanvas(710, 400);
  dim = width / 2;
  background(0);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
  frameRate(1);
}

function draw() {
  background(0);
  for (let x = 0; x <= width; x += dim) {
    drawGradient(x, height / 2);
  }
}

function drawGradient(x, y) {
  let radius = dim / 2;
  let h = 250;
  let b = 0;
  for (let r = radius; r > 0; --r) {
    fill(h, 0, b);
    ellipse(x, y, r, r);
    b = (b + 1) % 360;
  }
}
*/
