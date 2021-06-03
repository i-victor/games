// Defender.js
// depends on: Character, Resources

//(c) 2021 github.com/i-victor

//console.log('Defender.js loaded ok');

const Defender = class {

	constructor(chosenDefender, x, y, cellSize, cellGap) {

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

	draw(ctx) {

		let characterNumber1 = null;
		let characterNumber2 = null;
		let characterNumber3 = null;

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

		let projectile = 0;
		if(this.shooting && this.shootNow) {
			if(this.chosenDefender === 1) {
				projectile = 1;
				//console.log(projectile);
			} else if(this.chosenDefender === 2) {
				projectile = 2;
			}
			this.shootNow = false;
		}

		return projectile;

	} //END FUNCTION

	resource() {

		let resource = 0;

		if(this.chosenDefender === 3) {
			resource = 1;
		}

		return resource;

	}

}; //END CLASS

// #end js
