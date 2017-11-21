//var allTranslatesTemp = require('./../allTranslations/allTranslationsModalTemp.html');
//var allTranslatesCtrl = require('./../allTranslations/allTranslationsModalCtrl');

module.exports = function (translation,
                           currentLanguage,
                           currentEntityID,
                           confirmationWindow,
                           translationsResource,
                           ngDialog,
                           mode,
                           $scope,
                           distTemplateID,
                           teamsResource) {
  'use strict';
  var _this = this;
  var t     = translationsResource;
  var tm    = teamsResource;
  
  this.mode               = mode;
  this.currentLanguage    = currentLanguage;
  this.translation        = translation;
  this.currentTranslation = null;
  this.teamTranslation    = !!translation.TeamID;
  this.teamLeagues        = null;
  
  if (mode === 'client') {
    _this.currentTranslation = _this.translation.DistributeTemplateTranslate;
  } else if (mode === 'system') {
    _this.currentTranslation = _this.translation.Translate;
  } else {
    ngDialog.closeAll();
  }
  
  
  this.save = function () {
    var translation = _this.currentTranslation.length ? _this.currentTranslation : null;
    confirmationWindow.open().then(function () {
      t[ _this.mode ].update(
        currentEntityID,
        currentLanguage.Code,
        _this.translation.RecordId,
        translation,
        distTemplateID
      ).then(function () {
        $scope.confirm(true);
      })
    })
  };
  
  this.checkAll = function () {
    ngDialog.openConfirm({
      controller  : allTranslatesCtrl,
      controllerAs: 'vm',
      template    : allTranslatesTemp,
      plain       : true,
      width       : '800px',
      resolve     : {
        currentLanguage: function () {
          return currentLanguage;
        },
        currentEntityID: function () {
          return currentEntityID
        },
        mode           : function () {
          return mode;
        },
        distTemplateID : function () {
          return distTemplateID;
        },
        RecordId       : function () {
          return _this.translation.RecordId
        }
      }
    })
  };
  
  this.acceptTranslation = function () {
    _this.currentTranslation = _this.translation.DistributeTemplateTranslate;
    
    setTimeout(function () {
      _this.save();
    }, 200);
  };
  
  this.checkTeam = function () {
    if (translation.TeamID)
      tm.system.getLeagues({teamID: translation.TeamID})
        .then(function (teamLeagues) {
          _this.teamLeagues = teamLeagues;
        });
  };
  
  this.checkTeam();
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 50);
};
