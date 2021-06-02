// Resource.js

//console.log('Resources.js loaded ok');

const Resource = class {

	constructor(canvas, cellSize, defenderX, defenderY, amounts) {

		if(defenderX != undefined) {
			this.x = defenderX;
		} else {
			this.x = Math.random() * (canvas.width - cellSize);
		}
		if(defenderY != undefined) {
			this.y = defenderY;
		} else {
			this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
		}

		this.width = cellSize * 0.6;

		this.height = cellSize * 0.6;

		amounts = 50;

		this.amount = amounts;
	//	let def3 = defenders[0];
	//	let def3X = def3.getX();
	//	let def3Y = def3.getY();
	}//END FUNCTION

	draw(ctx) {
		//ctx.fillStyle = 'yellow';
		//ctx.fillRect(this.x, this.y, this.width, this.height);

		let sun = new Image();
		sun.src = 'assets/sun.png';

		ctx.drawImage(sun, this.x, this.y, this.width, this.height);
		ctx.font = '20px Orbitron';
		//ctx.fillText(this.amount, this.x + 15, this.y + 25);
	}//END FUNCTION

}; //END CLASS

// #end js
