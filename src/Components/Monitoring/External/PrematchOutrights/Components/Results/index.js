function Monitoring_PrematchOutrights_Results (outrightsResource, $state) {
  'use strict';
  var _this = this;
  var o     = outrightsResource;
  
  this.ID = $state.params.id;
  this.betTypeName = '';
  
  this.table = null;
  
  this.refresh = function () {
    o.prematch.getResults({ID: _this.ID}).then(function (results) {
      _this.table = results;
    });
  };
  this.refresh();
}

module.exports = {
	template    : require('./monitoring.prematchOutrights.results.html'),
	controller  : Monitoring_PrematchOutrights_Results,
	controllerAs: 'vm'
};
