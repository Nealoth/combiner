module.exports = function ($scope, currentTeam, teamsResource, Components) {
	'use strict';
	var _this = this;
	var t     = teamsResource;
	
	this.table  = [];
	this.limit  = 50;
	this.search = '';
	
	this.showMore = function () {
		_this.limit += 50;
		_this.refresh();
	};
	
	this.refresh = function () {
		t.system.getPaginated({
			sportId     : currentTeam.SportID,
			searchString: _this.search,
			OrderField  : null,
			pageNumber  : 1,
			rowCount    : _this.limit
		}).then(function (teams) {
			_this.table = teams.Object;
		});
	};
	
	_this.change = function () {
		if (_this.search.length > 2) {
			_this.limit = 50;
			_this.refresh();
		}
	};
	
	_this.addTeam = function (team) {
		$scope.confirm(team.ID);
	};
	
	_this.settings = function (teamID) {
		Components.windows.settings.team(teamID, _this.refresh);
	};
};
