 angular.module('app')
       .directive('oddPlaceholder', function () {
	       return {
		       restrict: 'A',
		       link: function($scope, element) {
			       element.on('click', function () {
				       element.toggleClass('monitoring__odd-collapse');
			       })
		       }
	       };
       });
