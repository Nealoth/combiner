function System_TeamTypes (cacheSvc, ngDialog) {
	'use strict';
	var _this  = this;
	this.table = [];
	
	this.modal = {
		temp: require('./editTemp.html'),
		ctrl: null
	};
	
	this.refresh = function () {
		cacheSvc.update("teamTypes").then(function (teamTypes) {
			_this.table = teamTypes;
		});
	};
	
	this.edit = function (teamType) {
		require.ensure([], function () {
			_this.modal.ctrl = require('./editCtrl');
		}).then(function () {
			ngDialog.openConfirm({
				template  : _this.modal.temp,
				controller: _this.modal.ctrl,
				resolve   : {
					teamType: function () {
						return teamType;
					}
				}
			}).then(function (needToRefresh) {
				if (needToRefresh) _this.refresh();
			})
		})
	};
}

module.exports = {
	template    : require('./system.teamTypes.html'),
	controller  : System_TeamTypes,
	controllerAs: 'vm'
};
