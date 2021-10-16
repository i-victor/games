var storageInfo = {
	saveLevel: function(){
		var storage = localStorage.towerdefense;
		var level = Number(currentLevel.replace('Level', ''));
		if(storage){
			storage = JSON.parse(localStorage.towerdefense);
		}else{
			storage = {
				displayLevels: 0,
			}
		}
		if(level + 1 > storage.displayLevels){
			storage.displayLevels = level + 1;
		}
		storage["health" + level] = money.health;
		storage["level" + level] = money.starthealth;
		localStorage.towerdefense = JSON.stringify(storage);
	},
	getDisplayLevels: function(){
		var storage = 1;
			if(localStorage.towerdefense){
				storage = JSON.parse(localStorage.towerdefense).displayLevels;
			}
		return storage;
	},
	loadLevels: function(){
		if(localStorage.towerdefense){
			storage = JSON.parse(localStorage.towerdefense);
			levelsCompleted = storage.displayLevels;
		}else{
			levelsCompleted = 1;
		}
	},
	levelPercent: function(level){
		var storage,
			percent = 0;
			if(localStorage.towerdefense){
				storage = JSON.parse(localStorage.towerdefense);
				if(storage['level' + level]){
					// health is what was left after level, level is level start health
					percent = Math.floor(storage['health' + level] / storage['level' + level] * 100);
				}
			}
		return percent;
	}
}
