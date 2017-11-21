function System_Sports (cacheSvc, ngDialog) {
	'use strict';
	var _this = this;
	
	this.filters = {
		search: ''
	};
	
	this.editorModal = {
		temp: require('./editModal/temp.html'),
		ctrl: null
	};
	
	this.table = [];
	
	
	this.refresh = function () {
		cacheSvc.update('systemSports').then(function (sports) {
			_this.table = sports;
		})
	};
	
	this.edit = function (sport) {
		require.ensure([], function () {
			_this.editorModal.ctrl = require('./editModal/ctrl');
		}).then(function () {
			ngDialog.openConfirm({
				template  : _this.editorModal.temp,
				controller: _this.editorModal.ctrl,
				resolve   : {
					sport: function () {
						return sport;
					}
				}
			}).then(function (needToRefresh) {
				if (needToRefresh) _this.refresh();
			})
		});
	};
	
	
}

module.exports = {
	template    : require('./system.sports.html'),
	controller  : System_Sports,
	controllerAs: 'vm'
};
