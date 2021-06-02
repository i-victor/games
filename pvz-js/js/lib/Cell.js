// Cell.js

//console.log('Cell.js loaded ok');

const Cell = class {

	constructor(x, y, cellSize) {
		this.x = x;
		this.y = y;
		this.width = cellSize;
		this.height = cellSize;
	}

	draw(ctx, mouse, collision) {
		if(mouse.x && mouse.y && collision(this, mouse)) {
			ctx.strokeStyle = 'black';
			ctx.strokeRect(this.x, this.y, this.width, this.height);
		}
	}

}; //END CLASS

// #end js
