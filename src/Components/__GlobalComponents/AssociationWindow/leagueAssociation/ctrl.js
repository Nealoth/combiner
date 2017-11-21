module.exports = function ($scope, params, confirmationWindow, leaguesResource) {
	'use strict';
	var _this            = this;
	var l                = leaguesResource;
	this.systemLeagues   = null;
	this.associationType = "";
	
	this.initialize = function () {
		if (typeof params === "number") {
			l.info([ params ]).then(function (leagueInfo) {
				_this.league          = leagueInfo[ 0 ];
				_this.search          = _this.league.Name;
				_this.associationType = _this.league.LiveType ? "Live" : "Prematch";
			}).then(function () {
				_this.refresh();
			})
		} else if (typeof params === "object") {
			console.log(params);
			_this.league          = params;
			_this.search          = params.Name;
			_this.associationType = params.LiveType ? "Live" : "Prematch";
			_this.refresh();
		}
	};
	_this.initialize();
	
	this.refresh = function () {
		l.system.get({
			sportID   : _this.league.SportID,
			liveType  : _this.league.LiveType,
			searchText: _this.search,
			pageNumber: 1,
			rowCount  : 100,
		}).then(function (systemLeagues) {
			_this.systemLeagues = systemLeagues.Object;
		});
	};
	
	this.deleteAssociation = function () {
		confirmationWindow.open().then(function () {
			l.associate(_this.league.ID, null).then(function () {
				$scope.confirm(true);
			})
		});
	};
	
	this.associate = function (systemLeague) {
		confirmationWindow.open().then(function () {
			l.associate(_this.league.ID, systemLeague.ID).then(function () {
				$scope.confirm(true);
			})
		})
	};
	
	setTimeout(function () {
		componentHandler.upgradeAllRegistered();
	}, 50);
	
};
