// ImgFrameLoader.js

console.log('ImgFrameLoader.js loaded ok');

class ImgFrameLoader {

	constructor(type, name, maxFrame) {

		this.type = String(type);

		this.name = String(name);

		this.maxFrame = Math.floor(maxFrame);
		if(this.maxFrame <= 0) {
			this.maxFrame = 0;
		}

		this.frames = [];

	} //END FUNCTION

	getImageFrame(frameNumber) {

		frameNumber = Math.floor(frameNumber % this.maxFrame);
		if(frameNumber <= 0) {
			frameNumber = 0;
		}
		if(frameNumber > this.maxFrame) {
			frameNumber = 0;
		}

		if(frameNumber >= 0) {
			if(this.frames[frameNumber] == undefined) {
				this.frames[frameNumber] = new Image();
				this.frames[frameNumber].src = 'assets/' + this.type + '/' + this.name + '/frames0' + (frameNumber > 9 ? frameNumber : '0' + frameNumber) + '.png';
			}
			return this.frames[frameNumber];
		}
		return null;

	} //END FUNCTION

} //END CLASS

// #end js
