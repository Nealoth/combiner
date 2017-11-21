var temp = require('./filtersWrapper.html');

angular.module('app').directive('filtersWrapper', function () {
	return {
		restrict  : 'E',
		replace   : true,
		template  : temp,
		scope     : {
			refresh: '&'
		},
		transclude: true,
		link      : function (scope, el, attr, ctrl, transclude) {
			scope.pin = function () {
				el.toggleClass('filters__wrapper-pinned');
			};
			el.find('span').replaceWith(transclude());
		}
	}
});
