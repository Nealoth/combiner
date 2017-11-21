function Prematch_Events (eventsResource, ngDialog, Components) {
	'use strict';
	var e       = eventsResource;
	var _this   = this;
	this.events = null;
	
	this.now           = new Date();
	this.hoursInterval = 4;
	
	this.filters = {
		source  : null,
		sport   : null,
		imported: null,
		dates   : {
			begin: {
				date: moment().format(),
				time: moment().subtract(_this.hoursInterval, 'hours').format()
			},
			end  : {
				date: moment().format(),
				time: moment().add(_this.hoursInterval, 'hours').format()
			},
		}
	};
	
	this.modal = {
		ctrl: null,
		temp: require('./eventImportTemp.html')
	};
	
	(function initDateFilters () {
		if (_this.now.getHours() >= 24 - _this.hoursInterval) {
			_this.filters.dates.end.date = moment().add(1, 'days').format();
		} else if (_this.now.getHours() < _this.hoursInterval) {
			_this.filters.dates.begin.date = moment().subtract(1, 'days').format();
		}
	})();
	
	this.currentFilters = Object.create(null);
	
	this.refreshTable = function () {
		'use strict';
		var beginDate = moment(_this.filters.dates.begin.date).format('YYYY-MM-DD') +
			'T' + moment(_this.filters.dates.begin.time).format('HH:mm');
		var endDate   = moment(_this.filters.dates.end.date).format('YYYY-MM-DD') +
			'T' + moment(_this.filters.dates.end.time).format('HH:mm');
		var sourceId  = _this.filters.source ? _this.filters.source.Id : null;
		var sportId   = _this.filters.sport;
		
		_this.currentFilters.beginDate = beginDate;
		_this.currentFilters.endDate   = endDate;
		_this.currentFilters.sourceId  = sourceId;
		_this.currentFilters.sportId   = sportId;
		
		e.prematch.get(beginDate, endDate, sourceId, sportId, _this.filters.imported.value).then(function (events) {
			_this.events = events;
		});
	};
	
	this.import = function (event) {
		require.ensure([], function () {
			_this.modal.ctrl = require('./eventImportCtrl')
		}).then(function () {
			ngDialog.openConfirm({
				template  : _this.modal.temp,
				controller: _this.modal.ctrl,
				resolve   : {
					event  : function () {
						return event
					},
					filters: function () {
						return _this.currentFilters;
					}
				},
				width     : '900px'
			}).then(function (needToRefresh) {
				if (needToRefresh) _this.refreshTable();
			})
		});
	};
	
	
	this.associateTeam = function (teamID) {
		Components.windows.association.team(teamID, _this.refreshTable);
	};
	
	this.teamSettings = function (teamID) {
		Components.windows.settings.team(teamID, _this.refreshTable);
	};
	
}

module.exports = {
	template    : require('./prematch.events.html'),
	controller  : Prematch_Events,
	controllerAs: 'vm'
};
