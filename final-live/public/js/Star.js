"use strict";

class Star {
	constructor(p, min, max) {
		this.p = p;
		this.min = min;
		this.max = max;
		this.x = this.p.random(this.p.width);
		this.y = this.p.random(this.p.height);
		this.size = this.p.random(this.min, this.max);
		this.t = this.p.random(this.p.TAU);
	}

	display() {
		this.t += 0.05;
		var scale = this.size + this.p.sin(this.t) * 2;
    this.p.fill('rgba(255,255,255, 0.4)');
		this.p.noStroke();
		this.p.ellipse(this.x, this.y, scale, scale);
	}

	update() {
		this.x = this.p.random(this.p.width);
		this.y = this.p.random(this.p.height);
	}
}
