var addOddTypeCtrl = require('./addOddTypeCtrl');
var addOddTypeTemp = require('./addOddTypeTemp.html');
var addSportCtrl   = require('./addSportCtrl');
var addSportTemp   = require('./addSportTemp.html');

module.exports = function BetTypesEditModalCtrl ($scope, betType, betTypesResource, ngDialog, confirmationWindow, cacheSvc) {
  this.title      = betType ? 'Manage Bet Type' : 'Create new Bet Type';
  this.isManage   = !!betType;
  var ctrl        = this;
  var bt          = betTypesResource;
  this.buttonText = this.isManage ? 'Save changes' : 'Create Bet Type';
  
  this.betTypeData = {
    name           : null,
    code           : null,
    description    : null,
    shortName      : null,
    ordering       : null,
    oddsColumnCount: null,
    liveEvent      : {
      options: [
        {
          id  : 0,
          name: 'Prematch'
        },
        {
          id  : 1,
          name: 'Live',
        },
        {
          id  : 2,
          name: 'Both'
        }
      ],
      value  : null
    },
    group          : {
      options: null,
      value  : null
    },
    oddsView       : {
      options: [],
      value  : null
    },
    oddTypes       : null,
    sports         : null
  };
  
  this.loadBetTypeViews = function (method) {
    cacheSvc[method]('betTypeViews').then(function (betTypeViews) {
      ctrl.betTypeData.oddsView.options = betTypeViews;
      if (betType) ctrl.betTypeData.oddsView.options.forEach(function (item, i) {
        if (item.Id === betType.BetTypeViewID) ctrl.betTypeData.oddsView.value = ctrl.betTypeData.oddsView.options[ i ];
      });
      else ctrl.betTypeData.oddsView.value = ctrl.betTypeData.oddsView.options[ 0 ];
    });
  };
  this.loadBetTypeViews('get');
  
  
  this.initManageData = function (betType) {
    ctrl.betTypeData.name        = betType.Name;
    ctrl.betTypeData.code        = betType.Code;
    ctrl.betTypeData.description = betType.Description;
    ctrl.betTypeData.shortName   = betType.ShortName;
    ctrl.betTypeData.ordering    = betType.Ordering;
    
    ctrl.betTypeData.oddsView.options.forEach(function (data, i) {
      if (betType.BetTypeViewID == data.Id) {
        ctrl.betTypeData.oddsView.value = ctrl.betTypeData.oddsView.options[ i ];
      }
    });
    
    ctrl.betTypeData.liveEvent.options.forEach(function (data, i) {
      if (betType.LiveType == data.id) {
        ctrl.betTypeData.liveEvent.value = ctrl.betTypeData.liveEvent.options[ i ];
      }
    });
    
    setTimeout(function () {
      bt.getOdds(betType.Id).then(function (odds) {
        ctrl.betTypeData.oddTypes = odds;
      });
    });
    
    setTimeout(function () {
      bt.getSports(betType.Id).then(function (sports) {
        ctrl.betTypeData.sports = sports;
      });
    });
  };
  
  this.initDefaultData = function () {
    ctrl.betTypeData.liveEvent.value = ctrl.betTypeData.liveEvent.options[ 0 ];
    ctrl.betTypeData.oddsView.value  = ctrl.betTypeData.oddsView.options[ 0 ];
  };
  
  this.initModule = function () {
    
    if (ctrl.isManage) {
      ctrl.initManageData(betType)
    } else {
      ctrl.initDefaultData();
    }
    
  };
  this.initModule();
  
  this.updateBetType = function () {
    if (ctrl.isManage) {
      confirmationWindow.open().then(function () {
        bt.update(
          betType.Id,
          ctrl.betTypeData.code,
          ctrl.betTypeData.name,
          ctrl.betTypeData.oddsView.value.Id,
          ctrl.betTypeData.description,
          ctrl.betTypeData.shortName,
          ctrl.betTypeData.liveEvent.value.id,
          ctrl.betTypeData.ordering
        );
        $scope.confirm(true);
      });
    } else {
      confirmationWindow.open().then(function () {
        bt.create(
          ctrl.betTypeData.code,
          ctrl.betTypeData.name,
          ctrl.betTypeData.oddsView.value.Id,
          ctrl.betTypeData.description,
          ctrl.betTypeData.shortName,
          ctrl.betTypeData.liveEvent.value.id,
          ctrl.betTypeData.ordering
        );
        $scope.confirm(true);
      });
    }
  };
  
  this.deleteBetType = function () {
    confirmationWindow.open('Are you sure want to delete this Bet Type?').then(function () {
      bt.delete(betType.Id).then(function () {
        $scope.confirm(1);
      });
    });
  };
  
  this.updateOddType = function (oddType) {
    ngDialog.openConfirm({
      template        : addOddTypeTemp,
      plain           : true,
      controller      : addOddTypeCtrl,
      controllerAs    : 'vm',
      resolve         : {
        oddType      : function () {
          return oddType;
        },
        oddTypesArray: function () {
          return ctrl.betTypeData.oddTypes;
        }
      }
    }).then(function (ot) {
      if (oddType) {
        bt.updateOdd(oddType.Id, ot.oddType, ot.title, ot.ordering, ot.column, ot.shortName)
          .then(function () {
            bt.getOdds(betType.Id).then(function (odds) {
              ctrl.betTypeData.oddTypes = odds;
            });
          })
      } else {
        bt.createOdd(betType.Id, ot.oddType, ot.title, ot.ordering, ot.column, ot.shortName)
          .then(function () {
            bt.getOdds(betType.Id).then(function (odds) {
              ctrl.betTypeData.oddTypes = odds;
            });
          })
      }
    })
  };
  
  this.deleteOddType = function (Id) {
    confirmationWindow.open().then(function () {
      bt.deleteOdd(Id).then(function () {
        bt.getOdds(betType.Id).then(function (odds) {
          ctrl.betTypeData.oddTypes = odds;
        });
      })
    });
  };
  
  this.addSport = function () {
    ngDialog.openConfirm({
      template        : addSportTemp,
      plain           : true,
      controller      : addSportCtrl,
      controllerAs    : 'vm',
      width           : '800px',
    }).then(function (sportId) {
      bt.addSport(sportId, betType.Id).then(function () {
        bt.getSports(betType.Id).then(function (sports) {
          ctrl.betTypeData.sports = sports;
        });
      })
    })
  };
  
  this.deleteSport = function (Id) {
    confirmationWindow.open().then(function () {
      bt.deleteSport(Id).then(function () {
        bt.getSports(betType.Id).then(function (sports) {
          ctrl.betTypeData.sports = sports;
        });
      })
    })
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  });
};
