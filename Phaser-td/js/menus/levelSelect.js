var LevelSelect = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function LevelSelect() {
		Phaser.Scene.call(this, {
			key: 'LevelSelect'
		});
	},
	preload: function() {
		// Preload images for this state
	},
	create: function() {
		var levels = levelCount;
		var spacing = 10;
		var colums = 4;
		var rows = 6;
		var width = (screen.width / colums) - 12;
		var height = width;
		var x = 0;
		var y = 0;
		var topOffset = screen.height / 2 - (width * (levels / rows));

		function getCoordinateByNum(num) {
			return spacing + num * (spacing + width);
		}

		var levelNum = 0;
		for (i = 0; i < rows; i++) {
			for (j = 0; j < colums; j++) {
				levelNum++;
				if (levelNum > levels) {
					return;
				}
				x = getCoordinateByNum(j);
				y = getCoordinateByNum(i);
				y = y + topOffset;
				graphics = this.add.graphics();
				graphics.lineStyle(1, 0xffffff, 1);
				graphics.strokeRoundedRect(x, y, width, height, 5);
				graphics.fillStyle(0xffff00, 1);
				//graphics.fillRoundedRect(x, y, width, height, 5);
				//graphics.fillStyle(0xff00ff, 1);

				var text = this.add.text(x + width / 2, y + height / 2, levelNum, {
					fontSize: '40px',
					fill: '#fff'
				});
				text.setOrigin(0.5, 0.5);
				text.name = levelNum;

				var percent = this.add.text(x + width / 2, y + height / 2 + 30, storageInfo.levelPercent(levelNum) + "%", {
					fontSize: '10px',
					fill: '#fff'
				});
				percent.setOrigin(0.5, 0.5);

				if (storageInfo.getDisplayLevels() < levelNum || levelNum > levelCount) {
					graphics.alpha = 0.5;
					text.alpha = 0.5;
					percent.alpha = 0.5;
				} else {
					text.setInteractive();
					text.on('pointerup', function() {
						game.scene.stop('LevelSelect');
						game.scene.start('Level' + this.name);
						currentLevel = 'Level' + this.name;
						levelPlaying = true;
					});
				}
			}

		}
	},
	update: function() {
		// Update objects & variables
	}
});

towerD.scenes.push(LevelSelect);
