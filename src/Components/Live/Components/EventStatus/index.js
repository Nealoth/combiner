function Live_EventStatus (eventStatusesResource, Components, cacheSvc) {
	'use strict';
	var _this = this;
	var es    = eventStatusesResource;
	
	this.filters = {
		source: null,
		sport : null
	};
	
	this.table = null;
	
	this.refresh = function () {
		es.live.get({
			sportID  : _this.filters.sport,
			serviceID: _this.filters.source.Id
		}).then(function (statuses) {
			_this.table = statuses;
		})
	};
	
	this.associate = function (status) {
		status.SportID = _this.filters.sport;
		Components.windows.association.status(status, _this.refresh);
	};
}

module.exports = {
	template    : require('./live.eventStatus.html'),
	controller  : Live_EventStatus,
	controllerAs: 'vm'
};
