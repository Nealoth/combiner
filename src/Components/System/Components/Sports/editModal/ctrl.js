module.exports = function (sport, sportsResource, $scope, confirmationWindow) {
	'use strict';
	var _this = this;
	var s     = sportsResource;
	
	this.isManage   = !!sport;
	this.buttonText = sport ? 'Save changes' : 'Create sport';
	
	this.code     = sport ? sport.Code : null;
	this.name     = sport ? sport.Name : null;
	this.ordering = sport ? sport.Ordering : null;
	
	this.submit = function () {
		var method = _this.isManage ? 'update' : 'create';
		var req = {
			ID: sport ? sport.ID : null,
			Code: _this.code,
			Name: _this.name,
			Ordering: _this.ordering
		};
		
		s[method](req).then(function () {
			$scope.confirm(true);
		})
	};
	
	this.deleteSport = function () {
		confirmationWindow.open().then(function () {
			s.delete({ID: sport.ID}).then(function () {
				$scope.confirm(true);
			});
		})
	};
	
	
};