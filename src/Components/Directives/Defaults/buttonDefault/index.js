var temp = require('./buttonDefault.html');

angular.module('app')
       .directive('buttonDefault', function () {
         return {
           restrict  : 'E',
           replace   : true,
           template  : temp,
           transclude: true,
           scope     : {
             callback: '&',
             text    : '='
           },
           controller: function ($scope, $attrs) {
             $scope.color = '';
             if ($attrs.$attr[ 'primary' ]) $scope.color = 'mdl-button--colored';
             if ($attrs.$attr[ 'accent' ]) $scope.color = 'mdl-button--accent';
           }
         }
       });
