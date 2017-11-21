module.exports = function ($scope,
                           teamsResource,
                           confirmationWindow,
                           params,
                           toastr,
                           Components) {
	'use strict';
	var _this         = this;
	var t             = teamsResource;
	this.systemTeams  = null;
	this.type         = '';
	this.team         = null;
	this.search       = null;
	this.currentSport = null;
	
	this.refresh = function () {
		t.system.getPaginated({
			sportId     : _this.currentSport,
			searchString: _this.search,
			pageNumber  : 1,
			rowCount    : 100
		}).then(function (teams) {
			_this.systemTeams = teams.Object;
		});
	};
	
	this.initialize = function () {
		if (typeof params === "number") {
			t.info([ params ]).then(function (exTeamInfo) {
				if (exTeamInfo && exTeamInfo.length) {
					_this.team         = exTeamInfo[ 0 ];
					_this.search       = exTeamInfo[ 0 ].Name;
					_this.type         = exTeamInfo[ 0 ].LiveType ? "Live" : "Prematch";
					_this.currentSport = exTeamInfo[ 0 ].SportID;
				} else {
					$scope.confirm(false);
					toastr.error("An error occured! Can't load team information!");
				}
			}).then(function () {
				_this.refresh();
			});
		} else if (typeof params === "object") {
			_this.team         = params;
			_this.search       = params.Name;
			_this.type         = params.LiveType ? "Live" : "Prematch";
			_this.currentSport = params.SportID;
			_this.refresh();
		} else {
			console.error("AssociationWindow: Unsupported params type: " + typeof params + " of params: " + params);
			throw new TypeError();
		}
	};
	
	this.initialize();
	
	this.deleteAssociation = function () {
		confirmationWindow.open("Are you sure want to delete association?").then(function () {
			t.live.associate(_this.team.ID, null).then(function () {
				$scope.confirm(true);
			})
		})
	};
	
	this.associate = function (systemTeam) {
		confirmationWindow.open("Are you sure want to associate this team with system team:" + systemTeam.Name + " ?").then(function () {
			t.associate(_this.team.ID, systemTeam.ID).then(function () {
				$scope.confirm(true);
			})
		})
	};
	
	this.openSystemSettings = function (teamID) {
		Components.windows.settings.team(teamID, _this.refresh)
	};
	
	setTimeout(function () {
		componentHandler.upgradeAllRegistered();
	}, 50);
};
