function Live_BetTypes (betTypesResource, ngDialog) {
	'use strict';
	
	var _this     = this;
	var bt        = betTypesResource;
	this.betTypes = [];
	
	this.filters = {
		source: null,
		sport : null,
		search: ''
	};
	
	this.modal = {
		ctrl: null,
		temp: require('./liveBetTypeAssociationTemp.html')
	};
	
	this.refreshTable = function () {
		bt.getLive(_this.filters.source.Id, _this.filters.sport).then(function (betTypes) {
			_this.betTypes = betTypes;
		});
	};
	
	this.openModal = function (betType) {
		require.ensure([], function () {
			_this.modal.ctrl = require('./liveBetTypeAssociationCtrl')
		}).then(function () {
			ngDialog.openConfirm({
				template    : _this.modal.temp,
				controller  : _this.modal.ctrl,
				controllerAs: 'vm',
				plain       : true,
				resolve     : {
					data: function () {
						return {
							betType      : betType,
							currentSource: _this.filters.source,
							currentSport : _this.filters.sport
						};
					}
				},
				width       : '90%'
			}).then(function (needToRefresh) {
				if (needToRefresh) _this.refreshTable();
			});
		});
	}
}

module.exports = {
	template    : require('./live.bettypes.html'),
	controller  : Live_BetTypes,
	controllerAs: 'vm'
};
