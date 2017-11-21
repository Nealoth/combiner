var temp = require('./addChildTeamTemp.html');

module.exports = function (_this, teamsResource, team, ngDialog, confirmationWindow) {
  'use strict';
  var t = teamsResource;
  
  _this.childTeams = null;
  
  _this.loadChilds = function () {
    t.system.getChilds({teamId: team.ID}).then(function (childs) {
      if (childs) {
        _this.childTeams = childs;
        _this.isLoaded   = true;
      }
    });
  };
  _this.loadChilds();
  
  _this.addChildTeam = function () {
    var ctrl = null;
    
    require.ensure([], function () {
             ctrl = require('./addChildTeamCtrl');
           })
           .then(function () {
             ngDialog.openConfirm({
               template  : temp,
               controller: ctrl,
               resolve   : {
                 currentTeam: function () {
                   return team;
                 }
               }
             }).then(function (childTeamID) {
               t.system.addChild({TeamID: childTeamID, TeamIDChild: team.ID})
                .then(function () {
                  _this.loadChilds();
                })
             })
           });
  };
  
  _this.deleteChild = function (childTeam) {
    confirmationWindow.open().then(function () {
      t.system.deleteChild({ID: childTeam.ID}).then(function () {
        _this.loadChilds();
      });
    });
  }
  
  
};
