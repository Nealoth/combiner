var temp = require('./inputDefault.html');

angular.module('app').directive('inputDefault', function () {
  return {
    restrict  : 'E',
    replace   : true,
    template  : temp,
    scope     : {
      model      : '=',
      label      : '@',
      placeholder: '@',
      type       : '@',
      debounce   : '@',
      step       : '@',
      change     : '&',
      disabled   : '=',
      min        : '@',
      max        : '@'
    },
    controller: function ($scope, $element, $attrs) {
      
      $scope.db = $scope.debounce ? $scope.debounce : 0;
      
      if (!$scope.change) {
        $scope.changeCallback = function () {}
      } else {
        $scope.changeCallback = function () {
          setTimeout(function () {
            $scope.change();
          }, 100);
        }
      }
      
      if ($attrs.$attr[ 'required' ]) {
        $scope.required = true;
      }
    }
  }
});
