// Character.js
// depends on: ImgFrameLoader

console.log('Character.js loaded ok');

const Character = class {

	constructor(ctx, chosenDefender, shooting, shootNow, frameNum, x, y, width, height) {

		let animatedPerson = null;
		let animatedFrame = null;
		let spriteWidth = null;
		let spriteHeight = null;

		if(chosenDefender === 1) {
		//	if(shooting) {
		//		frameNum = 10;
		//	}
			spriteWidth = 70;
			spriteHeight = 72;
			animatedPerson = new ImgFrameLoader('characters', 'PeaShooter', 14);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 2) {
		//	if(shooting) {
		//		frameNum = 8;
		//	}
			spriteWidth = 200;
			spriteHeight = 195;
			animatedPerson = new ImgFrameLoader('characters', 'Cactus2', 14);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 3) {
			spriteWidth = 74;
			spriteHeight = 73;
			animatedPerson = new ImgFrameLoader('characters', 'SunFlower', 14);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		}

		if(animatedFrame) {
			ctx.drawImage(animatedFrame, 0, 0, spriteWidth, spriteHeight, x, y, width, height);

		}

	} //end constructor

} //END CLASS

// #end js
