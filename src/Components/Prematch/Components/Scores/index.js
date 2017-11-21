function Prematch_Scores ($rootScope, scoresResource, ngDialog) {
  var _this   = this;
  var s       = scoresResource;
  this.scores = [];
  
  this.filters = {
    sport : null,
    source: null
  };
  
  this.modal = {
    ctrl: null,
    temp: require('./associationTemp.html')
  };
  
  this.refreshTable = function () {
    s.prematch.get({
       serviceId: _this.filters.source.Id,
       SportId  : _this.filters.sport
     })
     .then(function (scores) {
       _this.scores = scores;
     })
  };
  
  this.associate = function (score) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./associationCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        template    : _this.modal.temp,
        controller  : _this.modal.ctrl,
        resolve     : {
          score  : function () {
            return score;
          },
          sportId: function () {
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
  template    : require('./prematch.scores.html'),
  controller  : Prematch_Scores,
  controllerAs: 'vm'
};
