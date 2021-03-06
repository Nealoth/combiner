module.exports = function ($scope, liveScore, sportId, scoresResource, confirmationWindow) {
	'use strict';
	var _this              = this;
	var ss                 = scoresResource;
	this.systemScoresTable = null;
	this.currentLiveScore  = liveScore;
	
	ss.system.get(sportId).then(function (systemScores) {
		_this.systemScoresTable = systemScores;
	});
	
	this.associate = function (systemScore) {
		confirmationWindow.open('Are you sure?').then(function () {
			ss.live.associate(liveScore.ID, systemScore.Id).then(function () {
				$scope.confirm(true);
			})
		})
	};
	
	this.removeAssociation = function () {
		confirmationWindow.open('Are you sure?').then(function () {
			ss.live.associate(liveScore.ID, null).then(function () {
				$scope.confirm(true);
			})
		})
	};
};