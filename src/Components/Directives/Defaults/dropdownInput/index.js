var temp = require('./dropdownInput.html');
require('./dropdownInput.css');

angular.module('app')
       .directive('inputDropdown', function () {
         return {
           restrict  : 'E',
           template  : temp,
           replace   : true,
           scope     : {
             label         : '@',
             placeholder   : '@',
             options       : '=',
             model         : '=',
             onChange      : '&',
             debounce      : '@',
             search        : '=',
             optionTemplate: '=',
             disabled      : '='
           },
           controller: function ($scope) {
      
             $scope.model       = '';
             $scope.loaded      = true;
             $scope.loadedItems = 0;
      
             $scope.onChangeCallback = function () {
               setTimeout(function () {
                 if ($scope.onChange && $scope.search.length) {
                   $scope.loaded = false;
                   $scope.onChange();
                 }
          
                 if (!$scope.search.length) $scope.model = null;
               }, 100)
             };
      
             $scope.click = function (e, option) {
               $scope.search = e.target.innerText;
               $scope.model  = option;
             };
      
             $scope.checkRepeat = function () {
               setTimeout(function () {
                 $scope.loadedItems++;
                 if ($scope.loadedItems == $scope.options.length) {
                   $scope.loaded      = true;
                   $scope.loadedItems = 0;
                 }
                 //console.log($scope.loadedItems, $scope.options.length);
               })
             };
      
             //$scope.$watch('loaded', function () {
             //  console.log('loaded', $scope.loaded);
             //})
      
             $scope.$watch('search', function () {
               if (!$scope.search.length) $scope.model = null;
             }, true);
           }
         }
       });
