// Defender.js
// depends on: Character

class Defender {

	constructor(ctx, chosenDefender, x, y, cellSize, cellGap) {

		this.x = x;
		this.y = y;

		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;

		this.shooting = false;
		this.shootNow = false;

		this.health = 100;

		this.projectiles = [];

		this.timer = 0;

		this.frameNum = 0;

		this.chosenDefender = chosenDefender;

	} //END FUNCTION

	draw(){

		if(this.chosenDefender === 1) {
			characterNumber1 = new Character(ctx, this.chosenDefender, this.shooting, this.shootNow, this.frameNum, this.x, this.y, this.width, this.height);
		} else if(this.chosenDefender === 2) {
			characterNumber2 = new Character(ctx, this.chosenDefender, this.shooting, this.shootNow, this.frameNum, this.x, this.y, this.width, this.height);
		} else if(this.chosenDefender === 3) {
			characterNumber3 = new Character(ctx, this.chosenDefender, this.shooting, this.shootNow, this.frameNum, this.x, this.y, this.width, this.height);
		}

	} //END FUNCTION

	update(frame) {

		if(frame % 6 === 0) {
			this.frameNum++;
			if(this.frameNum % 10 === 0) {
				this.shootNow = true;
			}
		}

//console.log('frameNum:', this.frameNum);

		let projectile = 0;
		if(this.shooting && this.shootNow) {
			if(this.chosenDefender === 1) {
				projectile = 1;
			} else if(this.chosenDefender === 2) {
				projectile = 2;
			}
			this.shootNow = false;
		}

		return projectile;

	} //END FUNCTION

} //END CLASS

// #end js