function Monitoring_System_Prematch_Odds ($stateParams, oddsResource, $rootScope, AppModules, CurrentUser) {
  'use strict';
  $rootScope.spinner = false;
  var o              = oddsResource;
  var ctrl           = this;
  this.betTypes      = null;
  this.SyncDate      = null;
  this.onlyActive    = true;
  
  this.filters            = {
    distTemplate: null
  };
  this.distTemplateRights = AppModules.checkModule(58);
  
  this.checkActive = function (betType) {
    setTimeout(function () {
      'use strict';
      var currentActiveOdds = 0;
      betType.betTypeOdds.forEach(function (row) {
        row.bto.forEach(function (cell) {
          if (cell.OddStatus === 0) {
            currentActiveOdds++;
          }
        })
      });
      betType.currentActiveOdds = currentActiveOdds;
    });
  };
  
  this.showOnlyActive = function (currentActiveOdds) {
    'use strict';
    var result = false;
    if (ctrl.onlyActive) {
      if (currentActiveOdds > 0) {
        result = true;
      }
    } else {
      result = true;
    }
    return result;
  };
  
  this.refresh = function () {
    setTimeout(function () {
      o.system.prematch.get(
        {
          distributeTemplateId: ctrl.filters.distTemplate || CurrentUser.get().DistributeTemplateID,
          eventId             : $stateParams.id
        }
      ).then(function (eventOdds) {
        if(eventOdds){
          ctrl.betTypes = eventOdds.Object;
          ctrl.SyncDate = eventOdds.SyncDate;
  
          ctrl.betTypes.forEach(function (betType) {
            ctrl.checkActive(betType);
          });
        }
      });
    }, 100);
  };
  this.refresh();
  
  this.resendOdds = function () {
    o.prematch.resendOdds({ID: $stateParams.id});
  };
  
}

module.exports = {
  template    : require('./monitoring.system.prematch.odds.html'),
  controller  : Monitoring_System_Prematch_Odds,
  controllerAs: 'vm'
};
