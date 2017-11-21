function Configuration_Sending (sendingResource, ngDialog) {
  'use strict';
  var _this = this;
  var s     = sendingResource;
  
  this.table = [];
  
  this.filters = {
    distTemplate: null
  };
  
  this.modal = {
    ctrl: null,
    temp: require('./editTemplateTemp.html')
  };
  
  this.refresh = function () {
    s.prematch.get({distTemplateId: _this.filters.distTemplate})
     .then(function (templates) { _this.table = templates; })
  };
  this.refresh();
  
  this.editTemplate = function (template) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./editTemplateCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        controller  : _this.modal.ctrl,
        template    : _this.modal.temp,
        width       : '330px',
        resolve     : {
          template: function () {
            return template;
          }
        }
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refresh();
      })
    });
  }
}

module.exports = {
  template    : require('./configuration.sending.html'),
  controller  : Configuration_Sending,
  controllerAs: 'vm'
};
