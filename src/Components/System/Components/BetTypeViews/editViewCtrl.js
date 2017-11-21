module.exports = function (view, $scope, betTypesResource) {
  'use strict';
  var _this       = this;
  var bt          = betTypesResource;
  this.buttonText = view ? "Save changes" : "Create";
  
  this.view = {
    Name             : null,
    ViewType         : null,
    InitCount        : null,
    WinCount         : null,
    MultMin          : null,
    MultMax          : null,
    OddsKeysMin      : null,
    OddsKeysMax      : null,
    BaseTeam         : false,
    BasePlayer       : false,
    IsSpecialOdsValue: false
  };
  
  if (view) _this.view = view;
  
  this.submit = function () {
    var method = view ? "updateView" : "createView";
    
    var req = {
      Id               : view ? view.Id : null,
      Name             : _this.view.Name,
      ViewType         : _this.view.ViewType,
      InitCount        : _this.view.InitCount,
      WinCount         : _this.view.WinCount,
      MultMin          : _this.view.MultMin,
      MultMax          : _this.view.MultMax,
      OddsKeysMin      : _this.view.OddsKeysMin,
      OddsKeysMax      : _this.view.OddsKeysMax,
      BaseTeam         : _this.view.BaseTeam,
      BasePlayer       : _this.view.BasePlayer,
      IsSpecialOdsValue: _this.view.IsSpecialOdsValue
    };
    
    bt[ method ](req).then(function () {
      $scope.confirm(true);
    });
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 100);
};
