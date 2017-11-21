module.exports = function (score, cacheSvc, scoresResource, ngDialog, $scope) {
  'use strict';
  var _this = this;
  var s     = scoresResource;
  
  this.buttonText = score ? 'Save' : 'Create';
  this.isManage   = !!score;
  this.name       = score ? score.Name : null;
  this.ordering   = score ? score.Ordering : null;
  this.period     = score ? score.PeriodNumber : null;
  this.code       = score ? score.Code : null;
  this.isCalc     = score ? score.IsCalc : false;
  this.sports     = null;
  this.kinds      = {
    options: [],
    model  : null
  };
  this.types      = {
    options: [],
    model  : null
  };
  
  this.modal = {
    ctrl: null,
    temp: require('./addSportModalTemp.html')
  };
  
  cacheSvc.get('scoreKinds').then(function (kinds) {
    _this.kinds.options = kinds;
    if (score) {
      _this.kinds.options.forEach(function (kind, i) {
        if (kind.Id === score.ScoreKindId)
          _this.kinds.model = _this.kinds.options[ i ];
      })
    } else {
      _this.kinds.model = _this.kinds.options[ 0 ];
    }
  });
  
  cacheSvc.get('scoreTypes').then(function (types) {
    _this.types.options = types;
    if (score) {
      _this.types.options.forEach(function (type, i) {
        if (type.Id === score.ScoreTypeId)
          _this.types.model = _this.types.options[ i ];
      })
    } else {
      _this.types.model = _this.types.options[ 0 ];
    }
  });
  
  this.getSports = function (need) {
    if (!_this.sports || need) {
      s.system.getSports(score.Id).then(function (scoreGroupSports) {
        _this.sports = scoreGroupSports;
      });
    }
  };
  
  this.removeSport = function (sport) {
    s.system.removeSport(sport.ID).then(function () {
      _this.getSports(true);
    })
  };
  
  this.addSport = function () {
    require.ensure([], function () {
      _this.modal.ctrl = require('./addSportModalCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template  : _this.modal.temp,
        controller: _this.modal.ctrl,
      }).then(function (sportID) {
        if (sportID)
          s.system.addSport(sportID, score.Id).then(function () {
            _this.getSports(true);
          });
      });
    });
  };
  
  this.submit = function () {
    if (!_this.isManage) {
      s.system.insert(
        _this.name,
        _this.types.model.Id,
        _this.ordering,
        _this.kinds.model.Id,
        _this.period,
        _this.code,
        _this.isCalc
      ).then(function () {
        $scope.confirm(true);
      })
    } else {
      s.system.update(
        score.Id,
        _this.name,
        _this.types.model.Id,
        _this.ordering,
        _this.kinds.model.Id,
        _this.period,
        _this.code,
        _this.isCalc
      ).then(function () {
        $scope.confirm(true);
      })
    }
  };
  
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 100);
};
