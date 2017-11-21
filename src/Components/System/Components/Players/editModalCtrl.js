module.exports = function (player, $scope, playersResource) {
  'use strict';
  var _this       = this;
  this.isManage   = !!player;
  this.buttonText = player ? 'Save changes' : 'Create Player';
  this.name       = player ? player.PlayerName : null;
  var p           = playersResource;
  
  this.filters = {
    sport: null
  };
  
  this.submit = function () {
    var req    = {
      ID     : player ? player.ID : null,
      SportID: _this.filters.sport,
      Name   : _this.name
    };
    var method = player ? 'update' : 'create';
    
    p.system[ method ](req)
      .then(function () {
        $scope.confirm(true);
      })
  };
  
  this.delete = function () {
    p.system.delete({ID: player.ID})
     .then(function () {
       $scope.confirm(true);
     })
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 100);
};
