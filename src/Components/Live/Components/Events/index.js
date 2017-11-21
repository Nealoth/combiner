require('./live.events.css');

function Live_Events (eventsResource, ngDialog, Components) {
	'use strict';
	var e       = eventsResource;
	var _this   = this;
	this.events = [];
	
	this.now            = new Date();
	this.hoursInterval  = 4;
	this.itemsToCombine = [];
	
	this.filters = {
		source     : null,
		sport      : null,
		imported   : null,
		dates      : {
			begin: {
				date: moment().format(),
				time: moment().subtract(_this.hoursInterval, 'hours').format()
			},
			end  : {
				date: moment().format(),
				time: moment().add(_this.hoursInterval, 'hours').format()
			},
		},
		combineMode: false,
		liveSearch : ''
	};
	
	this.modal = {
		import : {
			ctrl: null,
			temp: require('./Import/eventImportTemp.html')
		},
		combine: {
			ctrl: null,
			temp: require('./Combine/eventCombineTemp.html')
		}
	};
	
	this.currentFilters = Object.create(null);
	
	(function initDateFilters () {
		if (_this.now.getHours() >= 24 - _this.hoursInterval) {
			_this.filters.dates.end.date = moment().add(1, 'days').format();
		} else if (_this.now.getHours() < _this.hoursInterval) {
			_this.filters.dates.begin.date = moment().subtract(1, 'days').format();
		}
	})();
	
	this.refreshTable = function () {
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
		
		e.live.get(
			beginDate,
			endDate,
			sourceId,
			sportId,
			_this.filters.imported.value,
			_this.filters.combineMode).then(function (events) {
			_this.events = events;
			
			if (_this.filters.combineMode) _this.formatItemsToCombine();
		});
		
	};
	
	this.formatItemsToCombine = function () {
		_this.itemsToCombine = _this.events.filter(function (event) {
			return event.toCombine === true;
		});
	};
	
	this.addToCombine = function (event) {
		if (_this.filters.combineMode) {
			event.toCombine = event.toCombine ? !event.toCombine : true;
			_this.formatItemsToCombine();
		}
	};
	
	this.combine = function () {
		if (_this.itemsToCombine.length > 0) {
			require.ensure([], function () {
				_this.modal.combine.ctrl = require('./Combine/eventCombineCtrl');
			}).then(function () {
				ngDialog.openConfirm({
					template  : _this.modal.combine.temp,
					controller: _this.modal.combine.ctrl,
					resolve   : {
						itemsToCombine: function () {
							return _this.itemsToCombine
						},
						filters       : function () {
							return _this.currentFilters;
						}
					},
					width     : '900px'
				}).then(function (needToRefresh) {
					if (needToRefresh) _this.refreshTable();
				}).catch(function () {_this.formatItemsToCombine()})
			})
		}
	};
	
	this.import = function (event) {
		require.ensure([], function () {
			_this.modal.import.ctrl = require('./Import/eventImportCtrl')
		}).then(function () {
			ngDialog.openConfirm({
				template  : _this.modal.import.temp,
				controller: _this.modal.import.ctrl,
				resolve   : {
					event  : function () {
						return event
					},
					filters: function () {
						return _this.currentFilters;
					}
				},
				width     : '1000px'
			}).then(function (needToRefresh) {
				if (needToRefresh) _this.refreshTable();
			});
		})
	};
	
	this.rowColor = function (event) {
		if (_this.filters.combineMode)
			return event.toCombine ? 'active' : '';
		else
			return 'calendar-hl-' + event.ColorStatus;
	};
	
	this.associateTeam = function (teamID) {
		Components.windows.association.team(teamID, _this.refreshTable);
	};
	
	this.teamSettings = function (teamID) {
		Components.windows.settings.team(teamID, _this.refreshTable);
	};
}

module.exports = {
	template    : require('./live.events.html'),
	controller  : Live_Events,
	controllerAs: 'vm'
};
