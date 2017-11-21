function Monitoring_PrematchOutrights_Odds (outrightsResource, $state) {
  'use strict';
  var _this = this;
  var o     = outrightsResource;
  
  this.ID = $state.params.id;
  this.betTypeName = '';
  
  this.table = null;
  
  this.refresh = function () {
    o.prematch.getOdds({ID: _this.ID}).then(function (odds) {
      _this.betTypeName = odds[0].BetTypeName;
      _this.table = odds;
    });
  };
  this.refresh();
  
}

module.exports = {
  template    : require('./monitoring.prematchOutrights.odds.html'),
  controller  : Monitoring_PrematchOutrights_Odds,
  controllerAs: 'vm'
};
