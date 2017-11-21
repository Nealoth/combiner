module.exports = function (current, oddsKeysResource, rights, toastr, $scope, confirmationWindow) {
  'use strict';
  var _this = this;
  var ok    = oddsKeysResource;
  
  this.tree = {
    isLive  : current.liveType,
    isActive: false
  };
  
  this.current = {
    sport : null,
    league: null,
    event : null
  };
  
  this.modify = {
    mult    : null,
    oddsKey : null,
    minOffer: null,
    maxCap  : null
  };
  
  this.rights = rights.viewAnotherTemplates;
  
  this.distTemplate = current.distTemplate;
  
  this.table = null;
  
  this.getOddsKeys = function (treeData) {
    
    if (treeData) {
      _this.current.sport  = treeData.sport ? treeData.sport.ID : null;
      _this.current.league = treeData.league ? treeData.league.ID : null;
      _this.current.event  = treeData.event ? treeData.event.ID : null;
    } else if (!_this.current.sport) return;
    
    ok.get(
      !!_this.tree.isLive,
      _this.distTemplate,
      _this.current.sport,
      _this.current.league,
      _this.current.event
    ).then(function (oddsKeys) {
      _this.table = oddsKeys;
    });
    
  };
  
  this.submit = function () {
    if (!_this.table)
      toastr.warning('Please select template');
    else {
      
      var copyData = {
        dif     : {
          mult    : _this.modify.mult ? _this.modify.mult : 0,
          oddsKey : _this.modify.oddsKey ? _this.modify.oddsKey : 0,
          minOffer: _this.modify.minimumOffer ? _this.modify.minimumOffer : 0,
          maxCap  : _this.modify.maximumCap ? _this.modify.maximumCap : 0
        },
        copyFrom: {
          sport   : _this.current.sport,
          league  : _this.current.league,
          event   : _this.current.event,
          template: _this.distTemplate
        }
      };
      
      confirmationWindow.open().then(function () {
        $scope.confirm(copyData);
      });
      
    }
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 100);
};
