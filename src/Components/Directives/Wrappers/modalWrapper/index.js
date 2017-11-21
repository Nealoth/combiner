var temp = require('./temp.html');
require('./styles.css');

angular.module('app').directive('modalWrapper', function () {
	return {
		restrict  : 'E',
		replace   : true,
		transclude: true,
		template  : temp,
		scope     : {
			timeout: '@'
		},
		controller: function ($scope, $element, $rootScope) {
			$rootScope.spinner = false;
			$scope._timeout    = 500;
			
			if ($scope.timeout) $scope._timeout = $scope.timeout;
			
			setTimeout(function () {
				componentHandler.upgradeAllRegistered();
			}, 100);
			
			setTimeout(function () {
				$element.removeClass('modal__wrapper-loading');
			}, $scope._timeout);
			
			setTimeout(function () {
				$rootScope.spinner = true;
			}, 1000);
		}
	}
});
