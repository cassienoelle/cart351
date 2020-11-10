"use strict";

let synth;
let soundObjects = [];
let octave = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

/********* SETUP *********/

function setup() {

  createCanvas(1280, 720);
  let constraints = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      },
    },
    audio: false
  };
  video = createCapture(constraints, function(stream) {
    console.log(stream);
  });

  video.hide();
  updateSmoothPoseKeypoints();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);

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
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  drawKeypoints();

  for (let i = 0; i < soundObjects.length; i++) {
    soundObjects[i].display();
    soundObjects[i].checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y);
    soundObjects[i].checkPosition(smoothPoseKeypoints[10].x, smoothPoseKeypoints[10].y);
  }


}
