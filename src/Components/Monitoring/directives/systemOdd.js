angular.module('app')
       .directive('systemOdd', function () {
	       return function ($scope, element, attrs) {
		       $scope.$watch(attrs.systemOdd, function (value) {
			       $scope.lastValue = null;
			       $scope.oddPoint  = value.OddPoint ? ' [' + value.OddPoint + '] ' : '';
			       $scope.lock      = "<i class=\"pull-right material-icons\">&#xE899;</i>";
			
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
					       }, 3500);
				       }
				
				       if (value.OddFactor === undefined) {
					       unbind();
					       element.parent().remove();
					       setTimeout(function () {
						       $scope.$destroy();
					       });
				       }
			       }, true);
			
			       if (value.OddFactor) {
				       if (value.OddStatus === 0) {
					       $scope.text = "<strong class='pull-left'>" + value.Title + $scope.oddPoint + "</strong><span class='pull-right'>" + value.OddFactor.toFixed(2) + "</span>";
					       element.html($scope.text);
				       } else if (value.OddStatus === 10) {
					       $scope.text = "<span class='pull-left'>" + value.Title + $scope.oddPoint + "</span>" + $scope.lock;
					       element.html($scope.text);
				       }
				       $scope.lastValue = value;
			       } else if (value.OddFactor === null) {
				       $scope.text = "<span class='pull-left'>" + value.Title + $scope.oddPoint + "</span>" + $scope.lock;
				       element.html($scope.text);
			       }
		       }, true);
	       }
       });
