var team   = require('./team');
var league = require('./league');

function SettingsWindow ($injector) {
	this.dialog = $injector.get('ngDialog');
}

SettingsWindow.prototype.team = function (params, callback) {
	this.dialog.openConfirm({
		template  : team.temp,
		controller: team.ctrl,
		width     : "600px",
		resolve   : {
			params: function () {
				return params;
			}
		}
	}).then(function (anyChanges) {
		if (anyChanges) callback();
	})
};

SettingsWindow.prototype.league = function (params, callback) {
	this.dialog.openConfirm({
		template  : league.temp,
		controller: league.ctrl,
		//width     : "600px",
		resolve   : {
			params: function () {
				return params;
			}
		}
	}).then(function (anyChanges) {
		if (anyChanges) callback();
	})
};


module.exports = SettingsWindow;