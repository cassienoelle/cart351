"use strict";

let canvas;
let synth;
let soundObjects = [];
let octave = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

/********* SETUP *********/

function setup() {

  canvas = createCanvas(500, 700);

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

  // setup SoundObjects
  let numObjects = octave.length;
  let cellWidth = width / numObjects;
  let objectWidth = cellWidth / 2;
  let objectX = cellWidth / 2;

  for (let i = 0; i < octave.length; i++) {
    let o = new SoundObject(objectX, 100, objectWidth, objectWidth, 0, 0, 255, octave[i], "8n");
    soundObjects.push(o);
    objectX += cellWidth;
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

  drawKeypoints();
  initSoundObjects();

  console.log(soundObjects[0].played);

}
