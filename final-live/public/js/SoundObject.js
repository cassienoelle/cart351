"use strict";

//test class

class SoundObject {
  constructor(p, cat, note, dur, x, y, w, h, hue, s, b, kpts, img=" ") {
    this.p = p; // p5 instance
    this.cat = cat; // category
    this.note = note; // note
    this.dur = dur; // duration of note
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.kpts = kpts;

    this.hue = hue;
    this.s = s;
    this.b = b;

    this.img = img; // for instruments displayed using an image, optional

    this.collision = [false, false]; // track collision with keypoint
    this.play = [false, false]; // trigger play note
  }

  display() {
    switch(this.cat) {
      case "keys":
        this.p.noStroke();
        this.p.colorMode(this.p.HSB);
        this.p.ellipseMode(this.p.RADIUS);

        let radius = this.w/2;
        let hue = this.hue;
        let step = (360 / this.w) * 3;

        for (let r = radius; r > 0; --r) {
          this.p.fill(this.hue, this.s, this.b);
          this.p.ellipse(this.x, this.y, this.w, this.h);
          hue += 1;
         }
        this.p.colorMode(this.p.RGB);
        this.p.ellipseMode(this.p.CENTER);
        break;
      default:
        break;
    }
  } // display

  checkCollision(x, y) {
    let kX = x;
    let kY = y;
    if (kX > (this.x - this.w) && kX < (this.x + this.w) ) {
      if (kY > (this.y - this.h) && kY < (this.y + this.h) ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  playNote() {
    my.sampler.triggerAttackRelease(this.note, this.dur);
    console.log('PLAY');

  } // playSound

  getDataPack() {
    return {
      flag: FLAG.update,
      note: this.note,
      dur: this.dur
    }
  }

  showActive() {
    let prevS = this.s;
    let prevB = this.b;
    let prevH = this.hue;
    this.s = 360;
    this.b = 360;
    this.hue += 20;
    // this.played = true;
    setTimeout(()=>{
      // this.played = false;
      this.s = prevS;
      this.b = prevB;
      this.hue = prevH;
    }, 250);
  }

  draggable() {
    if (this.p.mouseX > (this.x - this.w/2) && this.p.mouseX < (this.x + this.w/2) ) {
      if (this.p.mouseY > (this.y - this.h/2) && this.p.mouseY < (this.y + this.h/2) ) {
        this.dragging = true;
      }
    }

    if (this.p.mouseIsPressed && this.dragging === true) {
      this.x = this.p.mouseX;
      this.y = this.p.mouseY;
    } else if (!this.p.mouseIsPressed) {
      this.dragging = false;
    }

  } // draggable

}
