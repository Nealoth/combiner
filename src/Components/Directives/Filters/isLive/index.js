var temp = require('./isLive.html');

angular.module('app').directive('filterIsLive', function () {
	return {
		restrict  : 'E',
		replace   : false,
		template  : temp,
		scope     : {
			model    : '=',
			label    : '@',
			nullField: '@',
			change   : '&'
		},
		controller: function ($scope, $attrs) {
			
			$scope._label     = $scope.label || "Type";
			$scope._nullField = $scope.nullField || "All";
			
			if ($scope.change)
				$scope.$watch('model', function () {
					$scope.change();
				});
			
			$scope.withAll = !!$attrs.$attr[ 'withAll' ];
			$scope.options = [
				
				{
					name : 'Live',
					value: 1
				},
				{
					name : 'Prematch',
					value: 0
				}
			];
			
			if ($scope.withAll)
				$scope.options.unshift({
					name : $scope._nullField,
					value: null
				});
			
			$scope.model = $scope.options[ 0 ];
		}
	}
});
