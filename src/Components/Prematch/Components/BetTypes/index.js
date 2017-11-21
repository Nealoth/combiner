function Prematch_BetTypes (betTypesResource, ngDialog) {
  'use strict';
  var _this          = this;
  var bt             = betTypesResource;
  this.betTypesTable = [];
  
  this.filters = {
    source: null,
    sport : null
  };
  
  this.modal = {
    ctrl: null,
    temp: require('./betTypeAssociationTemp.html')
  };
  
  this.refreshTable = function () {
    bt.prematch.get(_this.filters.source.Id, _this.filters.sport).then(function (betTypes) {
      _this.betTypesTable = betTypes;
    })
  };
  
  this.openModal = function (betType) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./betTypeAssociationCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template    : _this.modal.temp,
        controller  : _this.modal.ctrl,
        resolve     : {
          data: function () {
            return {
              betType      : betType,
              currentSource: _this.filters.source,
              currentSport : _this.filters.sport
            };
          }
        },
        width       : '90%'
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refreshTable();
      });
    });
  }
  
}

module.exports = {
  template    : require('./prematch.bettypes.html'),
  controller  : Prematch_BetTypes,
  controllerAs: 'vm'
};
