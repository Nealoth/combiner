function System_Teams (Components, dynamicCacheResource, teamsResource) {
	'use strict';
	var _this  = this;
	var dc     = dynamicCacheResource;
	var t      = teamsResource;
	this.teams = [];
	
	this.filters = {
		sport   : null,
		category: null,
		search  : ''
	};
	
	this.current = {
		sport   : null,
		category: null
	};
	
	this.table = [];
	
	this.refreshTable = function () {
		dc.system.teams(_this.filters.sport, _this.filters.category).then(function (systemTeams) {
			_this.current.sport    = _this.filters.sport;
			_this.current.category = _this.filters.category;
			_this.teams            = systemTeams;
		});
	};
	
	this.refresh = function () {
		t.system.getPaginated({
			sportId     : _this.filters.sport,
			searchString: _this.filters.search,
			OrderField  : null,
			pageNumber  : _this.currentPage,
			rowCount    : _this.itemsPerPage
		}).then(function (teams) {
			_this.table = teams.Object;
			_this.count = teams.Count;
		});
	};
	
	this.openEditModal = function (team) {
		if (team) team.SportID = _this.filters.sport;
		Components.windows.settings.team(team, _this.refresh);
	}
}

module.exports = {
	template    : require('./system.teams.html'),
	controller  : System_Teams,
	controllerAs: 'vm'
};
