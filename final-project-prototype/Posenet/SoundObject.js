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
      console.log("OVERLAP X");
      if (keyY > (this.y - this.h/2) && keyY < (this.y + this.h/2) ) {
        console.log("OVERLAP");
        console.log("keyX: " + keyX);
        console.log("this.x: " + this.x);
        console.log("keyY: " + keyY);
        console.log("this.y: " + this.y);
        this.playSound();
        return true;
      }
    } else {
      //return false;
    }
  }

  playSound() {
    synth.triggerAttackRelease(this.note, this.duration);
  }

}


/*
function checkPosition(x, y) {
  let keyX = x;
  let keyY = y;
  fill(0,255,0);
  ellipse(keyX, keyY, 50, 50);
  if (keyX > (eX - eW/2) && keyX < (eX + eW/2) ) {
    if (keyY > (eY -eW/2) && keyY < (eY + eW/2) ) {
      return true;
    }
  } else {
    return false;
  }
}
*/
