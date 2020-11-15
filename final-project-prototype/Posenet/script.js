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
  instrument = new Instrument(200, 200, 800, SCALES.E_FLAT_MAJOR, 4, [smoothPose.leftWrist.i, smoothPose.rightWrist.i]);
  instrument.setScale();
  instrument.bezierLayout();
  /*

  // set primary scale
  for (let i = 0; i < myScale.length; i++) {
    let nextNote = NOTES[myScale[i]] + myOctave;
    if (i === myScale.length - 2) {
      myOctave += 1;
    }
    myNotes.push(nextNote);
  }
  console.log(myNotes);

  */

  // setup SoundObjects
  /*
  let numObjects = myNotes.length;

  let cellWidth = width / numObjects;
  let objectRad = cellWidth / 4;
  let objectX = cellWidth / 2;

  let hue = 0;
  let t = 0;
  let coordStep = 1 / (myNotes.length-1);
  let currentCoord = getBezierXY(t, ax1, ay1, cx1, cy1, cx2, cy2, ax2, ay2);
  console.log("currentCoord: " + currentCoord.x + " " + currentCoord.y);

  // synth
  for (let i = 0; i < myNotes.length; i++) {
    let hueStep = 360/NOTES.length;
    let o = new SoundObject(currentCoord.x, currentCoord.y, objectRad, hue, 90, 90, myNotes[i], "8n");
    soundObjects.push(o);
    t += coordStep;
    currentCoord = getBezierXY(t, ax1, ay1, cx1, cy1, cx2, cy2, ax2, ay2);

    for (let n = 0; n < NOTES.length; n++) {
      if (myNotes[i].includes(NOTES[n])) {
        hue += hueStep;
      }
    }
  }
*/

/*I
  // synth
  for (let i = 0; i < myNotes.length; i++) {
    let hueStep = 360/NOTES.length;
    let o = new SoundObject(objectX, 200, objectRad, hue, 90, 90, myNotes[i], "8n");
    soundObjects.push(o);
    objectX += cellWidth;

    for (let n = 0; n < NOTES.length; n++) {
      if (myNotes[i].includes(NOTES[n])) {
        hue += hueStep;
      }
    }
  }
*/
  //harmonizer
  // harmonizer = new harmonizerObject(100, 500, objectRad*3, 90, 0, 90, "C4", "8n");

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
  rect(innerBorder, innerBorder, (width - innerBorder*2), (height - innerBorder*2));

  drawStars();
  drawKeypoints();
  // initSoundObjects(array, keypts)
  initSoundObjects(instrument.soundObs, instrument.keypointTriggers);


}
