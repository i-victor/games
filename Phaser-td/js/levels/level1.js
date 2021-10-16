var level1 = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function Preload(){
		Phaser.Scene.call(this, {key: 'Level1'});
	},
	preload: function() {

		map = [
		[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0 ],
		[ 0, 0,-1,-1,-1,-1,-1,-1, 0, 0 ],
		[ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0 ],
		[-1,-1,-1, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		];

		mapPath = [
		[0, 0, 0, 0, 0, 0, 0, 5, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 3, 0, 0, 0, 0, 4, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 2, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];

		enemyWave = {
			currentWave: 0,
			allWaves: 5,
			count : 0,
			waves : [
				{
					waveNumber: 1,
					enemyCount: 19,
					startTime: 0,
					'0': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 300,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'1': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 300,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'2': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 300,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'3': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 300,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'4': {
						name: 'enemy',
						spawnSpeed: 5000, //for next enemy spawn
						hp: 300,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					/* ************************* */
					'5': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 600,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'6': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 600,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'7': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 600,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'8': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 600,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'9': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 600,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'10': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 600,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'11': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 600,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'12': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 600,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					/* ************************* */
					'13': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'14': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'15': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'16': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'17': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'18': {
						name: 'enemy',
						spawnSpeed: 5000,
						hp: 800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					}
				},
				{
					waveNumber: 2,
					startTime: 5000,
					enemyCount: 13,
					'0': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'1': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'2': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'3': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'4': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'5': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'6': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'7': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'8': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'9': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'10': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'11': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'12': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 900,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
				},
				{
					waveNumber: 3,
					startTime: 5000,
					enemyCount: 13,
					'0': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'1': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'2': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'3': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'4': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'5': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'6': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'7': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'8': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'9': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'10': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1500,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'11': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'12': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
				},
				{
					waveNumber: 4,
					startTime: 5000,
					enemyCount: 13,
					'0': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'1': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'2': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'3': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
					'4': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'5': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'6': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'7': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'8': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'9': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'10': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 1800,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'11': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2100,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'12': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2100,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
				},
				{
					waveNumber: 5,
					startTime: 5000,
					enemyCount: 14,
					'0': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2200,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'1': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2200,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'2': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2200,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'3': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2200,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'4': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2200,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'5': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2200,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'6': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2400,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'7': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2400,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'8': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2400,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'9': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2400,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'10': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2400,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'11': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 2400,
						movementSpeed: 0.00004,
						pays: 10,
						takesHealth: 1
					},
					'12': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 3000,
						movementSpeed: 0.00005,
						pays: 10,
						takesHealth: 1
					},
					'13': {
						name: 'enemy',
						spawnSpeed: 4000,
						hp: 9000,
						movementSpeed: 0.00003,
						pays: 10,
						takesHealth: 1
					},
				}
			]
		},
		towerInfo = {
			pickedTower: '',
			currentTower: '',
			info: {
				'turret' : {
					parentName: 'turret',
					ammo: 'bullet',
					speed: 200,
					stuntime: 0,
					aoeDistance: 0,
					fireRate: 1000,
					lifespan: 2000,
					damage: 30,
					range: 100,
					cost: 20,
					sell: 10,
					gunCount: 1,
					upgradeList: [
						{
							cost: 10,
							range: 10,
							damage: 10,
							speed: 10,
							fireRate: 30,
						},
						{
							cost: 15,
							range: 15,
							damage: 15,
							speed: 15,
							fireRate: 60,
						}
					]
				},
				'cannon' : {
					parentName: 'cannon',
					ammo: 'cannonball',
					speed: 200,
					stuntime: 0,
					aoeDistance: 0,
					fireRate: 2000,
					lifespan: 2000,
					damage: 60,
					range: 50,
					cost: 30,
					sell: 10,
					gunCount: 1,
					upgradeList: [
						{
							cost: 15,
							range: 10,
							damage: 10,
							speed: 10,
							fireRate: 30,
						},
						{
							cost: 20,
							range: 15,
							damage: 15,
							speed: 15,
							fireRate: 60,
						}
					]
				}
			}
		},
		money = {
			starthealth: 5,
			health: 5, // level health
			enemyHitForHealth: 1, //when enemy crosses line
			amount: 40, //cash
			amountOnNextWave: 10 //cash when next wave is pressed
		};

		this.load.svg('map', 'assets/maps/map.svg', { scale: 1 });
	},
	create: function() {
		levelManager.create(this);

		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2 - 130;
		var mapImg = this.add.image(screenCenterX, screenCenterY, 'map');

		levelManager.drawGridLines(this);

	},
	update: function(time, delta) {
		levelManager.update(time, delta, this);
	}
});
towerD.scenes.push(level1);
