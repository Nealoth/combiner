module.exports = function (player, playersResource, currentSport, $scope, toastr, confirmationWindow) {
  'use strict';
  var _this          = this;
  this.name          = null;
  this.systemPlayers = null;
  var p              = playersResource;
  
  this.findLongestWord = function () {
    var words   = player.PlayerName.split(' ');
    var longest = '';
    words.forEach(function (word) {
      if (word.length > longest.length) longest = word;
    });
    _this.name = longest;
  };
  this.findLongestWord();
  
  
  this.loadSystemPlayers = function () {
    if (_this.name.length >= 3) {
      p.system.get({
        sportId   : currentSport,
        searchText: _this.name,
        pageNumber: 1,
        rowCount  : 50,
      }).then(function (systemPlayers) {
        _this.systemPlayers = systemPlayers.Object;
      })
    } else {
      toastr.warning('Need more symbols in name field (more than 3)')
    }
  };
  
  this.associate = function (systemPlayer) {
    confirmationWindow.open().then(function () {
      p.prematch.associate({
        ExPlayerID: player.PPlayerID,
        PlayerID  : systemPlayer ? systemPlayer.ID : null
      }).then(function () {
        $scope.confirm(true);
      })
    });
  };
  
  this.import = function () {
    confirmationWindow.open().then(function () {
      p.prematch
       .import({ID: player.PPlayerID})
       .then(function () {
         $scope.confirm(true);
       })
    })
  };
  
  
  setTimeout(function () {
    _this.loadSystemPlayers();
  }, 200);
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 100);
  
};
