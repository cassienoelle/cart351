"use strict";

let synth;
let soundObjectOne, soundObjectTwo, soundObjectThree, soundObjectFour, soundObjectFive, soundObjectSix, soundObjectSeven, soundObjectEight;

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
  synth = new Tone.Synth().toDestination();

  // Setup sound objects
  soundObjectOne = new SoundObject(1000, 200, 75, 75, 0, 0, 255, "C4", "8n");
  soundObjectTwo = new SoundObject(900, 200, 75, 75, 0, 0, 255, "D4", "8n");
  soundObjectThree = new SoundObject(800, 200, 75, 75, 0, 0, 255, "E4", "8n");
  soundObjectFour = new SoundObject(700, 200, 75, 75, 0, 0, 255, "F4", "8n");
  soundObjectFive = new SoundObject(600, 200, 75, 75, 0, 0, 255, "G4", "8n");
  soundObjectSix = new SoundObject(500, 200, 75, 75, 0, 0, 255, "A4", "8n");
  soundObjectSeven = new SoundObject(400, 200, 75, 75, 0, 0, 255, "B4", "8n");
  soundObjectEight = new SoundObject(300, 200, 75, 75, 0, 0, 255, "C5", "8n");


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
  soundObjectOne.display();
  soundObjectTwo.display();
  soundObjectThree.display();
  soundObjectFour.display();
  soundObjectFive.display();
  soundObjectSix.display();
  soundObjectSeven.display();
  soundObjectEight.display();

  soundObjectOne.checkPosition(smoothPoseKeypoints[10].x, smoothPoseKeypoints[10].y);
  soundObjectOne.checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y);
  soundObjectTwo.checkPosition(smoothPoseKeypoints[10].x, smoothPoseKeypoints[10].y);
  soundObjectTwo.checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y);
  soundObjectThree.checkPosition(smoothPoseKeypoints[10].x, smoothPoseKeypoints[10].y);
  soundObjectThree.checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y);
  soundObjectFour.checkPosition(smoothPoseKeypoints[10].x, smoothPoseKeypoints[10].y);
  soundObjectFour.checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y);
  soundObjectFive.checkPosition(smoothPoseKeypoints[10].x, smoothPoseKeypoints[10].y);
  soundObjectFive.checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y);
  soundObjectSix.checkPosition(smoothPoseKeypoints[10].x, smoothPoseKeypoints[10].y);
  soundObjectSix.checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y);
  soundObjectSeven.checkPosition(smoothPoseKeypoints[10].x, smoothPoseKeypoints[10].y);
  soundObjectSeven.checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y);
  soundObjectEight.checkPosition(smoothPoseKeypoints[10].x, smoothPoseKeypoints[10].y);
  soundObjectEight.checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y);
}
