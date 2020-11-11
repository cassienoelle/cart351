"use strict";

class SoundObject {
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
          this.played = true;
          setTimeout(()=>{
            this.played = false;
          }, 500);
        }
      }
    }

  } // checkPosition

  playSound() {
    synth.triggerAttackRelease(this.note, this.duration);

  } // playSound

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
