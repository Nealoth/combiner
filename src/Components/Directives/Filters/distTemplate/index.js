var temp = require('./distTemplate.html');

angular.module('app').directive('filterDistTemplate', function () {
	return {
		restrict  : 'E',
		replace   : true,
		template  : temp,
		scope     : {
			model    : '=',
			label    : '@',
			nullLabel: '@',
			change   : '&',
			liveType : '='
		},
		controller: function ($scope, cacheSvc, $attrs, CurrentUser) {
			$scope._label     = $scope.label || 'Template';
			$scope._nullLabel = $scope.nullLabel || 'All templates';
			$scope.withAll    = !!$attrs.$attr[ 'withAll' ];
			
			cacheSvc.get('distTemplates').then(function (templates) {
				$scope.options = JSON.parse(JSON.stringify(templates));
				
				$scope.options.forEach(function (item, i) {
					if (item.ID === CurrentUser.get().DistributeTemplateID) {
						$scope.model = $scope.withAll ? $scope.model = null : $scope.model = $scope.options[ i ].ID;
						$scope.selectedObject = $scope.withAll ? $scope.selectedObject = null : $scope.selectedObject = $scope.options[ i ];
						if (!item.personal) {
							item.Name += " (Yours)";
							item.personal = true;
						}
					}
				});
			});
		}
	}
});
