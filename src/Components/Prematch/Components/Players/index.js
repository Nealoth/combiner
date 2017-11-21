function Prematch_Players (playersResource, ngDialog) {
  'use strict';
  var _this = this;
  var p     = playersResource;
  
  this.filters = {
    source: null,
    sport : null,
    search: ''
  };
  
  this.modal = {
    ctrl: null,
    temp: require('./associateModalTemp.html')
  };
  
  this.lastChosenSport = null;
  
  this.table = null;
  
  this.refresh = function () {
    _this.lastChosenSport = _this.filters.sport;
    
    p.prematch.get({
       serviceID   : _this.filters.source.Id,
       sportID     : _this.filters.sport,
       search      : _this.filters.search,
       currentPage : _this.currentPage,
       itemsPerPage: _this.itemsPerPage
     })
     .then(function (players) {
       if (players) {
         _this.table = players.Object;
         _this.count = players.Count;
        
       }
     })
  };
  
  this.associate = function (player) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./associateModalCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        controller: _this.modal.ctrl,
        template  : _this.modal.temp,
        resolve   : {
          player      : function () {
            return player;
          },
          currentSport: function () {
            return _this.lastChosenSport;
          }
        }
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refresh();
      })
    });
  }
  
}

module.exports = {
  template    : require('./prematch.players.html'),
  controller  : Prematch_Players,
  controllerAs: 'vm'
};
