var temp = require('./systemCategories.html');

angular.module('app').directive('filterSystemCategories', function (cacheSvc) {
  return {
    restrict  : 'E',
    replace   : false,
    template  : temp,
    scope     : {
      model               : '=',
      selectedCategoryId  : '=',
      selectedCategoryCode: '=',
      nullLabel           : '@'
    },
    controller: function ($scope, $attrs, $filter) {
      $scope._nullLabel = $scope.nullLabel ? $scope.nullLabel : 'All categories';
      
      $scope.withAll = !!$attrs.$attr[ 'withAll' ];
      $scope.load    = function () {
        cacheSvc.get('categories')
                .then(function (countries) {
                  $scope.options = countries;
                  if ($scope.selectedCategoryId || $scope.selectedCategoryCode) {
                    var field = $scope.selectedCategoryId ? 'ID' : 'Code';
                    var temp  = $scope.selectedCategoryId ? $scope.selectedCategoryId : $scope.selectedCategoryCode;
                    $scope.options.forEach(function (item, i) {
                      if (temp === item[ field ]) {
                        $scope.model = $scope.options[ i ].ID;
                      }
                    })
                  } else {
                    $scope.model = $scope.withAll ? null : $scope.options[ 0 ].ID;
                  }
                  
                  $scope.options = $filter('orderBy')($scope.options, 'Name');
                })
                .catch(function (er) {
                  console.error('Error while loading system categories', er);
                  setTimeout(function () {
                    $scope.load();
                  }, 6000);
                })
      };
      $scope.load();
    }
  }
});
