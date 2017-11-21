module.exports = function (header) {
	'use strict';
	var _this = this;
	this.header = header;
	
	setTimeout(function () {
		componentHandler.upgradeAllRegistered();
	}, 100);
};
