"use strict";

class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.05, 0.2);
		this.t = random(TAU);
	}

	display() {
		this.t += 0.05;
		var scale = this.size + sin(this.t) * 2;
    fill('rgba(255,255,255, 0.4)');
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}

class Planet {
  constructor(x, y, rad, h, s, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.h = h;
    this.s = s;
    this.b = b;
  }

  display() {
    colorMode(HSB);

    for (let r = this.rad; r > 0; i--) {
      fill(this.h,this.s,this.b);
      ellipse(this.x, this.y, this.rad, this.rad);
      this.h = (this.h + 1) % 360;
    }

    colorMode(RGB); // reset color mode
  }
}
