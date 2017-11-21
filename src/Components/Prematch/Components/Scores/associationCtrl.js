module.exports = function ($scope, score, sportId, scoresResource, confirmationWindow) {
  'use strict';
  var _this              = this;
  var s                  = scoresResource;
  this.systemScoresTable = null;
  
  s.system.get(sportId).then(function (systemScores) {
    _this.systemScoresTable = systemScores;
  });
  
  this.associate = function (systemScore) {
    confirmationWindow.open('Are you sure?').then(function () {
      s.prematch.associate({
        ExScoreGroupID: score.ID,
        ScoreGroupID  : systemScore ? systemScore.Id : null
      }).then(function () {
        $scope.confirm(true);
      })
    })
  };
};
