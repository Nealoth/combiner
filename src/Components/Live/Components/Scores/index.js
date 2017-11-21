function Live_Scores ($rootScope, scoresResource, ngDialog) {
  var _this       = this;
  var ss          = scoresResource;
  this.liveScores = [];
  
  this.filters = {
    sport : null,
    source: null
  };
  
  this.modal = {
    ctrl: null,
    temp: require('./liveScoreAssociationTemp.html')
  };
  
  this.refreshTable = function () {
    ss.live.get(_this.filters.source.Id,
      _this.filters.sport).then(function (liveScores) {
      _this.liveScores = liveScores;
    })
  };
  
  this.associate = function (liveScore) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./liveScoreAssociationCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template  : _this.modal.temp,
        controller: _this.modal.ctrl,
        resolve   : {
          liveScore: function () {
            return liveScore;
          },
          sportId  : function () {
            return _this.filters.sport
          }
        }
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refreshTable();
      })
    });
  }
}

module.exports = {
  template    : require('./live.scores.html'),
  controller  : Live_Scores,
  controllerAs: 'vm'
};
