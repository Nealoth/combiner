function System_Leagues (ngDialog, dynamicCacheResource, leaguesResource) {
	var _this  = this;
	var dc     = dynamicCacheResource;
	var l      = leaguesResource;
	this.table = [];
	
	this.filters = {
		sport   : null,
		search  : '',
		category: null
	};
	
	this.modal = {
		ctrl: null,
		temp: require('./leagueEditModalTemp.html')
	};
	
	this.refresh = function () {
		l.system.get({
			sportID   : _this.filters.sport,
			categoryID: _this.filters.category,
			rowCount  : _this.rowCount,
			pageNumber: _this.pageNumber,
			searchText: _this.filters.search
		}).then(function (leagues) {
			_this.count = leagues.Count;
			_this.table = leagues.Object;
		});
	};
	
	this.edit = function (league) {
		require.ensure([], function () {
			_this.modal.ctrl = require('./leagueEditModalCtrl');
		}).then(function () {
			ngDialog.openConfirm({
				template  : _this.modal.temp,
				controller: _this.modal.ctrl,
				width     : '350px',
				resolve   : {
					league      : function () {
						return league;
					},
					currentSport: function () {
						return _this.filters.sport;
					}
				}
			}).then(function (needToRefresh) {
				if (needToRefresh) _this.refresh();
			});
		});
	}
}

module.exports = {
	template    : require('./system.leagues.html'),
	controller  : System_Leagues,
	controllerAs: 'vm'
};
