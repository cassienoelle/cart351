"use strict";

let synth;
let soundObjectOne, soundObjectTwo, soundObjectThree;

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

  // Instrument setup
  //create a synth and connect it to the main audio output
  synth = new Tone.Synth().toDestination();

  // Setup sound objects
  soundObjectOne = new SoundObject(200, 200, 100, 100, 0, 255, 0, "C4", "8n");
  soundObjectTwo = new SoundObject(1050, 200, 100, 100, 0, 0, 255, "C3", "8n");


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
  //soundObjectOne.display();
  soundObjectTwo.display();

  soundObjectTwo.checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y);
  console.log(soundObjectOne.checkPosition(smoothPoseKeypoints[9].x, smoothPoseKeypoints[9].y));
}
