function Users_Users_DistributeTemplates (usersResource, ngDialog, cacheSvc) {
  'use strict';
  var u     = usersResource;
  var _this = this;
  
  this.distTemplates = null;
  
  this.modal = {
    ctrl: null,
    temp: require('./editDistributeTemplateTemp.html')
  };
  
  this.refreshTable = function (update) {
    var method = update ? 'update' : 'get';
    cacheSvc[ method ]('distTemplates').then(function (distTemplates) {
      _this.distTemplates = distTemplates;
    });
  };
  this.refreshTable();
  
  this.editDistTemplate = function (distTemplate) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./editDistributeTemplateCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template    : _this.modal.temp,
        controller  : _this.modal.ctrl,
        width       : '480px',
        resolve     : {
          distTemplate: function () {
            return distTemplate
          }
        }
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refreshTable(true);
      })
    });
  }
}

module.exports = {
  template    : require('./users.distributeTemplates.html'),
  controller  : Users_Users_DistributeTemplates,
  controllerAs: 'vm'
};
