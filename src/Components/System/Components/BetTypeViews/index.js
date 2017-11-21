function System_BetTypeViews (cacheSvc, ngDialog) {
  'use strict';
  var _this  = this;
  this.table = null;
  
  this.modal = {
    ctrl: null,
    temp: require('./editViewTemp.html')
  };
  
  this.refresh = function () {
    cacheSvc.update('betTypeViews').then(function (views) {
      if (views) _this.table = views;
    });
  };
  
  this.refresh();
  
  this.edit = function (view) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./editViewCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template  : _this.modal.temp,
        controller: _this.modal.ctrl,
        width     : "700px",
        resolve   : {
          view: function () {
            return view;
          }
        }
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refresh();
      })
    });
  };
}

module.exports = {
  template    : require('./system.betTypeViews.html'),
  controller  : System_BetTypeViews,
  controllerAs: 'vm'
};
