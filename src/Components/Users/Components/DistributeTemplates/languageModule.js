module.exports = function (_this, cacheSvc, u, toastr, distTemplate) {
  
  _this.templateLanguagesTable = null;
  
  _this.language = {
    options: null,
    model  : null
  };
  
  _this.loadDistLanguages = function (needToRefresh) {
    if (!_this.templateLanguagesTable || needToRefresh)
      u.distributeTemplates.getDistributedLanguages({ID: distTemplate.ID})
       .then(function (templateLanguages) {
         _this.templateLanguagesTable = templateLanguages;
       });
    
    if (!_this.language.options)
      cacheSvc.get('translationsLanguages').then(function (languages) {
        _this.language.options = languages;
        _this.language.model   = _this.language.options[ 0 ];
      });
  };
  
  _this.deleteDistLanguage = function (ID) {
    u.distributeTemplates.deleteDistributedLanguage({ID: ID})
     .then(function () {
       _this.loadDistLanguages(true);
     })
  };
  
  _this.languageAlreadyExist = function () {
    var flag = false;
    _this.templateLanguagesTable.forEach(function (language) {
      if (language.LanguageName === _this.language.model.Name) flag = true;
    });
    return flag;
  };
  
  _this.addDistLanguage = function () {
    if (!_this.languageAlreadyExist()) {
      u.distributeTemplates
       .addDistributedLanguage({distTemplateID: distTemplate.ID, LanguageID: _this.language.model.ID})
       .then(function () {
         _this.loadDistLanguages(true);
       })
    } else toastr.warning('Selected language already exist!');
  };
  
};
