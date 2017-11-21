require('./directives/modulesTree');
require('./users.modules.css');

function Users_Modules (ngDialog, cacheSvc) {
  var _this = this;
  
  this.modules = null;
  
  this.modal = {
    ctrl: null,
    temp: require('./createNewModuleTemp.html')
  };
  
  this.refresh = function (update) {
    'use strict';
    var method = update ? 'update' : 'get';
    
    cacheSvc[ method ]('systemModules').then(function (totalModules) {
      var modules = JSON.parse(JSON.stringify(totalModules));
      
      modules.forEach(function (module) {
        if (module.ModuleIDParent) {
          modules.forEach(function (parentModule) {
            if (parentModule.Id === module.ModuleIDParent) {
              if (!parentModule.children) {
                parentModule.children = [];
              }
              parentModule.children.push(module);
            }
          })
        }
      });
      
      _this.modules = modules.filter(function (mainModule) {
        return mainModule.ModuleIDParent === null;
      });
    });
  };
  this.refresh();
  
  this.createNewModule = function (parentModule) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./createNewModuleCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template  : _this.modal.temp,
        controller: _this.modal.ctrl,
        resolve   : {
          parentModule: function () {
            return parentModule;
          }
        }
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refresh(true)
      })
    });
  };
  
  this.clickOnModule = function (module) {
    _this.createNewModule(module)
  };
}

module.exports = {
  template    : require('./users.modules.html'),
  controller  : Users_Modules,
  controllerAs: 'vm'
};
