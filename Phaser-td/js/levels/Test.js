        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
var level1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Preload(){
        Phaser.Scene.call(this, {key: 'Level1'});
    },
    preload: function() {
        map = [
        [0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0,-1,-1,-1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0,-1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0,-1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0,-1,-1,-1,-1,-1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
        [0, 0,-1,-1,-1,-1,-1,-1, 0, 0],
        [0, 0,-1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0,-1, 0, 0,-1,-1,-1, 0, 0],
        [0, 0,-1, 0, 0,-1, 0,-1, 0, 0],
        [0, 0,-1,-1,-1,-1, 0,-1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0,-1, 0, 0]
        ];
        mapPath = [
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 3, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 0, 5, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 7, 0, 0, 0, 0, 6, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0,10, 0,11, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 8, 0, 0, 9, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0,12, 0, 0]
        ];
        enemyWave = {
            currentWave: 0,
            allWaves: 2,
            count : 0,
            waves : [
                {
                    waveNumber: 1,
                    enemyCount: 7,
                    startTime: 0,
                    '0': {
                        name: 'enemy',
                        spawnSpeed: 500,
                        hp: 300,
                        movementSpeed: 0.00005,
                        pays: 10,
                        takesHealth: 1
                    },
                    '1': {
                        name: 'enemy',
                        spawnSpeed: 1000,
                        hp: 300,
                        movementSpeed: 0.00002,
                        pays: 10,
                        takesHealth: 1
                    },
                    '2': {
                        name: 'enemy',
                        spawnSpeed: 1700,
                        hp: 300,
                        movementSpeed: 0.00003,
                        pays: 10,
                        takesHealth: 1
                    },
                    '3': {
                        name: 'enemy',
                        spawnSpeed: 4000,
                        hp: 300,
                        movementSpeed: 0.00001,
                        pays: 10,
                        takesHealth: 1
                    },
                    '4': {
                        name: 'enemy',
                        spawnSpeed: 4000,
                        hp: 300,
                        movementSpeed: 0.00001,
                        pays: 10,
                        takesHealth: 1
                    },
                    '5': {
                        name: 'enemy',
                        spawnSpeed: 4000,
                        hp: 300,
                        movementSpeed: 0.00001,
                        pays: 10,
                        takesHealth: 1
                    },
                    '6': {
                        name: 'enemy',
                        spawnSpeed: 4000,
                        hp: 300,
                        movementSpeed: 0.00001,
                        pays: 10,
                        takesHealth: 1
                    }
                },
                {
                    waveNumber: 2,
                    startTime: 5000,
                    enemyCount: 3,
                    '0': {
                        name: 'enemy',
                        spawnSpeed: 4000,
                        hp: 300,
                        movementSpeed: 0.00001
                    },
                    '1': {
                        name: 'enemy',
                        spawnSpeed: 1000,
                        hp: 1000,
                        movementSpeed: 0.00001
                    },
                    '2': {
                        name: 'enemy',
                        spawnSpeed: 4000,
                        hp: 300,
                        movementSpeed: 0.00001
                    }
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
                'cannon' : {
                    parentName: 'cannon',
                    ammo: 'cannonball',
                    speed: 200,
                    stuntime: 0,
                    aoeDistance: 0,
                    fireRate: 2000,
                    lifespan: 2000,
                    damage: 60,
                    range: 100,
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
                'laser' : {
                    parentName: 'laser',
                    ammo: 'beam',
                    speed: 200,
                    stuntime: 0,
                    aoeDistance: 0,
                    fireRate: 1000,
                    lifespan: 2000,
                    damage: 10,
                    range: 100,
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
                'machinegun' : {
                    parentName: 'machinegun',
                    ammo: 'machinebullet',
                    speed: 200,
                    stuntime: 0,
                    aoeDistance: 0,
                    fireRate: 200,
                    lifespan: 2000,
                    damage: 1,
                    range: 100,
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
                'missle' : {
                    parentName: 'missle',
                    ammo: 'misslebullet',
                    speed: 200,
                    stuntime: 0,
                    aoeDistance: 50,
                    fireRate: 3000,
                    lifespan: 2000,
                    damage: 30,
                    range: 100,
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
                }
            },
        },
        money = {
            health: 100, // level health
            enemyHitForHealth: 1, //when enemy crosses line 
            amount: 400, //cash
            amountOnNextWave: 10 //cash when next wave is pressed
        };
    },
    create: function() {
        levelManager.create(this); 
        if(screen.width <= 320){
            this.cameras.main.setZoom(0.9);
        }
    },
    update: function(time, delta) {
        levelManager.update(time, delta, this);
    }
});
towerD.scenes.push(level1);