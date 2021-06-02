// FloatingMessages.js

//console.log('FloatingMessages.js loaded ok');

const FloatingMessages = class {

	constructor(value, x, y, size, color) {
		this.value = value;
		this.x = x;
		this.y = y;
		this.size = size;
		this.lifeSpan = 0;
		this.color = color;
		this.opacity = 1;
	}

	update() {
		this.y -= 0.3;
		this.lifeSpan += 1;
		if(this.opacity > 0.03) {
			this.opacity -= 0.03;
		}
	}

	draw(ctx) {
		ctx.globalAlpha = this.opacity;
		ctx.fillStyle = this.color;
		ctx.font = this.size + 'px Orbitron';
		ctx.fillText(this.value, this.x, this.y);
		ctx.globalAlpha = 1;
	}

};

// #end js
