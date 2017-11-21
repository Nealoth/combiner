function Live_Teams (teamsResource, Components) {
	'use strict';
	var t      = teamsResource;
	var _this  = this;
	this.table = [];
	
	this.filters = {
		sport : null,
		source: null,
		search: ''
	};
	
	this.refresh = function () {
		t.live.getPaginated({
			serviceID : _this.filters.source.Id,
			sportID   : _this.filters.sport,
			searchText: _this.filters.search,
			pageNumber: _this.pageNumber,
			rowCount  : _this.rowCount,
		}).then(function (teams) {
			_this.count = teams.Count;
			_this.table = teams.Object;
		})
	};
	
	this.edit = function (team) {
		team.LiveType = 1;
		team.SportID  = _this.filters.sport;
		Components.windows.association.team(team, _this.refresh);
	};
	
	this.systemTeamSettings = function (teamID) {
		Components.windows.settings.team(teamID, _this.refresh);
	};
}

module.exports = {
	template    : require('./live.teams.html'),
	controller  : Live_Teams,
	controllerAs: 'vm'
};
