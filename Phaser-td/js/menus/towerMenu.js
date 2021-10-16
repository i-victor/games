var towerMenu = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:function MainMenu(){
		Phaser.Scene.call(this, {key: 'TowerMenu'});
	},
	preload: function() {
		// Preload images for this state
	},
	stopMenu: function(){
		game.scene.stop('TowerMenu');
	},
	capitalizeFirstLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	buttonPositions: [],
	createButton: function(x, y, name){
		var width = 40,
			height = 40,
			imageX = 0,
			imageY = 0,
			textX = 0,
			textY = 0,
			text;

			if(this.buttonPositions.length <= 0){
				imageX = width + this.rectPosition.x;
				imageY = this.rectPosition.y + height;
				textX = imageX;
				textY = imageY + height/2;
			}else{
				var old = this.buttonPositions[this.buttonPositions.length -1];
				imageX = old.imageX + width;
				imageY = old.imageY;
				textX = old.textX + width;
				textY = old.textY;
			}

			this.buttonPositions.push({
				imageX: imageX,
				imageY: imageY,
				textX: textX,
				textY: textY
			});

			this[name] = this.add.image(imageX, imageY, 'sprites', name),
			this[name].setScale(1.2, 1.2);
			this[name].setOrigin(0.5,0.5);
			this[name].setInteractive();
			this[name].name = name;
			this[name].on('pointerup', function(){
				var towerName = this[name].name;
				if(money.amount >= towerInfo.info[towerName].cost){
					money.amount = money.amount - towerInfo.info[towerName].cost;
					Tower.placeTower(towerName);
					game.scene.stop('TowerMenu');
					this.noMoneyText.alpha = 0;
				}else{
					this.noMoneyText.alpha = 1;
					//do something for not enough money
				}
			}, this);

			text = this.add.text(textX, textY, '$' + towerInfo.info[name].cost, { fontSize: '12px', fill: '#fff'});
			text.setOrigin(0.5, 0.5);
	},
	createHolder: function(){
		var width = 40 * (Object.keys(towerInfo.info).length + 1),
			height = 80,
			x = Math.round(screen.width/2 - width/2),
			y = pointerRef.y * tileSize - height,
			rect,
			graphics;
		if(y < 0){
			y = height;
		}
		graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
		graphics.lineStyle(1, 0xffffff, 1);
		graphics.strokeRoundedRect(x, y, width, height, 5);
		graphics.fillRoundedRect(x, y, width, height, 5);

		this.rectPosition = new Phaser.Geom.Rectangle(x, y, width, height);
	},
	createClose: function(){
		var offset = 4,
			x,
			y,
			text;
			text = this.add.text(0, 0, "X");
			x = this.rectPosition.x + this.rectPosition.width - text.width - offset;
			y = this.rectPosition.y + offset;
			text.x = x;
			text.y = y;
			text.setInteractive();
			text.on('pointerdown', function(pointer, gameObject) {
				game.scene.stop('TowerMenu');
			});
	},
	createNoMoneyText: function(){
		this.noMoneyText = this.add.text(0, 0, "Not Enough Money", { fontSize: '12px', fill: '#fff'});
		this.noMoneyText.x = screen.width/2;
		this.noMoneyText.y = this.rectPosition.y - this.noMoneyText.height/2;
		this.noMoneyText.setOrigin(0.5,0.5);
		this.noMoneyText.alpha = 0;
	},
	create: function() {
		this.buttonPositions = [];
		this.createHolder();
		this.createClose();
		this.createNoMoneyText();
		var that = this;
		Object.keys(towerInfo.info).forEach(function(key, index) {
			that.createButton(0, 100, key);
		});
	},
	update: function() {
		// Update objects & variables
	}
});

towerD.scenes.push(towerMenu);
