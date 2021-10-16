var level7 = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function Preload(){
		Phaser.Scene.call(this, {key: 'Level7'});
	},
	preload: function() {
		map = [
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0,-1 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0,-1 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0,-1 ],
		[ 0, 0,-1,-1,-1,-1,-1,-1,-1,-1 ],
		[ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0 ],
		[-1,-1,-1, 0, 0, 0, 0, 0, 0, 0 ],
		[-1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[-1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[-1,-1,-1,-1, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0,-1, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0,-1, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0,-1, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0,-1, 0, 0, 0, 0, 0, 0 ]
		];
		mapPath = [
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 3, 0, 0, 0, 0, 0, 0, 2 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 5, 0, 4, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 6, 0, 0, 7, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 8, 0, 0, 0, 0, 0, 0 ]
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
						name: 'enemy5',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'1': {
						name: 'enemy5',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'2': {
						name: 'enemy5',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'3': {
						name: 'enemy5',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'4': {
						name: 'enemy3',
						spawnSpeed: 4000, //for next enemy spawn
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'5': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'6': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'7': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'8': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'9': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'10': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'11': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 200,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'12': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 1000,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'13': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 300,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'14': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 500,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'15': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 500,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'16': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 500,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'17': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 1000,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'18': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 1000,
						movementSpeed: 0.00002,
						pays: 40,
						takesHealth: 1
					}
				},
				{
					waveNumber: 2,
					enemyCount: 19,
					startTime: 5000,
					'0': {
						name: 'enemy1',
						spawnSpeed: 4000,
						hp: 500,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'1': {
						name: 'enemy3',
						spawnSpeed: 4000,
						hp: 500,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'2': {
						name: 'enemy3',
						spawnSpeed: 4000,
						hp: 500,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'3': {
						name: 'enemy5',
						spawnSpeed: 4000,
						hp: 500,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'4': {
						name: 'enemy3',
						spawnSpeed: 4000, //for next enemy spawn
						hp: 500,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'5': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 2000,
						movementSpeed: 0.00001,
						pays: 20,
						takesHealth: 1
					},
					'6': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 500,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'7': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 800,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'8': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 800,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'9': {
						name: 'enemy5',
						spawnSpeed: 4000,
						hp: 800,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'10': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 800,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'11': {
						name: 'enemy2',
						spawnSpeed: 4000,
						hp: 800,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'12': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 800,
						movementSpeed: 0.00001,
						pays: 10,
						takesHealth: 1
					},
					'13': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 2000,
						movementSpeed: 0.00002,
						pays: 20,
						takesHealth: 1
					},
					'14': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'15': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'16': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'17': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 1500,
						movementSpeed: 0.00002,
						pays: 20,
						takesHealth: 1
					},
					'18': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 2000,
						movementSpeed: 0.00002,
						pays: 40,
						takesHealth: 1
					}
				},
				{
					waveNumber: 3,
					enemyCount: 19,
					startTime: 5000,
					'0': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'1': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'2': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'3': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'4': {
						name: 'enemy3',
						spawnSpeed: 3000, //for next enemy spawn
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'5': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 3000,
						movementSpeed: 0.00002,
						pays: 20,
						takesHealth: 1
					},
					'6': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'7': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00003,
						pays: 20,
						takesHealth: 1
					},
					'8': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'9': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 3000,
						movementSpeed: 0.00002,
						pays: 20,
						takesHealth: 1
					},
					'10': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'11': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 3000,
						movementSpeed: 0.00002,
						pays: 20,
						takesHealth: 1
					},
					'12': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'13': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'14': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'15': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 3000,
						movementSpeed: 0.00002,
						pays: 20,
						takesHealth: 1
					},
					'16': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 1800,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'17': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 3500,
						movementSpeed: 0.00002,
						pays: 20,
						takesHealth: 1
					},
					'18': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 4500,
						movementSpeed: 0.00002,
						pays: 40,
						takesHealth: 1
					}
				},
				{
					waveNumber: 4,
					enemyCount: 19,
					startTime: 5000,
					'0': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 2500,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'1': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'2': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'3': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 3500,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'4': {
						name: 'enemy3',
						spawnSpeed: 3000, //for next enemy spawn
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'5': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'6': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'7': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 2500,
						movementSpeed: 0.00003,
						pays: 20,
						takesHealth: 1
					},
					'8': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 3000,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'9': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'10': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'11': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 4000,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'12': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'13': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'14': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'15': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 4000,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'16': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'17': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 5000,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'18': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 5500,
						movementSpeed: 0.00002,
						pays: 40,
						takesHealth: 1
					}
				},
				{
					waveNumber: 5,
					enemyCount: 19,
					startTime: 5000,
					'0': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'1': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'2': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 3200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'3': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'4': {
						name: 'enemy3',
						spawnSpeed: 3000, //for next enemy spawn
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'5': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'6': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'7': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 4000,
						movementSpeed: 0.00003,
						pays: 20,
						takesHealth: 1
					},
					'8': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'9': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'10': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'11': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 4000,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'12': {
						name: 'enemy2',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'13': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 3200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'14': {
						name: 'enemy3',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'15': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'16': {
						name: 'enemy',
						spawnSpeed: 3000,
						hp: 2200,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'17': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 8000,
						movementSpeed: 0.00002,
						pays: 10,
						takesHealth: 1
					},
					'18': {
						name: 'enemy5',
						spawnSpeed: 3000,
						hp: 10000,
						movementSpeed: 0.00002,
						pays: 40,
						takesHealth: 1
					}
				},
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
						},
						{
							cost: 20,
							range: 25,
							damage: 25,
							speed: 20,
							fireRate: 90,
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
					damage: 70,
					range: 50,
					cost: 30,
					sell: 10,
					gunCount: 1,
					upgradeList: [
						{
							cost: 15,
							range: 10,
							damage: 20,
							speed: 10,
							fireRate: 30,
						},
						{
							cost: 20,
							range: 15,
							damage: 20,
							speed: 15,
							fireRate: 60,
						},
						{
							cost: 25,
							range: 20,
							damage: 25,
							speed: 20,
							fireRate: 90,
						}
					]
				},
				'laser' : {
					parentName: 'laser',
					ammo: 'beam',
					speed: 250,
					stuntime: 0,
					aoeDistance: 0,
					fireRate: 2500,
					lifespan: 2000,
					damage: 15,
					range: 100,
					cost: 40,
					sell: 20,
					gunCount: 1,
					upgradeList: [
						{
							cost: 20,
							range: 15,
							damage: 15,
							speed: 15,
							fireRate: 35,
						},
						{
							cost: 25,
							range: 20,
							damage: 20,
							speed: 25,
							fireRate: 60,
						}
					]
				},
				'machinegun' : {
					parentName: 'machinegun',
					ammo: 'machinebullet',
					speed: 200,
					stuntime: 0,
					aoeDistance: 0,
					fireRate: 200,
					lifespan: 2000,
					damage: 5,
					range: 100,
					cost: 20,
					sell: 10,
					gunCount: 1,
					upgradeList: [
						{
							cost: 20,
							range: 5,
							damage: 2,
							speed: 10,
							fireRate: 10,
						},
						{
							cost: 25,
							range: 5,
							damage: 2,
							speed: 15,
							fireRate: 10,
						},
						{
							cost: 25,
							range: 5,
							damage: 2,
							speed: 20,
							fireRate: 10,
						},
						{
							cost: 25,
							range: 5,
							damage: 4,
							speed: 25,
							fireRate: 20,
						},
					]
				},
				'stun' : {
					parentName: 'stun',
					ammo: 'bulletstun',
					speed: 200,
					stuntime: 1000,
					aoeDistance: 0,
					fireRate: 2000,
					lifespan: 2000,
					damage: 2,
					range: 50,
					cost: 20,
					sell: 10,
					gunCount: 1,
					upgradeList: [
						{
							cost: 20,
							range: 10,
							damage: 10,
							speed: 10,
							fireRate: 30,
						},
						{
							cost: 25,
							range: 15,
							damage: 15,
							speed: 15,
							fireRate: 60,
						},
						{
							cost: 30,
							range: 20,
							damage: 20,
							speed: 20,
							fireRate: 120,
						},
						{
							cost: 35,
							range: 25,
							damage: 25,
							speed: 25,
							fireRate: 240,
						},
					]
				},
			}
		},
		money = {
			starthealth: 5,
			health: 5, // level health
			enemyHitForHealth: 1, //when enemy crosses line
			amount: 40, //cash
			amountOnNextWave: 10 //cash when next wave is pressed
		};
	},
	create: function() {
		levelManager.create(this);
	},
	update: function(time, delta) {
		levelManager.update(time, delta, this);
	}
});
towerD.scenes.push(level7);
