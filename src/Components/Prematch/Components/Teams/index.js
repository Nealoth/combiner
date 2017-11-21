function Prematch_Teams (teamsResource, Components) {
	'use strict';
	var t      = teamsResource;
	var _this  = this;
	this.table = [];
	
	this.filters = {
		source: null,
		sport : null,
		search: ''
	};
	
	this.refresh = function () {
		t.prematch.getPaginated({
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
		team.LiveType = 0;
		team.SportID  = _this.filters.sport;
		Components.windows.association.team(team, _this.refresh);
	};
	
	this.openSystemSettings = function (systemTeamID) {
		Components.windows.settings.team(systemTeamID, _this.refresh);
	};
	
}

module.exports = {
	template    : require('./prematch.teams.html'),
	controller  : Prematch_Teams,
	controllerAs: 'vm'
};
