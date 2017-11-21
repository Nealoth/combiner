function System_Players (playersResource, ngDialog) {
  'use strict';
  var _this = this;
  var p     = playersResource;
  
  this.filters = {
    sport : null,
    search: ''
  };
  
  this.modal = {
    ctrl: null,
    temp: require('./editModalTemp.html')
  };
  
  this.table = null;
  
  this.refresh = function () {
    p.system.get(
      {
        sportId   : _this.filters.sport,
        searchText: _this.filters.search,
        pageNumber: _this.currentPage,
        rowCount  : _this.itemsPerPage,
      }
    ).then(function (players) {
      if (players) {
        _this.table = players.Object;
        _this.count = players.Count;
      }
    })
  };
  
  this.edit = function (player) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./editModalCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template  : _this.modal.temp,
        controller: _this.modal.ctrl,
        resolve   : {
          player: function () {
            return player;
          }
        }
      }).then(function (needToUpdate) {
        if (needToUpdate) _this.refresh();
      })
    });
  }
}

module.exports = {
  template    : require('./system.players.html'),
  controller  : System_Players,
  controllerAs: 'vm'
};
