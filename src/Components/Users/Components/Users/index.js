function Users_Users (cacheSvc, ngDialog) {
  'use strict';
  var _this  = this;
  this.table = [];
  
  this.modal = {
    ctrl: null,
    temp: require('./personEditTemp.html')
  };
  
  this.refresh = function (update) {
    var method = update ? 'update' : 'get';
    cacheSvc[ method ]('users').then(function (users) {
      _this.table = users.Object;
    });
  };
  this.refresh();
  
  this.editPerson = function (person) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./personEditCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template  : _this.modal.temp,
        controller: _this.modal.ctrl,
        width     : "50%",
        resolve   : {
          person: function () {
            return person
          }
        }
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refresh(true);
      });
    });
  };
  
  
}

module.exports = {
  template    : require('./users.users.html'),
  controller  : Users_Users,
  controllerAs: 'vm'
};
