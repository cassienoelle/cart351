"use strict";

class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.05, 0.8);
		this.t = random(TAU);
	}

	display() {
		this.t += 0.05;
		var scale = this.size + sin(this.t) * 2;
    fill('rgba(255,255,255, 0.4)');
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}

	update() {
		this.x = random(width);
		this.y = random(height);
	}
}
