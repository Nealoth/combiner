module.exports = function ($scope, teamType, teamsResource, confirmationWindow) {
	'use strict';
	var _this       = this;
	var t           = teamsResource;
	this.buttonText = teamType ? 'Save changes' : 'Create team type';
	this.isManage   = !!teamType;
	
	this.name        = teamType ? teamType.Name : null;
	this.description = teamType ? teamType.Description : null;
	
	this.submit = function () {
		var method = teamType ? 'update' : 'create';
		var req    = {
			ID         : teamType ? teamType.ID : null,
			Name       : _this.name,
			Description: _this.description
		};
		
		t.teamTypes[ method ](req).then(function () {
			$scope.confirm(true);
		})
	};
	
	this.deleteTeamType = function () {
		confirmationWindow.open("Are you sure want to delete this team type: " + teamType.Name + " ?").then(function () {
			t.teamTypes.delete({ID: teamType.ID}).then(function () {
				$scope.confirm(true);
			})
		});
	};
	
	setTimeout(function () {
		componentHandler.upgradeAllRegistered();
	}, 50);
};