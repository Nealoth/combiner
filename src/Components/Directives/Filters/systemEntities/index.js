var temp = require('./systemEntities.html');

angular.module('app')
       .directive('filterSystemEntities', function () {
         return {
           restrict  : 'E',
           template  : temp,
           replace   : false,
           scope     : {
             model: '='
           },
           controller: function ($scope, cacheSvc, $element, $attrs, AppModules) {
             $scope.checkRightsAttr = !!$attrs.$attr['checkRights'];

             $scope.checkRights = function (entity) {
               switch (entity.EntityName){
                 case ("Sports"):
                   return AppModules.checkModule(62);
                   break;
                 case ("Leagues"):
                   return AppModules.checkModule(65);
                   break;
                 case ("Teams"):
                   return AppModules.checkModule(64);
                   break;
                 case ("Categories"):
                   return AppModules.checkModule(63);
                   break;
                 case ("BetTypes"):
                   return AppModules.checkModule(66);
                   break;
                 case ("BetTypeOdds"):
                   return AppModules.checkModule(67);
                   break;
                 default:
                   return true;
                   break;
               }
             };
             
             cacheSvc.get('systemEntities').then(function (entities) {
               $scope.options = $scope.checkRightsAttr ? entities.filter($scope.checkRights) : entities;
               $scope.model   = $scope.options.length ? $scope.options[ 0 ] : null;
             });
           }
    
         }
       });
