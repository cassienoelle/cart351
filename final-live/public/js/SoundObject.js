"use strict";

//test class

class SoundObject {
  constructor(p, cat, note, dur, x, y, w, h, hue, s, b, img=" ") {
    this.p = p; // p5 instance
    this.cat = cat; // category
    this.note = note; // note
    this.dur = dur; // duration of note
    this.x = x;
    this.y = y;
    thix.w = w;
    this.h = h;

    this.hue = hue;
    this.s = s;
    this.b = b;

    this.img = img; // for instruments displayed using an image, optional

    this.collision = false; // track collision with keypoint
    this.play = false; // trigger play note

  }

  display() {

    switch(this.cat) {
      case "keys":
        this.p.noStroke();
        this.p.colorMode(this.p.HSB);
        this.p.ellipseMode(this.p.RADIUS);

        let radius = this.w;
        let hue = this.hue;
        let step = (360 / this.w) * 3;

        for (let r = radius; r > 0; --r) {
          this.p.fill(hue, this.s, this.b);
          this.p.ellipse(this.x, this.y, r, r);
          hue += 1;
        }
        break;
      default:
        break;
    }
  } // display

  update() {

  } // update

  checkCollision(x, y) {
    let kX = x;
    let ky = y;
    if (kX > (this.x - this.w/2) && kX < (this.x + this.w/2) ) {
      if (kY > (this.y - this.h/2) && kY < (this.y + this.h/2) ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  playSound() {

  } // playSound

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
      this.h = prevH;
    }, 500);
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
