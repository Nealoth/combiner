function Prematch_Leagues (leaguesResource, Components) {
	'use strict';
	var _this  = this;
	var l      = leaguesResource;
	this.table = [];
	
	this.filters = {
		source  : null,
		sport   : null,
		category: null,
		search  : ''
	};
	
	this.refresh = function () {
		l.prematch.getPaginated({
			serviceID : _this.filters.source.Id,
			sportID   : _this.filters.sport,
			categoryID: _this.filters.category,
			searchText: _this.filters.search,
			pageNumber: _this.pageNumber,
			rowCount  : _this.rowCount
		}).then(function (leagues) {
			_this.count = leagues.Count;
			_this.table = leagues.Object;
		})
	};
	
	this.edit = function (league) {
		Components.windows.association.league(league.ID, _this.refresh);
	}
}

module.exports = {
	template    : require('./prematch.leagues.html'),
	controller  : Prematch_Leagues,
	controllerAs: 'vm'
};
