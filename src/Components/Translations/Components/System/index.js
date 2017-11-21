function Translations_System ($scope, translationsResource, ngDialog, AppModules, usersResource, CurrentUser) {
  'use strict';
  var _this = this;
  var t     = translationsResource;
  var u     = usersResource;
  
  this.systemRights = AppModules.checkModule(42);
  this.clientRights = AppModules.checkModule(43);
  
  this.additionalFields = null;
  
  this.modal = {
    ctrl: null,
    temp: require('./systemModal/systemTranslateModalTemp.html')
  };
  
  this.fieldsTemplates = {
    Base       : {
      headers: [ 'Original Name' ],
      fields : [ 'OrigineName' ]
    },
    Leagues    : {
      headers: [ 'Sport', 'Original Name' ],
      fields : [ 'SportName', 'OrigineName' ]
    },
    Teams      : {
      headers: [ 'Sport', 'Original Name', 'Team Types' ],
      fields : [ 'SportName', 'OrigineName', 'TeamTypesInfo' ]
    },
    Categories : {
      headers: [ 'Sport', 'Original Name' ],
      fields : [ 'SportName', 'OrigineName' ]
    },
    BetTypes   : {
      headers: [ 'Original Name' ],
      fields : [ 'OrigineName' ]
    },
    BetTypeOdds: {
      headers: [ 'Bet Type', 'Original Name' ],
      fields : [ 'BetTypeName', 'OrigineName' ]
    }
  };
  
  this.checkAdditionalFields = function () {
    if (_this.fieldsTemplates[ _this.filters.entity.EntityName ]) {
      _this.additionalFields = _this.fieldsTemplates[ _this.filters.entity.EntityName ];
    } else _this.additionalFields = _this.fieldsTemplates.Base;
  };
  
  this.filters = {
    language     : {
      options: [],
      model  : null
    },
    entity       : null,
    distTemplates: {
      options: [],
      model  : null
    },
    search       : '',
    hasActive    : false
  };
  
  this.table = [];
  
  t.getLanguages(CurrentUser.get().PersonnelId).then(function (languages) {
    _this.filters.language.options = languages;
    _this.filters.language.model   = _this.filters.language.options[ 0 ];
  });
  
  if (_this.systemRights)
    u.distributeTemplates.get().then(function (distTemplates) {
      _this.filters.distTemplates.options = distTemplates;
      _this.filters.distTemplates.options.forEach(function (option, i) {
        if (CurrentUser.get().DistributeTemplateID === option.ID) {
          _this.filters.distTemplates.model = _this.filters.distTemplates.options[ i ];
          _this.filters.distTemplates.options[ i ].Name += " (Yours)";
        }
      });
    });
  
  this.refresh = function () {
    if (_this.filters.entity) {
      var templateID = !_this.filters.distTemplates.model ? CurrentUser.get().DistributeTemplateID : _this.filters.distTemplates.model.ID;
      
      _this.checkAdditionalFields();
      
      t.get(
        _this.filters.entity.ID,
        _this.filters.language.model.Code,
        templateID,
        _this.filters.hasActive,
        _this.filters.search,
        $scope.currentPage,
        $scope.itemsPerPage
       )
       .then(function (translations) {
         if (translations) {
           _this.table  = translations.Object;
           $scope.count = translations.Count;
         }
       })
    }
  };
  
  this.searchCallback = function () {
    if (_this.filters.search.length > 2) _this.refresh();
  };
  
  this.open = function (translation, mode) {
    if (_this.clientRights && _this.systemRights && mode) {
      _this.openModal(translation, mode);
    } else {
      if (_this.clientRights && !_this.systemRights) {
        _this.openModal(translation, 'client');
      } else if (_this.systemRights && !_this.clientRights) {
        _this.openModal(translation, 'system');
      }
    }
  };
  
  this.openModal = function (translation, mode) {
    require.ensure([], function () {
      _this.modal.ctrl = require('./systemModal/systemTranslateModalCtrl');
    }).then(function () {
      ngDialog.openConfirm({
        controller: _this.modal.ctrl,
        template  : _this.modal.temp,
        width     : '800px',
        resolve   : {
          translation    : function () {
            return translation;
          },
          currentLanguage: function () {
            return _this.filters.language.model;
          },
          currentEntityID: function () {
            return _this.filters.entity.ID
          },
          mode           : function () {
            return mode;
          },
          distTemplateID : function () {
            return !_this.filters.distTemplates.model ? CurrentUser.get().DistributeTemplateID : _this.filters.distTemplates.model.ID;
          }
        }
      }).then(function (needToRefresh) {
        if (needToRefresh) _this.refresh();
      })
    });
  };
}

module.exports = {
  template    : require('./translations.system.html'),
  controller  : Translations_System,
  controllerAs: 'vm'
};
