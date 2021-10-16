var SellUpgrade = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:function MainMenu(){
		Phaser.Scene.call(this, {key: 'SellUpgrade'});
	},
	preload: function() {
		// Preload images for this state
	},
	stopMenu: function(){
		game.scene.stop('SellUpgrade');
	},
	capitalizeFirstLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	createButton: function(x, y, name){
		var text = this.add.text(textX, textY, name, { fontSize: '12px', fill: '#fff'}),
			spacingFromSide = 30,
			textX = this.rectPosition.x + spacingFromSide,
			textY = this.rectPosition.y + this.rectPosition.height/2,
			tower = towerInfo.info[towerAtLocation.name],
			upgradeCount = 0,
			sellAmount = 0;

			textY = textY - 5;

			if(towerAtLocation.upgrades){
				upgradeCount = towerAtLocation.upgrades;
			}else{
				towerAtLocation.upgrades = 0;
			}

			text.setInteractive();
			if(name === 'Upgrade'){
				var costText;
				var upgradeCost;
				var upgradeList = towerAtLocation.upgradeList;
				text.text = "Upgrade(" + upgradeCount + ")";
				textX = this.rectPosition.x + this.rectPosition.width - (text.width/2 + spacingFromSide);
				if(upgradeList[upgradeCount]){
					upgradeCost = "$" + upgradeList[upgradeCount].cost;
				}else{
					upgradeCost = 'MAX';
				}
				costText = this.add.text(textX, textY + 15, upgradeCost, { fontSize: '12px', fill: '#fff'});
				costText.setOrigin(0.5, 0.5);
				text.on('pointerdown', function(pointer, gameObject) {
					if(upgradeCount < upgradeList.length){
						if(money.amount >= upgradeList[upgradeCount].cost){
							towerAtLocation.upgrades = towerAtLocation.upgrades + 1;
							towerAtLocation.range = towerAtLocation.range + upgradeList[upgradeCount].range; //update range
							towerAtLocation.damage = towerAtLocation.damage + upgradeList[upgradeCount].damage;
							money.amount = money.amount - upgradeList[upgradeCount].cost;
							towerAtLocation.speed = towerAtLocation.speed + upgradeList[upgradeCount].speed;
							towerAtLocation.fireRate = towerAtLocation.fireRate - upgradeList[upgradeCount].fireRate;

							//if(upgradeCount + 1 === 3){
							  //  towerAtLocation.gunCount = 2;
							//}

							towerAtLocation.sell = Math.floor(tower.sell + upgradeList[upgradeCount].cost/2);
							game.scene.stop('SellUpgrade');
						}else{
							console.log('not enough money');
							//not enough money
							costText.text = "NA";
						}
					}else{
						console.log('max upgrades');
						//max upgrades
					}
				});
			}else{
				var sellText;
				sellAmount = towerAtLocation.sell || tower.sell;
				text.text = "Sell";
				textX = textX + 10;
				sellText = this.add.text(textX, textY + 15, "$" + sellAmount, { fontSize: '12px', fill: '#fff'});
				sellText.setOrigin(0.5, 0.5);
				text.on('pointerdown', function(pointer, gameObject) {
					towerAtLocation.active = false;
					towerAtLocation.visible = false;
					towerAtLocation.updateCount.setActive(false);
					towerAtLocation.updateCount.setVisible(false);
					money.amount = money.amount + sellAmount;
					towerAtLocation.upgrades = 0;
					map[towerXY.y][towerXY.x] = 0;
					game.scene.stop('SellUpgrade');
				}, sellAmount, tower);
			}
			text.x = textX;
			text.y = textY;
			text.setOrigin(0.5, 0.5);
	},
	createHolder: function(){
		var width = 200,
			height = 60,
			x = screen.width/2 - width/2,
			y = pointerRef.y * tileSize - height,
			graphics;

		graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
		graphics.lineStyle(1, 0xffffff, 1);
		graphics.strokeRoundedRect(x, y, width, height, 5);
		graphics.fillRoundedRect(x, y, width, height, 5);
		this.rectPosition = new Phaser.Geom.Rectangle(x, y, width, height);
	},
	createStatText: function(x, y, text){
		var t = this.add.text(x, y, text, { fontSize: '10px', fill: '#fff'});
			t.x = t.x - t.width/2;
	},
	getStatDifference: function(stat){
		var baseTower = towerInfo.info[towerAtLocation.name];
		var baseStat = baseTower[stat];
		var updatedStat = towerAtLocation[stat];
		if(updatedStat - baseStat === 0){
			if(baseStat === 0){
				return "NA";
			}
			return baseStat;
		}else{
			if(stat === 'fireRate'){
				return baseStat + " - "  + Math.abs(updatedStat - baseStat) + " (" + updatedStat +")";
			}
			return baseStat + " + " + (updatedStat - baseStat) + " (" + updatedStat +")";
		}
	},
	createStats: function(){
		var width = 200,
			height = 100,
			x = screen.width/2 - width/2,
			y = pointerRef.y * tileSize + tileSize,
			graphics,
			padding = 4,
			textX,
			textY,
			vspacing = 16;

		graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
		graphics.lineStyle(1, 0xffffff, 1);
		graphics.strokeRoundedRect(x, y, width, height, 5);
		graphics.fillRoundedRect(x, y, width, height, 5);

		textX = screen.width/2 + padding;
		textY = y + padding;
		this.createStatText(textX, textY, "Damage: " + this.getStatDifference('damage'));
		this.createStatText(textX, textY + vspacing, "Range: " + this.getStatDifference('range'));
		this.createStatText(textX, textY + vspacing * 2, "Speed: " + this.getStatDifference('speed'));
		this.createStatText(textX, textY + vspacing * 3, "FireDelay: " + this.getStatDifference('fireRate'));
		this.createStatText(textX, textY + vspacing * 4, "StunTime: " + this.getStatDifference('stuntime'));
		this.createStatText(textX, textY + vspacing * 5, "AOEDistance: " + this.getStatDifference('aoeDistance'));

	},
	createClose: function(){
		var offset = 4,
			x,
			y,
			text;
			text = this.add.text(0, 0, "X");
			x = this.rectPosition.x + this.rectPosition.width - text.width - offset;
			y = this.rectPosition.y + this.rectPosition.height/2;
			text.x = x;
			text.y = y;
			text.setInteractive();
			text.setOrigin(0.5, 0.5);
			text.on('pointerdown', function(pointer, gameObject) {
				game.scene.stop('SellUpgrade');
			});
	},
	create: function() {
		this.createHolder();
		this.createStats();
		var that = this;
		that.createButton(0, 100, 'Upgrade');
		that.createButton(0, 100, 'Sell');
		this.createClose();
	},
	update: function() {
		// Update objects & variables
	}
});

towerD.scenes.push(SellUpgrade);
