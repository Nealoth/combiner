module.exports = function (template, cacheSvc, $scope, sendingResource) {
  'use strict';
  var _this = this;
  var s     = sendingResource;
  
  this.buttonText = template ? 'Save' : 'Create';
  
  this.template = JSON.parse(JSON.stringify(template));
  
  this.distTemplate = {
    options: [],
    model  : null
  };
  
  this.link = template ? template.Link : null;
  
  cacheSvc.get('distTemplates').then(function (distTemplates) {
    _this.distTemplate.options = distTemplates;
    if (template) {
      _this.distTemplate.options.forEach(function (item, i) {
        if (item.ID === template.DistributeTemplateID) _this.distTemplate.model = _this.distTemplate.options[ i ].ID;
      })
    } else {
      _this.distTemplate.model = _this.distTemplate.options[ 0 ].ID
    }
  });
  
  
  this.submit = function () {
    var method = template ? 'update' : 'create';
    var req = {
      SendingDistributeTemplateId: _this.template ? _this.template.ID : null,
      DistributeTemplateId       : _this.distTemplate.model,
      Link                       : _this.link,
      IsOn                       : _this.template ? _this.template.IsOn : null
    };
    s.prematch[ method ](req).then(function () {
      $scope.confirm(true);
    })
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 100);
  
};
