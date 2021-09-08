
const Levels = class {

	constructor(ctx, backgroundImage, enemyTypesObj, winPointsNum) {

		let theErr = 0;
		const validateBgImg = (value) => {
			if(typeof(value) != 'string') {
				theErr = 101;
				console.error('validateBgImg', 'Invalid Value:', value);
				return '';
			}
			return String(value);
		};

		const validateEnemyTypes = (value) => {
			if(typeof(value) != 'object') {
				theErr = 102;
				console.error('validateEnemyTypes', 'Invalid Value:', value);
				return null;
			}
			return value;
		};

		const validateWinPoints = (value) => {
			if(typeof(value) != 'number') {
				theErr = 103;
				console.error('validateWinPoints', 'Invalid Value:', value);
				return 1;
			}
			value = Math.ceil(value); // force integer
			if(isNaN(value) || !isFinite(value) || (value < 1)) {
				console.error('validateWinPoints', 'Invalid Value:', value);
				return 1;
			}
			return value;
		};

		this.backgroundImage = validateBgImg(backgroundImage);
		this.enemyTypesObj = validateEnemyTypes(enemyTypesObj);
		this.winPointsNum = validateWinPoints(winPointsNum);
		if(theErr !== 0) {
			console.error('Levels', 'ERROR:', theErr);
			return; // stop here
		}

		(() => {
			const background = new Image();
			background.src = String(backgroundImage);
			ctx.drawImage(background, 0, 0);
		})();

	}

}
