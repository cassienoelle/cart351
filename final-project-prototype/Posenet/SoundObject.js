"use strict";

class SoundObject {
  constructor(x, y, w, h, r, g, b, note, duration) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.g = g;
    this.b = b;
    this.note = note;
    this.duration = duration;
    this.played = false;
  }

  display() {
    fill(this.r,this.g,this.b);
    noStroke();
    ellipse(this.x, this.y, this.w, this.h);
  }

  checkPosition(x, y) {
    let keyX = x;
    let keyY = y;
    if (keyX > (this.x - this.w/2) && keyX < (this.x + this.w/2) ) {
      if (keyY > (this.y - this.h/2) && keyY < (this.y + this.h/2) ) {
        if (this.played === false) {
          this.playSound();
          this.played = true;
        }
      }
    } else {
      this.played = false;
    }
  }

  playSound() {
    synth.triggerAttackRelease(this.note, this.duration);
  }
}
