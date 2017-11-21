var temp = require('./xmlTypes.html');

angular.module('app').directive('filterXmlTypes', function () {
	return {
		restrict  : 'E',
		replace   : false,
		template  : temp,
		scope     : {
			model    : '=',
			source   : '=',
			label    : '@',
			nullField: '@'
		},
		controller: function ($scope, $attrs, cacheSvc) {
			
			$scope._label            = $scope.label || "XML Type";
			$scope._nullField        = $scope.nullField || "All";
			$scope.withAll           = !!$attrs.$attr[ 'withAll' ];
			$scope.unfilteredOptions = [];
			
			$scope.filtrateBySource = function () {
			
				
				
			};
			
			cacheSvc.get("xmlTypes").then(function (types) {
				$scope.options           = types;
				$scope.unfilteredOptions = types;
				
				if ($scope.withAll)
					$scope.options.unshift({
						ID      : null,
						TypeName: $scope._nullField
					});
				
								
				
				$scope.model = $scope.options[ 0 ];
			});
		}
	}
});
