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
      let o = new SoundObject(this.p, this.cat, this.notes[i], 0.5, currentCoord.x, currentCoord.y, objectRad, objectRad, currentHue, 90, 90, this.kpts);
      this.objs.push(o);
      currentCoord.x += step;
      currentHue += hueStep;

    }
  } // END layout

  display() {
    for (let i = 0; i < this.objs.length; i++) {
      let sObj = this.objs[i];
      sObj.display();
      sObj.draggable();
    }

  } // END display

  update(k) {

    for (let i = 0; i < this.objs.length; i++) {
      let sObj = this.objs[i];
      for (let k = 0; k < this.kpts.length; k++) {
        sObj.collision[k] = sObj.checkCollision(smoothPoseKeypoints[this.kpts[k]].x, smoothPoseKeypoints[this.kpts[k]].y); // true //
        if (smoothPoseKeypoints[k].score > 0.1) { // true //
          let p = this.controlCompare(sObj.collision[k], sObj.play[k]);
          if (p) {
            console.log("send " + sObj.note + " to peer");
            sObj.showActive();
            sObj.playNote();
          }
          sObj.play[k] = sObj.collision[k];
        } // end outer if
      }
    } // end outer for


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
