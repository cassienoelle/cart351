"use strict";


class Instrument {
  constructor(x, y, w, h, scale, octave, keypointTriggers) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.scale = scale;
    this.octave = octave;
    this.sArray = [];
    this.numObs = this.scale.length;
    this.step;
    this.soundObs = [];
    this.keypointTriggers = keypointTriggers;

    // For bezier curve layout
    this.t = 0;
    this.ax1 = this.x;
    this.ay1= 200;
    this.cx1= this.w/3;
    this.cy1= this.ay1 - 100;
    this.cx2= (this.w/3) * 2;
    this.cy2= this.ay1 - 100;
    this.ax2= this.w;
    this.ay2= 200;
  }

  setScale() {
      for (let i = 0; i < this.scale.length; i++) {
        let nextNote = NOTES[this.scale[i]] + this.octave;
        if (i === this.scale.length - 2) {
          this.octave += 1;
        }
        this.sArray.push(nextNote);
      }
  }

  bezierLayout() {
    this.step = 1 / (this.numObs - 1);
    let currentCoord = getBezierXY(this.t, this.ax1, this.ay1, this.cx1, this.cy1, this.cx2, this.cy2, this.ax2, this.ay2);
    let objectRad = (this.w / this.numObs) / 4;
    let hue = 0;

    for (let i = 0; i < this.sArray.length; i++) {
      let hueStep = 360/NOTES.length;
      let o = new SoundObject(currentCoord.x, currentCoord.y, objectRad, hue, 90, 90, this.sArray[i], "8n", this.keypointTriggers);
      this.soundObs.push(o);
      this.t += this.step;
      currentCoord = getBezierXY(this.t, this.ax1, this.ay1, this.cx1, this.cy1, this.cx2, this.cy2, this.ax2, this.ay2);

      for (let n = 0; n < NOTES.length; n++) {
        if (this.sArray[i].includes(NOTES[n])) {
          hue += hueStep;
        }
      }
    }
  }



}

class SoundObject {
  constructor(x, y, rad, h, s, b, note, duration, keypointTriggers) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.h = h;
    this.s = s;
    this.b = b;
    this.note = note;
    this.duration = duration;
    this.played = false;
    this.dragging = false;
    this.keypointTriggers = keypointTriggers;

  }

  display() {
    noStroke();
    colorMode(HSB);
    ellipseMode(RADIUS);

    let radius = this.rad;
    let hue = this.h;
    let step = (360 / this.rad) * 3;

    for (let r = radius; r > 0; --r) {
      fill(hue, this.s, this.b);
      ellipse(this.x, this.y, r, r);
      hue += 1;
    }

    colorMode(RGB);
  } // display

  checkPosition(x, y) {
    let keyX = x;
    let keyY = y;
    if (keyX > (this.x - this.rad) && keyX < (this.x + this.rad) ) {
      if (keyY > (this.y - this.rad) && keyY < (this.y + this.rad) ) {
        if (this.played === false) {
          this.playSound();
        }
      }
    }

  } // checkPosition

  playSound() {
    synth.triggerAttackRelease(this.note, this.duration);
    this.showActive();

  } // playSound

  showActive() {
    let prevS = this.s;
    let prevB = this.b
    let prevH = this.h;
    this.s = 360;
    this.b = 360;
    this.h += 20;
    this.played = true;
    setTimeout(()=>{
      this.played = false;
      this.s = prevS;
      this.b = prevB;
      this.h = prevH;
    }, 500);
  }

  draggable() {
    if (mouseX > (this.x - this.rad) && mouseX < (this.x + this.rad) ) {
      if (mouseY > (this.y - this.rad) && mouseY < (this.y + this.rad) ) {
        this.dragging = true;
      }
    }

    if (mouseIsPressed && this.dragging === true) {
      this.x = mouseX;
      this.y = mouseY;
    } else if (!mouseIsPressed) {
      this.dragging = false;
    }

  } // draggable


}

class harmonizerObject {
  constructor(x, y, rad, h, s, b, note, duration) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.h = h;
    this.s = s;
    this.b = b;
    this.note = note;
    this.duration = duration;
    this.played = false;
    this.dragging = false;

  }

  display() {
    noStroke();
    colorMode(HSB);
    ellipseMode(RADIUS);

    let radius = this.rad;
    let brightness = 0;

    for (let r = radius; r > 0; --r) {
      fill(this.h, this.s, brightness);
      ellipse(this.x, this.y, r, r);
      brightness = (brightness + 1) % 360;
    }

    colorMode(RGB);
  } // display

  checkPosition(x, y) {
    let keyX = x;
    let keyY = y;
    if (keyX > (this.x - this.rad) && keyX < (this.x + this.rad) ) {
      if (keyY > (this.y - this.rad) && keyY < (this.y + this.rad) ) {
        if (this.played === false) {
          this.playSound();
        }
      }
    }

  } // checkPosition

  playSound() {
    synth.triggerAttackRelease(this.note, this.duration);
    this.showActive();

  } // playSound

  showActive() {
    let prevS = this.s;
    let prevB = this.b
    let prevH = this.h;
    this.s = 360;
    this.b = 360;
    this.h += 20;
    this.played = true;
    setTimeout(()=>{
      this.played = false;
      this.s = prevS;
      this.b = prevB;
      this.h = prevH;
    }, 500);
  }

  draggable() {
    if (mouseX > (this.x - this.rad) && mouseX < (this.x + this.rad) ) {
      if (mouseY > (this.y - this.rad) && mouseY < (this.y + this.rad) ) {
        this.dragging = true;
      }
    }

    if (mouseIsPressed && this.dragging === true) {
      this.x = mouseX;
      this.y = mouseY;
    } else if (!mouseIsPressed) {
      this.dragging = false;
    }

  } // draggable
}
