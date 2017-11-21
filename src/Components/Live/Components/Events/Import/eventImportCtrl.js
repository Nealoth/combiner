module.exports = function ($rootScope, $scope, event, filters, eventsResource, confirmationWindow, ngDialog) {
  'use strict';
  var e                = eventsResource;
  var dateBegin        = moment(event.EventDate).subtract(1, 'days').format('YYYY-MM-DD') + 'T' + '00:00';
  var dateEnd          = moment(event.EventDate).add(1, 'days').format('YYYY-MM-DD') + 'T' + '23:59';
  var _this            = this;
  this.systemEvents    = null;
  this.event           = event;
  this.canImport       = event.IsCanBeImported;
  this.isEventCombined = !!event.ServiceNames;
  
  this.searchBySystemEvent = Object.create(null);
  
  this.modal = {
    ctrl: null,
    temp: require('./importFromSourceTemp.html')
  };
  
  this.findLongestWord = function (str) {
    'use strict';
    var words       = str.replace(/\(.*\)/ig, "").replace(/[,./]/g, " ");
    var longestWord = '';
    var wordsArray  = words.split(' ');
    if (wordsArray.length > 1) {
      wordsArray.forEach(function (item) {
        if (item.length > longestWord.length) {
          longestWord = item;
        }
      });
    } else {
      longestWord = wordsArray[ 0 ];
    }
    return longestWord;
  };
  
  setTimeout(function () {
    _this.searchBySystemEvent.TeamHomeName = _this.findLongestWord(event.TeamHomeName);
  });
  setTimeout(function () {
    _this.searchBySystemEvent.TeamGuestName = _this.findLongestWord(event.TeamGuestName);
  });
  
  e.system.get(
    null,
    null,
    event.SportID,
    dateBegin,
    dateEnd
  ).then(function (systemEvents) {
    _this.systemEvents = systemEvents;
  });
  
  this.importFromSource = function () {
    require.ensure([], function () {
      _this.modal.ctrl = require('./importFromSourceCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template  : _this.modal.temp,
        controller: _this.modal.ctrl,
        resolve   : {
          sources   : function () {
            return event.ServiceNames.split("|");
          },
          sourcesIDs: function () {
            return event.ServiceIDs.split("|");
          }
        },
        width     : '250px'
      }).then(function (source) {
        confirmationWindow.open('Are you sure want to IMPORT this event from ' + source.name + '?').then(function () {
          var sysId = systemEvent ? systemEvent.ID : null;
          e.live.import(_this.event.ID, sysId, isImport, source.id).then(function () {
            $scope.confirm(true);
          })
        });
      })
    });
  };
  
  this.import = function (systemEvent, isImport) {
    'use strict';
    if (isImport) {
      if (_this.event.ServiceNames) {
        _this.importFromSource();
      } else {
        confirmationWindow.open('Are you sure want to IMPORT this event?').then(function () {
          var sysId = systemEvent ? systemEvent.ID : null;
          e.live.import(_this.event.ID, sysId, isImport, null).then(function () {
            $scope.confirm(true);
          })
        });
      }
    } else {
      confirmationWindow.open('Are you sure want to REMOVE association').then(function () {
        e.live.import(_this.event.ID, null, isImport, null).then(function () {
          $scope.confirm(true);
        })
      });
    }
  };
  
  this.viewOdds = function () {
    window.open(window.location.origin + '/#/monitoring/live/' + _this.event.ID + '/odds');
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 300);
};
