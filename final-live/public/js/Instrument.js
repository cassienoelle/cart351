"use strict";

const NOTES = [
  "C", // 0
  "C#", // 1
  "D", // 2
  "D#",  // 3
  "E", // 4
  "F", // 5
  "F#", // 6
  "G", // 7
  "G#", // 8
  "A", // 9
  "A#", // 10
  "B" // 11
];

// Drums example
class Instrument {
  constructor(p, cat, notes, x, y, w, h, kpts) {
    this.p = p; // p5 instance
    this.cat = cat; // category
    this.notes = notes; // array of notes []
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.kpts = kpts; // trigger keypoints []
    this.objs = [];
  }

  layout() {
    console.log('layout');
    let numNotes = this.notes.length;
    let objectRad = (this.w / numNotes) / 3;
    let objectW = objectRad * 2;
    let step = (this.w - objectRad * 2) / (numNotes - 1);
    let currentCoord = {
      x: this.x + objectRad,
      y: this.y + (this.h/2)
    };
    let currentHue = 0;
    let hueStep = 360/numNotes;

    for (let i = 0; i < numNotes; i++) {

      // construct new sound object
      let o = new SoundObject(this.p, this.cat, this.notes[i], 0.5, currentCoord.x, currentCoord.y, objectRad, objectRad, currentHue, 90, 90, i);

      this.objs.push(o);
      currentCoord.x += step;
      currentHue += hueStep;

    }
  } // END layout

  display() {
    for (let i = 0; i < this.objs.length; i++) {
      let sObj = this.objs[i];
      console.log('x: ' + sObj.x);
      sObj.display();
      sObj.draggable();
    }
  } // END display

  update() {

    for (let i = 0; i < this.objs.length; i++) {
      let sObj = this.objs[i];
      for (let j = 0; j < this.kpts.length; j++) {
        sObj.collision = sObj.checkCollision(smoothPoseKeypoints[this.kpts[j]].x, smoothPoseKeypoints[this.kpts[j]].y);
        if (smoothPoseKeypoints[this.kpts[j]].score > 0.1) {
          let p = this.controlCompare(sObj.collision, sObj.play);
          if (p) {
            console.log("send " + sObj.note + " to peer");
            sObj.showActive();
            sObj.playNote();
          }
          sObj.play = sObj.collision;
        }
      }
    }

  } // END update

  controlCompare(c, p) {
    if (c && p != c) {
      return true;
    } else {
      return false;
    }
  }
}



//******//
