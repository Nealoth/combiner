function System_Outrights (outrightsResource, apiHelper) {
  'use strict';
  var _this = this;
  var o     = outrightsResource;
  
  this.filters = {
    sport   : null,
    category: null,
    endDate : {
      date: moment().add(1, 'days').format(),
      time: moment().endOf('day').format()
    },
    search: ''
  };
  
  this.table = [];
  
  this.refresh = function () {
    
    var req = {
      sportID   : _this.filters.sport,
      dateEnd   : apiHelper.format.dateTime(_this.filters.endDate.date, _this.filters.endDate.time),
      categoryID: _this.filters.category
    };
    
    o.system.get(req).then(function (outrights) {
      if(outrights) _this.table = outrights;
    })
  }
  
}

module.exports = {
  template    : require('./system.outrights.html'),
  controller  : System_Outrights,
  controllerAs: 'vm'
};
