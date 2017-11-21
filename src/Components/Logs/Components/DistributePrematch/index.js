function Logs_DistributePrematch (logsResource, apiHelper, ngDialog, eventsResource) {
  'use strict';
  var e      = eventsResource;
  var l      = logsResource;
  var _this  = this;
  this.table = [];
  
  this.filters = {
    distTemplate  : null,
    date          : {
      start: moment().subtract(1, 'days').format(),
      end  : moment().format()
    },
    time          : {
      start: moment().format(),
      end  : moment().endOf('day').format()
    },
    event         : {
      options       : null,
      model         : null,
      optionTemplate: "'[' + option.ID + '] / ' + option.EventDate + ' / ' + option.EventName",
      searchText    : ''
    },
    outright      : {
      options       : null,
      model         : null,
      optionTemplate: "'[' + option.ID + '] / ' + option.EventDate + ' / ' + option.EventName",
      searchText    : ''
    },
    searchBetTypes: false
  };
  
  this.modal = {
    ctrl: null,
    temp: require('./viewLogTemp.html')
  };
  
  this.refresh = function () {
    var req = {
      distributeTemplateId: _this.filters.distTemplate,
      eventId             : _this.filters.searchBetTypes ? 0 : _this.filters.event.model ? _this.filters.event.model.ID : null,
      eventOutrightId     : _this.filters.searchBetTypes ? 0 : _this.filters.outright.model ? _this.filters.outright.model.ID : null,
      dateBegin           : apiHelper.format.dateTime(_this.filters.date.start, _this.filters.time.start),
      dateEnd             : apiHelper.format.dateTime(_this.filters.date.end, _this.filters.time.end),
      pageNumber          : _this.currentPage,
      rowCount            : _this.itemsPerPage
    };
    
    l.distPrematch.get(req).then(function (logs) {
      _this.table = logs.Object;
      _this.count = logs.Count;
    })
  };
  
  this.viewLog = function (log) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./viewLogCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template  : _this.modal.temp,
        controller: _this.modal.ctrl,
        width     : '90%',
        resolve   : {
          log: function () {
            return log;
          }
        }
      });
    });
  };
  
  this.loadEvents = function () {
    if (_this.filters.event.searchText.length >= 3)
      e.searchEvent({searchCondition: _this.filters.event.searchText})
       .then(function (events) {
         _this.filters.event.options = events;
       })
  };
  
  this.loadOutrights = function () {
    if (_this.filters.outright.searchText.length >= 3)
      e.system.searchOutrights({searchCondition: _this.filters.outright.searchText})
       .then(function (outright) {
         _this.filters.outright.options = outright;
       })
  };
}

module.exports = {
  template    : require('./logs.distributePrematch.html'),
  controller  : Logs_DistributePrematch,
  controllerAs: 'vm'
};
