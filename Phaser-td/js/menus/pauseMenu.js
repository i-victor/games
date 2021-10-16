var PauseMenu = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function PauseMenu() {
		Phaser.Scene.call(this, {
			key: 'PauseMenu'
		});
	},
	preload: function() {},
	create: function() {
		var rect, graphics, x, y, style, offsetTop;

		//background overlay
		rect = new Phaser.Geom.Rectangle(0, 0, screen.width, screen.height);
		graphics = this.add.graphics({
			fillStyle: {
				color: 0x000000
			}
		});
		graphics.alpha = 0.5;
		graphics.fillRectShape(rect);

		//text elements
		x = screen.width / 2;
		y = screen.height / 2;
		offsetTop = 60;
		style = {
			fontSize: '15px',
			fill: '#FFFFFF'
		};
		borderButton(this, x, y-offsetTop, 'Continue Level', style, PauseMenu.resumeLevel, true);
		borderButton(this, x, (y + 40) - offsetTop, 'Level Select', style, PauseMenu.levelSelect, true);
		borderButton(this, x, (y + 80) - offsetTop, 'Quit', style, mainMenuState.quit, true);
	},
	update: function() {}
});

PauseMenu.resumeLevel = function(){
	var levelNumber = currentLevel.replace('Level', '');
		game.scene.stop('PauseMenu');
		game.scene.resume(currentLevel);
		levelPaused = false;
};
PauseMenu.levelSelect = function(){
	game.scene.stop('PauseMenu');
	game.scene.stop(currentLevel);
	game.scene.start('LevelSelect');
	levelPaused = false;
};

towerD.scenes.push(PauseMenu);
