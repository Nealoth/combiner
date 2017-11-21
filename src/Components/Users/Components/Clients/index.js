function Users_Clients (usersResource, ngDialog) {
  'use strict';
  var _this = this;
  var u     = usersResource;
  
  this.table = [];
  
  this.modal = {
    ctrl: null,
    temp: require('./editClientTemp.html')
  };
  
  this.refresh = function () {
    u.clients.get().then(function (clients) {
      _this.table = clients;
    })
  };
  this.refresh();
  
  this.editClient = function (client) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./editClientCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        controller: _this.modal.ctrl,
        template  : _this.modal.temp,
        width     : '330px',
        resolve   : {
          client: function () {
            return client
          }
        }
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refresh();
      })
    });
  }
}

module.exports = {
  template    : require('./users.clients.html'),
  controller  : Users_Clients,
  controllerAs: 'vm'
};
