var temp = require('./searchLeague.html');

angular.module('app').directive('filterSearchLeague', function () {
	return {
		restrict  : 'E',
		replace   : false,
		template  : temp,
		scope     : {
			sportId: '@',
			model  : '='
		},
		controller: function ($scope, leaguesResource) {
			'use strict';
			var l = leaguesResource;
			
			$scope.model           = null;
			$scope.searchText      = '';
			$scope.options         = null;
			$scope.optionsTemplate = "'[' + option.ID + '] ' + option.Name";
			
			$scope.refresh = function () {
				if($scope.searchText.length > 2)
					l.system.get({
						sportId   : $scope.sportId,
						searchText: $scope.searchText,
						pageNumber: 1,
						rowCount  : 100,
					}).then(function (leagues) {
						$scope.options = leagues.Object;
					})
			}
			
			
		}
	}
});