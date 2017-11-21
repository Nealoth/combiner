angular.module('app')
       .directive('monitoringScoreCell', function () {
	       return function ($scope, element, attrs) {
		       $scope.$watch(attrs.monitoringScoreCell, function (value) {
			       $scope.lastValue = null;
			
			       var clearClasses = function () {
				       element.removeClass('monitoring__score-update');
			       };
			
			       $scope.$watch("lastValue", function (newValue, oldValue) {
				       if (oldValue) {
					       if (newValue !== oldValue) {
						       clearClasses();
						       element.addClass('monitoring__score-update');
					       }
				       } else {
					       clearClasses();
				       }
				
				       setTimeout(function () {
					       clearClasses();
				       }, 5000);
			       }, true);
			
			       element.text(value);
			       $scope.lastValue = value;
			
			
		       }, true);
	       }
       });
