function Prematch_Outrights (outrightsResource, apiHelper) {
  'use strict';
  var _this = this;
  var o     = outrightsResource;
  
  this.filters = {
    source  : null,
    sport   : null,
    category: null,
    endDate : {
      date: moment().add(1, 'days').format(),
      time: moment().endOf('day').format()
    },
    search  : ''
  };
  
  this.table = [];
  
  this.refresh = function () {
    
    var req = {
      serviceID : _this.filters.source,
      sportID   : _this.filters.sport,
      dateEnd   : apiHelper.format.dateTime(_this.filters.endDate.date, _this.filters.endDate.time),
      categoryID: _this.filters.category
    };
    
    o.prematch.get(req).then(function (outrigths) {
      if (outrigths) _this.table = outrigths;
    });
  };
  
  this.goToMonitoring = function (outrightID) {
    window.open(window.location.origin + '/#/monitoring/ext/prematchOutrights/' + outrightID + '/odds');
  };
  
}

module.exports = {
  template    : require('./prematch.outrights.html'),
  controller  : Prematch_Outrights,
  controllerAs: 'vm'
};
