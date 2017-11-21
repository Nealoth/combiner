function Configuration_Formulas (cacheSvc, scoresResource) {
	'use strict';
	var _this = this;
	var s     = scoresResource;
	
	this.dropdowns = {
		source: null,
		isLive: null
	};
	
	this.sports = [];
	
	cacheSvc.get("systemSports").then(function (sports) {
		_this.sports = sports.filter(function (item) {
			return item.ID == 1 || item.ID == 3 || item.ID == 4 || item.ID == 13;
		});
	});
	
	this.loadScores = function (sport) {
		if (!sport.scores)
			s.system.get(sport.ID, null).then(function (scores) {
				sport.scores = scores;
			});
	};
	
}

module.exports = {
	template    : require('./configuration.formulas.html'),
	controller  : Configuration_Formulas,
	controllerAs: 'vm'
};
