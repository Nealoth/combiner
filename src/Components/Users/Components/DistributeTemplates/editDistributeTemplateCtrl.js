var initLanguageModule = require('./languageModule');
var initDroprowns      = require('./initFilters');

module.exports = function ($scope, distTemplate, usersResource, cacheSvc, toastr) {
  'use strict';
  var u     = usersResource;
  var _this = this;
  
  initLanguageModule(_this, cacheSvc, u, toastr, distTemplate);
  initDroprowns(_this, cacheSvc, distTemplate);
  
  this.distTemplate = distTemplate;
  this.name         = distTemplate ? distTemplate.Name : null;
  this.oddsKey      = distTemplate ? distTemplate.OddsKey : null;
  this.mult         = distTemplate ? distTemplate.Mult : null;
  this.minimumOffer = distTemplate ? distTemplate.MinimumOffer : null;
  this.maximumCap   = distTemplate ? distTemplate.MaximumCap : null;
  this.buttonText   = distTemplate ? 'Save changes' : 'Create';
  this.modified     = {
    oddsKey     : null,
    mult        : null,
    minimumOffer: null,
    maximumCap  : null
  };
  this.client       = {
    options: null,
    model  : null
  };
  this.copyFrom     = {
    options      : null,
    model        : null,
    initialValues: {
      OddsKey     : _this.oddsKey,
      Mult        : _this.mult,
      MinimumOffer: _this.minimumOffer,
      MaximumCap  : _this.maximumCap
    }
  };
  
  this.submit = function () {
    var method = distTemplate ? 'update' : 'create';
    
    var req = {
      DistributeTemplateId    : distTemplate ? distTemplate.ID : null,
      Name                    : _this.name,
      ServiceId               : _this.service.model ? _this.service.model.Id : null,
      Us_ClientId             : _this.client.model ? _this.client.model.ID : null,
      OddsKey                 : _this.oddsKey,
      Mult                    : _this.mult,
      MinimumOffer            : _this.minimumOffer,
      MaximumCap              : _this.maximumCap,
      DistributeTemplateIdBase: _this.copyFrom.model ? _this.copyFrom.model.ID : null,
      OddsKeyCopy             : _this.modified.oddsKey,
      MultCopy                : _this.modified.mult,
      MinimumOfferCopy        : _this.modified.minimumOffer,
      MaximumCapCopy          : _this.modified.maximumCap
    };
    
    u.distributeTemplates[ method ](req).then(function () {
      $scope.confirm(true);
    });
  };
  
  this.service      = {
    options: null,
    model  : null
  };
  
  this.autoCompleteFields = function () {
    var copyFromField  = _this.copyFrom.model ? 'model' : 'initialValues';
    _this.oddsKey      = _this.copyFrom[ copyFromField ].OddsKey;
    _this.mult         = _this.copyFrom[ copyFromField ].Mult;
    _this.minimumOffer = _this.copyFrom[ copyFromField ].MinimumOffer;
    _this.maximumCap   = _this.copyFrom[ copyFromField ].MaximumCap;
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 150);
}
;
