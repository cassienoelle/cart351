"use strict";

class SoundObject {
  constructor(x, y, rad, r, g, b, note, duration) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.r = r;
    this.g = g;
    this.b = b;
    this.note = note;
    this.duration = duration;
    this.played = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  display() {
    // fill(0, 255, 0);
    // noStroke();
    // ellipse(this.x, this.y, this.w*2, this.h*2);
    fill(this.r,this.g,this.b);
    noStroke();
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.rad, this.rad);
  }

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
    /* else if (keyX < (this.x - this.w) || keyX > (this.x + this.w) || keyY < (this.y - this.h) || keyY > (this.y + this.h) ) {
      this.played = false;
    }
    */

  }

  playSound() {
    synth.triggerAttackRelease(this.note, this.duration);
  }

  draggable() {
    if (mouseX > (this.x - this.w/2) && mouseX < (this.x + this.w/2) ) {
      if (mouseY > (this.y - this.h/2) && mouseY < (this.y + this.h/2) ) {

        if (mouseIsPressed) {
          this.x = mouseX;
          this.y = mouseY;
        }

      }
    }
  }


}
