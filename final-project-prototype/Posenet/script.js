"use strict";

let canvas;
// let canvasWidth = 700;
// let canvasHeight = 700;
let innerBorder;
let synth;
let soundObjects = [];
let myNotes = [];
let myScale = SCALES.F_SHARP_MAJOR;
let myOctave = 4;
let stars = [];
let harmonizer;
let currentNote;
let ax1, ay1, cx1, cy1, cx2, cy2, ax2, ay2;
let bezierCoords = [];
let instruments = [];
let instrument;

/********* SETUP *********/

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);

//setupLayout();

  let constraints = {
    video: {
      width: { ideal: width },
      height: { ideal: height },
      aspectRatio: { ideal: width/height }
    },
    audio: false
  };
  video = createCapture(constraints, function(stream) {
    console.log(stream);
  });

  video.hide();

  let options = {
   imageScaleFactor: 0.3,
   outputStride: 16,
   flipHorizontal: true,
   minConfidence: 0.5,
   maxPoseDetections: 5,
   scoreThreshold: 0.5,
   nmsRadius: 20,
   detectionType: 'single',
   multiplier: 0.75,
  }


  poseNet = ml5.poseNet(video, options, modelReady);
  poseNet.on('pose', gotPoses);

  updateSmoothPoseKeypoints();


  Tone.start(); // Init audio context
  // Instrument setup
  //create a synth and connect it to the main audio output
  synth = new Tone.PolySynth(Tone.Synth).toDestination();

  // Setup Test Instrument
  let kpt = [9, 10];
  console.log("kpt: " + kpt);
  instrument = new Instrument(200, 200, 100, height- 200, SCALES.E_FLAT_MAJOR, 4);
  for (let i = 0; i < kpt.length; i++) {
    instrument.keypointTriggers.push(kpt[i]);
  }
  instrument.setScale();
  //instrument.bezierLayout();
  instrument.verticalLayout();
  console.log("keypoint triggers: " + instrument.keypointTriggers);

  // setup Stars
  for (let i = 0; i < 1000; i++) {
		stars[i] = new Star();
	}

}

function gotPoses(results) {
  //console.log("call gotPoses");
  poses = results;
  if (poses.length > 0) {
    let pose = poses[0].pose;
    for (let i = 0; i < pose.keypoints.length; i++) {
      let k = pose.keypoints[i].position;
      smoothPoseKeypoints[i].x = lerp(smoothPoseKeypoints[i].x, k.x, amt);
      smoothPoseKeypoints[i].y = lerp(smoothPoseKeypoints[i].y, k.y, amt);
    }
  }
  updateSmoothPoseKeypoints();
}

function modelReady() {
  console.log('model ready');
}

/********* MAIN LOOP *********/

function draw() {
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  translate(video.width, 0);
  scale(-1, 1);
  background(0);

  noFill();
  stroke(255, 0, 0);
  //bezier(instrument.ax1, instrument.ay1, instrument.cx1, instrument.cy1, instrument.cx2, instrument.cy2, instrument.ax2, instrument.ay2);
  //rect(instrument.x, instrument.y, instrument.w, instrument.h);

  drawStars();
  drawKeypoints();
  // initSoundObjects(array, keypts)
  //console.log("kpt: " + smoothPose.leftWrist.i);
  instrument.display();


}
