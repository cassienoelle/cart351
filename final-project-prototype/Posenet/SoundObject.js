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
    this.offsetX = 0;
    this.offsetY = 0;
  }

  display() {
    // fill(0, 255, 0);
    // noStroke();
    // ellipse(this.x, this.y, this.w*2, this.h*2);
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
