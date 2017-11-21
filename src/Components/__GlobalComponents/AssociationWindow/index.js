var team   = require('./teamAssociation');
var league = require('./leagueAssociation');
var status = require('./statusAssociation');

function AssociationWindow ($injector) {
	this.injector = $injector;
	this.dialog   = $injector.get('ngDialog');
}


AssociationWindow.prototype.team = function (params, callback) {
	this.dialog.openConfirm({
		template  : team.temp,
		controller: team.ctrl,
		width     : "1280px",
		resolve   : {
			params: function () {
				return params;
			}
		}
	}).then(function (anyChanges) {
		if (anyChanges) callback()
	})
};

AssociationWindow.prototype.league = function (params, callback) {
	this.dialog.openConfirm({
		template  : league.temp,
		controller: league.ctrl,
		width     : "1280px",
		resolve   : {
			params: function () {
				return params;
			}
		}
	}).then(function (anyChanges) {
		if (anyChanges) callback()
	})
};

AssociationWindow.prototype.status = function (params, callback) {
	this.dialog.openConfirm({
		template  : status.temp,
		controller: status.ctrl,
		width     : "400px",
		resolve   : {
			params: function () {
				return params;
			}
		}
	}).then(function (anyChanges) {
		if (anyChanges) callback()
	})
};


module.exports = AssociationWindow;