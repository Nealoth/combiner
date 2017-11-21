function Users_Activity (usersResource, apiHelper) {
  'use strict';
  var _this = this;
  var u     = usersResource;
  
  this.table = [];
  
  this.filters = {
    dates : {
      begin: {
        date: moment().subtract(30, 'days').format(),
        time: moment().format()
      },
      end  : {
        date: moment().format(),
        time: moment().format()
      }
    },
    users : {
      options: null,
      model  : null
    },
    search: ''
  };
  
  u.users.get().then(function (users) {
    _this.filters.users.options = users.Object;
    _this.filters.users.model   = _this.filters.users.options[ 0 ];
  });
  
  
  this.refresh = function () {
    u.activity(
      apiHelper.format.dateTime(_this.filters.dates.begin.date, _this.filters.dates.begin.time),
      apiHelper.format.dateTime(_this.filters.dates.end.date, _this.filters.dates.end.time),
      _this.filters.users.model.PersonnelID).then(function (activityLogs) {
      _this.table = activityLogs;
    });
  };
  
  
}

module.exports = {
  template    : require('./users.activity.html'),
  controller  : Users_Activity,
  controllerAs: 'vm'
};
