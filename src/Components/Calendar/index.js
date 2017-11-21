require('./calendar.css');

function Calendar (eventsResource, AppModules, toastr) {
  
  var ctrl                    = this;
  this.events                 = [];
  this.viewType               = 'daily';
  this.startDate              = moment().format('YYYY-MM-DD');
  this.endDate                = moment().add(1, 'days');
  var e                       = eventsResource;
  this.lastQuery              = null;
  this.hideUnimportableEvents = true;
  
  this.sourcesModuleNumber = 32;
  this.isSrc               = AppModules.checkModule(this.sourcesModuleNumber);
  
  this.loadEventsTable = function () {
    var params = {
      start: moment(ctrl.startDate).format('YYYY-MM-DD') + 'T00:00',
      end  : moment(ctrl.endDate).format('YYYY-MM-DD') + 'T00:00'
    };
    
    ctrl.lastQuery = params;
    
    e.calendar.get(params.start, params.end).then(function (events) {
      ctrl.events = events;
    });
  };
  this.loadEventsTable();
  
  this.dayAgo = function () {
    ctrl.startDate = moment(ctrl.startDate).subtract(1, 'days');
    ctrl.endDate   = moment(ctrl.endDate).subtract(1, 'days');
    ctrl.startDate = moment(ctrl.startDate).format('YYYY-MM-DD');
    ctrl.loadEventsTable();
  };
  
  this.addDay = function () {
    ctrl.startDate = moment(ctrl.startDate).add(1, 'days');
    ctrl.endDate   = moment(ctrl.endDate).add(1, 'days');
    ctrl.startDate = moment(ctrl.startDate).format('YYYY-MM-DD');
    ctrl.loadEventsTable();
  };
  
  this.changeToWeekView = function () {
    if (ctrl.viewType !== 'weekly') {
      ctrl.startDate = moment().format('YYYY-MM-DD');
      ctrl.endDate   = moment().add(7, 'days');
      ctrl.startDate = moment(ctrl.startDate).format('YYYY-MM-DD');
      ctrl.endDate   = moment(ctrl.endDate).format('YYYY-MM-DD');
      ctrl.loadEventsTable();
    }
  };
  
  this.changeToDailyView = function () {
    if (ctrl.viewType !== 'daily') {
      ctrl.startDate = moment().format('YYYY-MM-DD');
      ctrl.endDate   = moment().add(1, 'days');
      ctrl.loadEventsTable();
    }
  };
  
  this.weekAgo = function () {
    ctrl.startDate = moment(ctrl.startDate).subtract(7, 'days');
    ctrl.endDate   = moment(ctrl.endDate).subtract(7, 'days');
    ctrl.startDate = moment(ctrl.startDate).format('YYYY-MM-DD');
    ctrl.endDate   = moment(ctrl.endDate).format('YYYY-MM-DD');
    ctrl.loadEventsTable();
  };
  
  this.addWeek = function () {
    ctrl.startDate = moment(ctrl.startDate).add(7, 'days');
    ctrl.endDate   = moment(ctrl.endDate).add(7, 'days');
    ctrl.startDate = moment(ctrl.startDate).format('YYYY-MM-DD');
    ctrl.endDate   = moment(ctrl.endDate).format('YYYY-MM-DD');
    ctrl.loadEventsTable();
  };
  
  this.systemMonitoring = function (eventId) {
    window.open(window.location.origin + '/#/monitoring/system/live/' + eventId + '/odds');
  };
  
  this.prematchMonitoring = function (eventId) {
    window.open(window.location.origin + '/#/monitoring/system/prematch/' + eventId + '/odds');
  };
  
  this.buy = function (event) {
    e.calendar.buy(event.ID).then(function (responseCode) {
      switch (responseCode) {
        case -1:
          toastr.warning("No money - no events!");
          break;
        case -2:
          toastr.error("Sorry! Technical error. Please try again later!");
          break;
        case 1:
          toastr.success("Success!");
          event.IsBuy = true;
          break;
        case 0:
          toastr.warning("Unknown error! Please try again later!");
          break;
        default:
          console.error(responseCode);
          break;
      }
    })
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 500);
}

module.exports = {
  template    : require('./calendar.html'),
  controller  : Calendar,
  controllerAs: 'vm'
};
