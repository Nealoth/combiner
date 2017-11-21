function System_Scores (scoresResource, ngDialog) {
  'use strict';
  var _this = this;
  var s     = scoresResource;
  
  this.sport       = null;
  this.scoresTable = [];
  this.search      = '';
  
  this.modal = {
    ctrl: null,
    temp: require('./editScoreModalTemp.html')
  };
  
  
  this.refresh = function () {
    'use strict';
    var sport = _this.sport;
    s.system.get(sport, null).then(function (scores) {
      _this.scoresTable = scores;
    });
  };
  
  this.openModal = function (score) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./editScoreModalCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template    : _this.modal.temp,
        controller  : _this.modal.ctrl,
        resolve     : {
          score: function () {
            return score;
          }
        }
      }).then(function (needToRefreshTable) {
        if (needToRefreshTable) _this.refresh();
      });
    });
  }
  
}

module.exports = {
  template    : require('./system.scores.html'),
  controller  : System_Scores,
  controllerAs: 'vm'
};
