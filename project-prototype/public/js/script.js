"use strict";

let canvas;
// let canvasWidth = 700;
// let canvasHeight = 700;
let innerBorder;
let synth, sampler;
let soundObjects = [];
let myNotes = [];
let myScale = SCALES.F_SHARP_MAJOR;
let myOctave = 4;
let harmonizer;
let currentNote;
let ax1, ay1, cx1, cy1, cx2, cy2, ax2, ay2;
let bezierCoords = [];
let instruments = [];
let layouts = {
  bezier: "bezier",
  vertical: "vertical",
  horizontal: "horizontal"
};
const STATE = {
  calibrate: "calibrate",
  run: "run"
}
let currentState;
let calibrated = false;

  $(document).ready( function() {
  /**************************/
  /******** SKETCH **********/

  let sketch = function(p) {

      let instrument;
      let margin = 10;
      let stars = [];

      p.setup = function() {

      currentState = STATE.calibrate;

      let setWidth = (p.windowWidth/2) - 10;
      let setHeight = (setWidth * 3) / 4;
      canvas = p.createCanvas( setWidth, setHeight );

    //setupLayout();

      let constraints = {
        video: {
          width: { ideal: setWidth },
          height: { ideal: setHeight },
          aspectRatio: 4/3
        },
        audio: false
      };
      video = p.createCapture(constraints, function(stream) {
        //console.log(stream);
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
      //synth = new Tone.PolySynth(Tone.Synth).toDestination();
      sampler = new Tone.Sampler({
        urls: {
        "C4": "C4.mp3"
      },
      release: 1,
      baseUrl: "../samples/marimba/",
      }).toDestination();

      // Setup Test Instrument
      let kpt = [9, 10];
      //console.log("kpt: " + kpt);
      // Instrument(x, y, w, h, scale, octave)
      instrument = new Instrument(p, (p.width * 0.15) / 2, (p.height * 0.15) / 2, (p.width * 0.85), 200, SCALES.E_FLAT_MAJOR, 4, layouts.horizontal);
      for (let i = 0; i < kpt.length; i++) {
        instrument.keypointTriggers.push(kpt[i]);
      }
      instrument.setScale();
      instrument.bezierLayout();
      // instrument.horizontalLayout();
      //console.log("keypoint triggers: " + instrument.keypointTriggers);

      // setup Stars
      for (let i = 0; i < 200; i++) {
    		stars[i] = new Star(p, 0.03, 0.3);
    	}

      //console.log("soundObs: " + instrument.soundObs);

    }

    function gotPoses(results) {
      //console.log("call gotPoses");
      //console.log(results);
      poses = results;
      if (poses.length > 0) {
        let pose = poses[0].pose;

        if (currentState === STATE.calibrate) {
          for (let i = 0; i < pose.keypoints.length; i++) {
            if (!calibrated) {
              smoothPoseKeypoints[i].cal += pose.keypoints[i].score;
              smoothPoseKeypoints[i].t ++;
            }
            else if (calibrated) {
              console.log("total " + smoothPoseKeypoints[i].i + ": " + smoothPoseKeypoints[i].cal / smoothPoseKeypoints[i].t);
              if (smoothPoseKeypoints[i].cal / smoothPoseKeypoints[i].t > 0.1) {
                smoothPoseKeypoints[i].pass = true;
              } else {
                smoothPoseKeypoints[i].pass = false;
              }
              console.log("pass: " + smoothPoseKeypoints[i].pass);
            }
          }
          if (calibrated) {
            currentState = STATE.run;
          }
        }

        if (currentState === STATE.run) {
          for (let i = 0; i < pose.keypoints.length; i++) {
            smoothPoseKeypoints[i].score = pose.keypoints[i].score;
            if (smoothPoseKeypoints[i].score > 0.1) {
                let k = pose.keypoints[i].position;
                smoothPoseKeypoints[i].x = p.lerp(smoothPoseKeypoints[i].x, k.x, amt);
                smoothPoseKeypoints[i].y = p.lerp(smoothPoseKeypoints[i].y, k.y, amt);
            }
          }
        }
      }
      updateSmoothPoseKeypoints();
    }

    function modelReady() {
      console.log('model ready');
      calibratePoses();
    }

    /********* MAIN LOOP *********/

    p.draw = function()  {
      console.log ("currentState: " + currentState);
      p.translate(video.width, 0);
      p.scale(-1, 1);
      p.image(video, 0, 0, p.width, p.height);

      if (currentState === STATE.run) {
        drawMainInterface();
      }

    }

    function drawMainInterface() {
      p.translate(video.width, 0);
      p.scale(-1, 1);
      p.background(0);

      p.noFill();
      p.stroke(255, 0, 0);
    //  bezier(instrument.ax1, instrument.ay1, instrument.cx1, instrument.cy1, instrument.cx2, instrument.cy2, instrument.ax2, instrument.ay2);
    //  rect(instrument.x, instrument.y, instrument.w, instrument.h);

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].display();
      }

      // Draw keypoints and skeleton
      drawKeypoints(p);
      drawSkeleton(p);

      instrument.display();
    }

    function calibratePoses() {
      setTimeout(function(){
        calibrated = true;
      }, 5000);
    }

    }

    let userNodeOne = document.createElement('div');
    new p5(sketch, userNodeOne);
    window.document.getElementById('user1').appendChild(userNodeOne);

    let userNodeTwo = document.createElement('div');
    new p5(sketch, userNodeTwo);
    window.document.getElementById('user2').appendChild(userNodeTwo);

} );
