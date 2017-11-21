module.exports = function ($scope, params, cacheSvc, eventStatusesResource) {
	'use strict';
	var _this   = this;
	var es      = eventStatusesResource;
	this.search = "";
	this.name   = params.Name;
	
	this.table = [];
	
	//cacheSvc.get("systemStatuses")
	//        .then(function (systemStatuses) {
	//	_this.table = systemStatuses;
	//});
	
	es.system.get({SportID: params.SportID}).then(function (systemStatuses) {
		_this.table = systemStatuses;
	});
	
	this.associate = function (systemID) {
		es.live.associate({
			LiveEventStatusID: params.ID,
			EventStatusID    : systemID
		}).then(function () {
			$scope.confirm(true);
		})
	};
	
};
