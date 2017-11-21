var addSportTemp = require('./addSportTemp.html');
var addSportCtrl = require('./addSportCtrl');

module.exports = function (oddType, oddTypesArray, betTypesResource, ngDialog) {
  'use strict';
  var bt          = betTypesResource;
  var ctrl        = this;
  this.buttonText = oddType ? 'Update' : 'Create';
  this.isManage   = !!oddType;
  this.sports     = [];
  
  this.refreshSports = function () {
    setTimeout(function () {
      if (ctrl.isManage) bt.getOddTypeSports(oddType.Id).then(function (oddTypeSports) {
        ctrl.sports = oddTypeSports;
      })
    });
  };
  
  this.refreshSports();
  
  this.findMax = function (arr, fieldName) {
    var initValue = 0;
    arr.forEach(function (item) {
      if (item[ fieldName ] > initValue) {
        initValue = item[ fieldName ];
      }
    });
    return initValue;
  };
  
  this.createColumn = function (maxColumn) {
    if (maxColumn < 3 && maxColumn > 0) {
      return maxColumn + 1;
    } else if (maxColumn === 3) {
      return 1;
    }
  };
  
  setTimeout(function () {
    if (oddType) {
      ctrl.data = {
        oddType  : oddType.OddType,
        title    : oddType.Title,
        ordering : oddType.Ordering,
        column   : oddType.SetColumn,
        shortName: oddType.ShortName
      }
    } else {
      ctrl.data = {
        oddType  : ctrl.findMax(oddTypesArray, 'OddType') + 1,
        title    : null,
        ordering : ctrl.findMax(oddTypesArray, 'Ordering') + 1,
        column   : ctrl.createColumn(oddTypesArray[ oddTypesArray.length - 1 ].SetColumn),
        shortName: null
      };
    }
  });
  
  this.addSport = function () {
    ngDialog.openConfirm({
      template        : addSportTemp,
      plain           : true,
      controller      : addSportCtrl,
      controllerAs    : 'vm',
      width           : '800px',
      disableAnimation: true
    }).then(function (sportId) {
      bt.addOddTypeSport(sportId, oddType.Id).then(function () {
        ctrl.refreshSports();
      })
    })
  };
  
  this.deleteSport = function (Id) {
    bt.deleteOddTypeSport(Id).then(function () {
      ctrl.refreshSports();
    })
  };
  
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  });
};
