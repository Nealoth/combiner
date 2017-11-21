var temp = require('./temp.html');

angular.module('app').directive('filterTeamType', function () {
	return {
		restrict  : 'E',
		replace   : true,
		template  : temp,
		scope     : {
			model    : '=',
			label    : '@',
			nullLabel: '@',
			change   : '&',
		},
		controller: function ($scope, cacheSvc, $attrs) {
			$scope._label     = $scope.label || 'Template';
			$scope._nullLabel = $scope.nullLabel || 'All templates';
			$scope.withAll    = !!$attrs.$attr[ 'withAll' ];
			
			cacheSvc.get('teamTypes').then(function (templates) {
				$scope.options = JSON.parse(JSON.stringify(templates));
				$scope.model   = $scope.options[ 0 ].ID;
			});
		}
	}
});
