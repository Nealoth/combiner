module.exports = function (person, cacheSvc, usersResource, $scope, toastr) {
  'use strict';
  var _this             = this;
  this.isManage         = !!person;
  this.person           = person;
  this.buttonText       = _this.isManage ? "Save changes" : "Create user";
  var u                 = usersResource;
  this.clients          = null;
  this.totalClients     = [];
  this.selectedClient   = null;
  this.selectedLanguage = null;
  this.totalLanguages   = [];
  this.languages        = null;
  
  cacheSvc.get('clients').then(function (clients) {
    _this.totalClients   = clients;
    _this.selectedClient = _this.totalClients[ 0 ];
  });
  
  cacheSvc.get('translationsLanguages').then(function (languages) {
    _this.totalLanguages   = languages;
    _this.selectedLanguage = _this.totalLanguages[ 0 ];
  });
  
  this.userType = {
    options: [
      {
        name : "Oddscombiner admin-webapp users",
        value: 0
      },
      {
        name : "Statistic Api users",
        value: 1
      }
    ],
    model  : null
  };
  
  this.sex = {
    options: [ "M", "W" ],
    model  : null
  };
  
  this.distTemplate = {
    options: [],
    model  : null
  };
  
  this.userTemplate = {
    options: [],
    model  : null
  };
  
  //------User type
  setTimeout(function () {
    if (_this.isManage) {
      _this.userType.options.forEach(function (item, i) {
        if (item.value === person.Type) _this.userType.model = _this.userType.options[ i ];
      })
    } else _this.userType.model = _this.userType.model = _this.userType.options[ 0 ];
  });
  
  //-------Dist templates
  this.loadDistTemplates = function (mode) {
    cacheSvc[ mode ]('distTemplates').then(function (distTemplates) {
      _this.distTemplate.options = distTemplates;
      if (_this.isManage) {
        _this.distTemplate.options.forEach(function (item, i) {
          if (item.ID === person.DistributeTemplateID) _this.distTemplate.model = _this.distTemplate.options[ i ];
        })
      } else _this.distTemplate.model = null;
    });
  };
  this.loadDistTemplates('get');
  
  //--------Sex
  setTimeout(function () {
    if (_this.isManage) {
      _this.sex.options.forEach(function (item, i) {
        if (item === person.Sex) _this.sex.model = _this.sex.options[ i ];
      })
    } else _this.sex.model = _this.sex.options[ 0 ];
  });
  
  //------Us template
  this.loadSystemRights = function (mode) {
    cacheSvc[ mode ]("systemRights").then(function (rightsTemplates) {
      _this.userTemplate.options = rightsTemplates;
      if (_this.isManage) {
        _this.userTemplate.options.forEach(function (item, i) {
          if (item.Id === person.Us_TemplateID) _this.userTemplate.model = _this.userTemplate.options[ i ];
        })
      } else _this.userTemplate.model = null;
    })
  };
  this.loadSystemRights('get');
  
  this.submit = function () {
    'use strict';
    var req = {
      FirstName           : _this.person.FirstName,
      SecondName          : _this.person.SecondName,
      MiddleName          : _this.person.MiddleName,
      Sex                 : _this.sex.model,
      DateOfBirth         : _this.person.DateOfBirth ? moment(_this.person.DateOfBirth).format('YYYY-MM-DD') + 'T00:00:00' : null,
      Email               : _this.person.Email,
      UTCDiff             : _this.person.UTCDiff,
      Type                : _this.userType.model.value,
      Login               : _this.person.Login,
      Password            : _this.isManage ? null : _this.person.Password,
      DistributeTemplateId: _this.distTemplate.model ? _this.distTemplate.model.ID : null,
      Us_TemplateId       : _this.userTemplate.model ? _this.userTemplate.model.Id : null
    };
    
    if (_this.isManage) {
      req.UserPersonnelID = person.UserPersonnelID;
      req.PersonnelID     = person.PersonnelID;
      u.users.update(req).then(function () {
        $scope.confirm(true);
      })
    } else {
      u.users.create(req).then(function () {
        $scope.confirm(true);
      })
    }
  };
  
  this.loadClients = function (needToLoad) {
    if (!_this.clients || needToLoad) {
      u.users.getClients({userID: person.UserPersonnelID}).then(function (clients) {
        _this.clients = clients;
      })
    }
  };
  
  this.clientAlreadyExist = function () {
    var flag = false;
    _this.clients.forEach(function (client) {
      if (client.ClientName === _this.selectedClient.Name) flag = true;
    });
    return flag;
  };
  
  this.addClient = function () {
    if (_this.clientAlreadyExist()) {
      toastr.warning('Selected client alredy exist in clients list!');
    } else {
      u.users.addClient({Us_ClientID: _this.selectedClient.ID, UserPersonnelID: person.UserPersonnelID})
       .then(function () {
         _this.loadClients(true);
       })
    }
  };
  
  this.deleteClient = function (ID) {
    u.users.deleteClient({ID: ID})
     .then(function () {
       _this.loadClients(true);
     })
  };
  
  this.loadAvailableLanguages = function (needToLoad) {
    if (!_this.languages || needToLoad) {
      u.users.getLanguages({userID: person.UserPersonnelID}).then(function (languages) {
        _this.languages = languages;
      })
    }
  };
  
  this.languageAlreadyExist = function () {
    var flag = false;
    _this.languages.forEach(function (language) {
      if (language.LanguageName === _this.selectedLanguage.Name) flag = true;
    });
    return flag;
  };
  
  this.addLanguage = function () {
    if (_this.languageAlreadyExist()) {
      toastr.warning('Selected language alredy exist in languages list!');
    } else {
      u.users.addLanguage({userID: person.UserPersonnelID, languageID: _this.selectedLanguage.ID})
       .then(function () {
         _this.loadAvailableLanguages(true);
       })
    }
  };
  
  this.deleteLanguage = function (languageID) {
    u.users.deleteLanguage({languageID: languageID}).then(function () {
      _this.loadAvailableLanguages(true);
    })
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 100)
};
