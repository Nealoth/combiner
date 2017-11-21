function Users_UserTemplates (cacheSvc, ngDialog) {
  'use strict';
  var _this = this;
  
  this.userTemplatesTable = null;
  this.totalModules       = null;
  this.needToRefresh      = false;
  
  this.modal = {
    ctrl: null,
    temp: require('./editTemp.html')
  };
  
  cacheSvc.get('systemModules').then(function (totalModules) {
    _this.totalModules = totalModules;
  });
  
  this.refresh = function () {
    cacheSvc.update("systemRights").then(function (rightsTemplates) {
      _this.userTemplatesTable = rightsTemplates;
    });
  };
  this.refresh();
  
  
  this.editTemplate = function (template) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./editCtrl')
    }).then(function () {
      ngDialog.openConfirm({
        controller: _this.modal.ctrl,
        template  : _this.modal.temp,
        width     : '335px',
        resolve   : {
          template     : function () {
            return template;
          },
          needToRefresh: function () {
            return _this.needToRefresh;
          }
        }
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refresh();
      }, function () {
        if (_this.needToRefresh) _this.refresh();
      })
    });
  };
}

module.exports = {
  template    : require('./users.userTemplates.html'),
  controller  : Users_UserTemplates,
  controllerAs: 'vm'
};
