var temp = require('./isImported.html');

angular.module('app').directive('filterIsImported', function () {
	return {
		restrict: 'E',
		replace: false,
		template: temp,
		scope: {
			model: '='
		},
		link: function (scope, el, attr) {
			scope.options = [
				{
					name : 'All',
					value: null
				},
				{
					name : 'Not imported',
					value: 0
				},
				{
					name : 'Imported',
					value: 1
				}
			];
			scope.model = scope.options[0];
		}
	}
});