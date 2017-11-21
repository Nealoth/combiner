angular.module('app')
       .directive('liveOdd', function () {
	       return function ($scope, element, attrs) {
		       $scope.$watch(attrs.liveOdd, function (value) {
			       $scope.lastValue = null;
			       $scope.specialBetValue  = value.SpecialBetValue ? ' [' + value.SpecialBetValue + '] ' : '';
			       $scope.lock      = "<i class=\"monitoring__odd-lock material-icons\">&#xE899;</i>";
			
			       var clearClasses = function () {
				       element.parent().removeClass('monitoring__odd-up');
				       element.parent().removeClass('monitoring__odd-down');
			       };
			
			       var unbind = $scope.$watch("lastValue", function (newValue, oldValue) {
				       if (oldValue) {
					       if (newValue.OddFactor > oldValue.OddFactor) {
						       element.parent().addClass('monitoring__odd-up');
					       } else if (newValue.OddFactor < oldValue.OddFactor) {
						       element.parent().addClass('monitoring__odd-down');
					       }
					
					       setTimeout(function () {
						       clearClasses();
					       }, 4000);
				       }
			       }, true);
			
			       if (value.OddFactor) {
				       if (value.OddStatus === 0) {
					       $scope.text = "<strong class='pull-left'>" + value.Name + $scope.specialBetValue + "</strong><span class='pull-right'>" + value.OddFactor.toFixed(2) + "</span>";
					       element.html($scope.text);
				       } else if (value.OddStatus === 10) {
					       $scope.text = "<span class='pull-left'>" + value.Name + $scope.specialBetValue + "</span><span class='pull-right'>" + $scope.lock + "</span>";
					       element.html($scope.text);
				       }
				       $scope.lastValue = value;
			       }
		       }, true);
	       }
       });
