function System_BetTypes (betTypesResource, ngDialog) {
	var bt             = betTypesResource;
	var _this          = this;
	this.betTypesTable = [];
	
	this.filters = {
		sport : null,
		search: '',
		isLive: null
	};
	
	this.modal = {
		ctrl: null,
		temp: require('./betTypesEditModal/betTypesEditTemp.html')
	};
	
	this.isLive      = [
		{
			name : "All",
			value: 2
		},
		{
			name : "Prematch",
			value: 0
		},
		{
			name : "Live",
			value: 1
		}
	];
	this.isLiveModel = _this.isLive[ 0 ];
	
	this.refreshTable = function (sportId, searchText, count) {
		var sport = _this.filters.sport;
		bt.get(sport, searchText, count, _this.filters.isLive.value)
		  .then(function (betTypes) {
			  _this.betTypesTable = betTypes;
		  });
	};
	
	this.openBetTypesEditModal = function (betType) {
		require.ensure([], function () {
			_this.modal.ctrl = require('./betTypesEditModal/betTypesEditCtrl');
		}).then(function () {
			ngDialog.openConfirm({
				template  : _this.modal.temp,
				controller: _this.modal.ctrl,
				resolve   : {
					betType: function () {
						return betType;
					}
				},
				width     : '70%'
			}).then(function (needToRefresh) {
				if (needToRefresh) {
					setTimeout(function () {
						_this.refreshTable();
					}, 500);
				}
			});
		});
	};
	
}

module.exports = {
	template    : require('./system.bettypes.html'),
	controller  : System_BetTypes,
	controllerAs: 'vm'
};
