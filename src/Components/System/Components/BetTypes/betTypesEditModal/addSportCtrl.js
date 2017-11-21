module.exports = function (cacheSvc) {
	var _this           = this;
	this.sports         = [];
	this.searchBySports = null;
	
	cacheSvc.get('systemSports').then(function (systemSports) {
		_this.sports = systemSports;
	});
	
	setTimeout(function () {
		componentHandler.upgradeAllRegistered();
	}, 100);
};