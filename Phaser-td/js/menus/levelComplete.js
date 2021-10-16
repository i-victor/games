var LevelComplete = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
	function LevelComplete(){
		Phaser.Scene.call(this, {key: 'LevelComplete'});
	},
	preload: function() {
		// Preload images for this state
	},
	create: function() {
		var levelNumber = Number(currentLevel.replace('Level', '')),
			gameOver = levelNumber + 1 > levelCount ? true : false,
			notice,
			x = screen.width/2,
			y = screen.height/2,
			style = {
				fontSize: '15px',
				fill: '#fff'
			};

		notice = this.add.text(screen.width/2, screen.height/2, "Level Complete!");
		notice.setOrigin(0.5, 0.5);

		if(gameOver){ //if no more levels
		   notice.text = "Winner!";
		   borderButton(this, x, y + 30, 'Level Select', style, LevelComplete.pickLevel, true);
		}else{
		   //save level access
		   borderButton(this, x, y + 30, 'Next Level', style, LevelComplete.nextLevel, true);
		}
		storageInfo.saveLevel();
	},
	update: function() {
		// Update objects & variables
	}
});

LevelComplete.pickLevel = function(){
	game.scene.stop('LevelComplete');
	game.scene.start('LevelSelect');
};

LevelComplete.nextLevel = function(){
	var levelNumber = Number(currentLevel.replace('Level', ''));
		game.scene.stop('LevelComplete');
		game.scene.start('Level' + Number(levelNumber + 1));
		currentLevel = 'Level' + Number(levelNumber + 1);
};

towerD.scenes.push(LevelComplete);
