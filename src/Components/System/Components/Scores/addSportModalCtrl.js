module.exports = function (cacheSvc) {
	'use strict';
	var _this   = this;
	var c       = cacheSvc;
	this.sports = null;
	
	c.get('systemSports').then(function (sports) {
		_this.sports = sports;
	})
};