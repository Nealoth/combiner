module.exports = function (template, cacheSvc, usersResource, $scope, needToRefresh) {
  'use strict';
  var _this          = this;
  this.templateName  = template ? template.Name : null;
  this.modules       = [];
  this.isManage      = !!template;
  this.buttonText    = template ? 'Save changes' : 'Create template';
  var u              = usersResource;
  var _needToRefresh = needToRefresh;
  
  cacheSvc.get('systemModules').then(function (totalModules) {
    _this.totalModules = totalModules;
  });
  
  this.refresh = function (method) {
    'use strict';
    cacheSvc[ method ]('systemModules').then(function (totalModules) {
      var modules = JSON.parse(JSON.stringify(totalModules));
      
      modules.forEach(function (module) {
        _this.associateModule(module);
      });
      
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
      
      var a = modules.filter(function (mainModule) {
        return mainModule.ModuleIDParent === null;
      });
      _this.modules = a;
    });
  };
  if (_this.isManage) this.refresh('update');
  this.associateModule = function (module) {
    var r = false;
    template.modules.forEach(function (templateModule) {
      if (module.Id == templateModule.ModuleID) r = true;
    });
    module.selected = r;
  };
  
  this.select = function (node, isSelected) {
    if (!_needToRefresh) needToRefresh = true;
    
    var type = isSelected ? 'insert' : 'delete';
    
    u.urtm[ type ](template.Id, node.Id);
  };
  
  this.submit = function () {
    if (_this.isManage)
      u.urt.update(_this.templateName, template.Id);
    else
      u.urt.create(_this.templateName);
    
    $scope.confirm(true);
  };
  
  this.resetTree = function () {
    u.urtm.get(template.Id).then(function (updatedModules) {
      template.modules = updatedModules;
      _this.refresh('update');
    })
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 100);
};
