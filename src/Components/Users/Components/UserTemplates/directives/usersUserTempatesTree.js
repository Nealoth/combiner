var temp = require('./moduleRightsTree.html');

angular.module('app').directive('usersUserTemplatesTree', function () {
  return {
    restrict  : 'E',
    replace   : true,
    template  : temp,
    scope     : {
      model: '='
    },
    controller: function ($scope, cacheSvc) {
      
    }
  }
});
