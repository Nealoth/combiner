function Logs_UsersLogs (logsResource, cacheSvc, apiHelper, ngDialog) {
  'use strict';
  var _this = this;
  var l     = logsResource;
  
  this.table = [];
  
  this.filters = {
    type  : {
      options: [
        {
          name : "Get",
          value: 0
        },
        {
          name : "Post",
          value: 1
        }
      ],
      model  : null
    },
    users : {
      options: [],
      model  : null
    },
    date  : {
      begin: moment().subtract(1, 'days').format(),
      end  : moment().format()
    },
    time  : {
      begin: moment().startOf('day').format(),
      end  : moment().endOf('day').format()
    },
    search: ''
  };
  
  this.modal = {
    ctrl: null,
    temp: require('./viewLogTemp.html')
  };
  
  cacheSvc.get('users').then(function (users) {
    _this.filters.users.options = users.Object;
  });
  
  this.refresh = function () {
    var req = {
      userPersonnelId: _this.filters.users.model ? _this.filters.users.model.PersonnelID : null,
      dateBegin      : apiHelper.format.dateTime(_this.filters.date.begin, _this.filters.time.begin),
      dateEnd        : apiHelper.format.dateTime(_this.filters.date.end, _this.filters.time.end),
      type           : _this.filters.type.model ? _this.filters.type.model.value : null,
      searchText     : _this.filters.search.length ? _this.filters.search : null,
      pageNumber     : _this.currentPage,
      rowCount       : _this.itemsPerPage
    };
    
    l.users.get(req).then(function (logs) {
      _this.table = logs.Object;
      _this.count = logs.Count;
    })
  };
  
  this.viewLog = function (log) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./viewLogCtrl');
    }).then(function () {
      ngDialog.open({
        controller: _this.modal.ctrl,
        template  : _this.modal.temp,
        width     : '600px',
        resolve   : {
          log: function () {
            return log
          }
        }
      })
    });
  }
  
}

module.exports = {
  template    : require('./logs.usersLogs.html'),
  controller  : Logs_UsersLogs,
  controllerAs: 'vm'
};
