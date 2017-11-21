	var temp = require('./tableExtended.html');

angular.module('app').directive('tableExtended', function () {
	
	return {
		restrict  : 'E',
		replace   : false,
		transclude: true,
		template  : temp,
		scope     : {
			list      : '=',
			config    : '=',
			accessor  : '=',
			livesearch: '='
		},
		controller: function ($scope, $element, $attrs, $transclude, $filter) {
			$scope.$watch('livesearch', function (newValue, oldValue) {
				$scope.accessor = $filter("filter")($scope.list, $scope.livesearch);
			}, true);
		},
		compile   : function compile (tElement, tAttrs, transclude) {
			return {
				pre : function preLink (scope, iElement, iAttrs, controller) {
					scope.configOptions = [
						{
							value: 20,
							name : '20'
						},
						{
							value: 50,
							name : '50'
						},
						{
							value: 70,
							name : '70'
						},
						{
							value: 100,
							name : '100'
						}
					];
					scope.listInitialized = false;
					scope.accessor        = [];
					scope.config          = {
						itemsPerPage: 20,
						fillLastPage: false,
						maxPages    : 5,
					};
				},
				post: function postLink (scope, iElement, iAttrs, controller, $filter) {
					scope.$watch('list', function (newValue, oldValue) {
						if (newValue) {
							scope.accessor = newValue;
						}
						if (newValue.length > 0) scope.listInitialized = true;
					}, true);
					scope.pagination = !!iElement.find('table')[0].attributes['at-paginated'];
				}
			}
		},
		link      : function (scope, el, attr) {
			
			
		}
	}
	
});