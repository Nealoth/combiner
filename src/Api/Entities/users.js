angular.module('app')
       .service('usersResource', function ($rootScope, $http, CONFIG, toastr) {
         var url = CONFIG.api.url;
  
         this.modules                   = Object.create(null);
         this.users                     = Object.create(null);
         this.clients                   = Object.create(null);
         this.distributeTemplates       = Object.create(null);
         this.userRightsTemplates       = Object.create(null);
         this.userRightsTemplateModules = Object.create(null);
  
         this.urt  = this.userRightsTemplates;
         this.urtm = this.userRightsTemplateModules;
  
         /**
          * Get list of actual pages and modules, used in this web app.
          * @returns {*|Promise.<TResult>}
          */
         this.modules.get = function () {
           return $http({
             method: 'GET',
             url   : url + 'user/modules'
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading modules');
           });
         };
  
         /**
          * Create module or page of this web app.
          * @param Name
          * @param ModuleIDParent
          * @returns {*|Promise.<TResult>}
          */
         this.modules.create = function (Name, ModuleIDParent) {
           return $http({
             method: 'POST',
             url   : url + 'user/modules_i',
             data  : {
               Name          : Name,
               ModuleIDParent: ModuleIDParent
             }
           }).then(function successCallback () {
             toastr.success('Module successfully created!');
           }, function errorCallback () {
             toastr.error('An error occurred while module insertion!');
           });
         };
  
         this.modules.delete = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/modules_d',
             data  : {
               Id: req.ID,
             }
           }).then(function successCallback () {
             toastr.success('Module successfully deleted!');
           }, function errorCallback () {
             toastr.error('An error occurred while module deleting!');
           });
         };
  
         /**
          * Get list of current user templates.
          * @returns {*|Promise.<TResult>}
          */
         this.distributeTemplates.get = function () {
           return $http({
             method: 'GET',
             url   : url + 'base/distributetemplates/get'
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading distribute templates');
           });
         };
  
  
         this.distributeTemplates.create = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/distributetemplates_i',
             data  : {
               Name                    : req.Name,
               ServiceId               : req.ServiceId,
               Us_ClientId             : req.Us_ClientId,
               OddsKey                 : req.OddsKey,
               Mult                    : req.Mult,
               MinimumOffer            : req.MinimumOffer,
               MaximumCap              : req.MaximumCap,
               DistributeTemplateIdBase: req.DistributeTemplateIdBase,
               OddsKeyCopy             : req.OddsKeyCopy,
               MultCopy                : req.MultCopy,
               MinimumOfferCopy        : req.MinimumOfferCopy,
               MaximumCapCopy          : req.MaximumCapCopy,
             }
           }).then(function successCallback () {
             toastr.success('Distribute template successfully created!');
           }, function errorCallback () {
             toastr.error('An error occurred while distribute template insertion!');
           });
         };
  
  
         this.distributeTemplates.update = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/distributetemplates_u',
             data  : {
               DistributeTemplateId    : req.DistributeTemplateId,
               Name                    : req.Name,
               ServiceId               : req.ServiceId,
               Us_ClientId             : req.Us_ClientId,
               OddsKey                 : req.OddsKey,
               Mult                    : req.Mult,
               MinimumOffer            : req.MinimumOffer,
               MaximumCap              : req.MaximumCap,
               DistributeTemplateIdBase: req.DistributeTemplateIdBase,
               OddsKeyCopy             : req.OddsKeyCopy,
               MultCopy                : req.MultCopy,
               MinimumOfferCopy        : req.MinimumOfferCopy,
               MaximumCapCopy          : req.MaximumCapCopy,
             }
           }).then(function successCallback () {
             toastr.success('Distribute template successfully updated!');
           }, function errorCallback () {
             toastr.error('An error occurred while distribute template insertion!');
           });
         };
  
         this.distributeTemplates.getDistributedLanguages = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'user/distributetemplatelanguages/get',
             params: {
               distributeTemplateId: req.ID
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading distribute template distributed languages');
           });
         };
  
         this.distributeTemplates.addDistributedLanguage = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/distributetemplatelanguages/insert',
             data  : {
               Int1: req.distTemplateID,
               Int2: req.LanguageID
             }
           }).then(function successCallback () {
             toastr.success('Distributed language successfully added!');
           }, function errorCallback () {
             toastr.error('An error occurred while distributed language insertion!');
           });
         };
  
         this.distributeTemplates.deleteDistributedLanguage = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/distributetemplatelanguages/delete',
             data  : {
               Id: req.ID
             }
           }).then(function successCallback () {
             toastr.success('Distributed language successfully deleted from distribute template!');
           }, function errorCallback () {
             toastr.error('An error occurred while distributed language removing from distribute template!');
           });
         };
  
         /**
          * Get templates of rights collections of users.
          * @returns {*|Promise.<TResult>}
          */
         this.userRightsTemplates.get = function () {
           return $http({
             method: 'GET',
             url   : url + 'user/us_templates_s'
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading user rights templates');
           });
         };
  
         /**
          * Create user rights template.
          * @param Name
          * @returns {*|Promise.<TResult>}
          */
         this.userRightsTemplates.create = function (Name) {
           return $http({
             method: 'POST',
             url   : url + 'user/us_templates_i',
             data  : {
               Name: Name
             }
           }).then(function successCallback () {
             toastr.success('User rights template successfully created!');
           }, function errorCallback () {
             toastr.error('An error occurred while user rights template creation!');
           });
         };
  
         /**
          * Update name of user rights template.
          * @param Name
          * @param Us_TemplateId
          * @returns {*|Promise.<TResult>}
          */
         this.userRightsTemplates.update = function (Name, Us_TemplateId) {
           return $http({
             method: 'POST',
             url   : url + 'user/us_templates_u',
             data  : {
               Us_TemplateId: Us_TemplateId,
               Name         : Name
             }
           }).then(function successCallback () {
             toastr.success('User rights template successfully updated!');
           }, function errorCallback () {
             toastr.error('An error occurred while user rights template updating!');
           });
         };
  
         /**
          * Get modules included in rights template.
          * @param Us_TemplateId
          * @returns {*|Promise.<TResult>}
          */
         this.userRightsTemplateModules.get = function (Us_TemplateId) {
           return $http({
             method: 'GET',
             url   : url + 'user/templatemodules_s',
             params: {
               Us_TemplateId: Us_TemplateId
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading user rights template modules');
           });
         };
  
         /**
          * Add module to rights template.
          * @param Us_TemplateId
          * @param ModuleId
          * @returns {*|Promise.<TResult>}
          */
         this.userRightsTemplateModules.insert = function (Us_TemplateId, ModuleId) {
           return $http({
             method: 'POST',
             url   : url + 'user/templatemodules_i',
             data  : {
               Us_TemplateId: Us_TemplateId,
               ModuleId     : ModuleId
             }
           }).then(function successCallback () {
             toastr.success('Module successfully added!');
           }, function errorCallback () {
             toastr.error('An error occurred!');
           });
         };
  
         /**
          * Delete module from rights template.
          * @param Id
          * @returns {*|Promise.<TResult>}
          */
         this.userRightsTemplateModules.delete = function (Us_TemplateId, ModuleId) {
           return $http({
             method: 'POST',
             url   : url + 'user/templatemodules_d',
             data  : {
               Us_TemplateId: Us_TemplateId,
               ModuleId     : ModuleId
             }
           }).then(function successCallback () {
             toastr.success('Module successfully deleted!');
           }, function errorCallback () {
             toastr.error('An error occurred!');
           });
         };
  
         this.activity = function (dateBegin, dateEnd, userPersonnelId) {
           return $http({
             method: 'GET',
             url   : url + 'user/userpersonneladminlogs_s',
             params: {
               dateBegin      : dateBegin,
               dateEnd        : dateEnd,
               userPersonnelId: userPersonnelId,
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading user activity logs');
           });
         };
  
         this.users.get = function (dateBegin, dateEnd, userPersonnelId) {
           return $http({
             method: 'GET',
             url   : url + 'user/userpersonels_s',
             params: {
               dateBegin      : dateBegin,
               dateEnd        : dateEnd,
               userPersonnelId: userPersonnelId,
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading users');
           });
         };
  
         this.users.create = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/userpersonels_i',
             data  : {
               FirstName           : req.FirstName,
               SecondName          : req.SecondName,
               MiddleName          : req.MiddleName,
               Sex                 : req.Sex,
               DateOfBirth         : req.DateOfBirth,
               Email               : req.Email,
               UTCDiff             : req.UTCDiff,
               Type                : req.Type,
               Login               : req.Login,
               Password            : req.Password,
               DistributeTemplateId: req.DistributeTemplateId,
               Us_TemplateId       : req.Us_TemplateId
             }
           }).then(function successCallback () {
             toastr.success('User successfully created!');
           }, function errorCallback () {
             toastr.error('An error occurred while user creation!');
           });
         };
  
         this.users.update = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/userpersonels_u',
             data  : {
               FirstName           : req.FirstName,
               SecondName          : req.SecondName,
               MiddleName          : req.MiddleName,
               Sex                 : req.Sex,
               DateOfBirth         : req.DateOfBirth,
               Email               : req.Email,
               UTCDiff             : req.UTCDiff,
               Type                : req.Type,
               Login               : req.Login,
               Password            : req.Password,
               DistributeTemplateId: req.DistributeTemplateId,
               Us_TemplateId       : req.Us_TemplateId,
               UserPersonnelId     : req.UserPersonnelID,
               PersonnelId         : req.PersonnelID
             }
           }).then(function successCallback () {
             toastr.success('User successfully updated!');
           }, function errorCallback () {
             toastr.error('An error occurred while user updating!');
           });
         };
  
         this.users.getClients = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'user/clients_userpersonnels/get',
             params: {
               userPersonnelId: req.userID
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading user clients');
           });
         };
  
         this.users.addClient = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/clients_userpersonnels/insert',
             data  : {
               Int1: req.Us_ClientID,
               Int2: req.UserPersonnelID,
             }
           }).then(function () {
             toastr.success('User client successfully added!');
           }, function () {
             toastr.error('An error occurred while adding user client');
           });
         };
  
         this.users.deleteClient = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/clients_userpersonnels/delete',
             data  : {
               Id: req.ID,
             }
           }).then(function () {
             toastr.success('User client successfully deleted!');
           }, function () {
             toastr.error('An error occurred while deleting user client');
           });
         };
  
         this.users.getLanguages = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'user/userpersonnellanguages/get',
             params: {
               userPersonnelId: req.userID
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading user languages');
           });
         };
  
         this.users.addLanguage = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/userpersonnellanguages/insert',
             data  : {
               Int1: req.userID,
               Int2: req.languageID
             }
           }).then(function () {
             toastr.success('User language successfully deleted!');
           }, function () {
             toastr.error('An error occurred!');
           });
         };
  
         this.users.deleteLanguage = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/userpersonnellanguages/delete',
             data  : {
               Id: req.languageID
             }
           }).then(function () {
             toastr.success('User language successfully deleted!');
           }, function () {
             toastr.error('An error occurred while deleting user language');
           });
         };
  
         this.clients.get = function () {
           return $http({
             method: 'GET',
             url   : url + 'user/clients/get'
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading clients');
           });
         };
  
         this.clients.update = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/clients/update',
             data  : {
               Us_TemplateId: req.Us_TemplateId,
               Name         : req.Name
             }
           }).then(function successCallback () {
             toastr.success('Client successfully updated!');
           }, function errorCallback () {
             toastr.error('An error occurred while client updating!');
           });
         };
  
         this.clients.create = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/clients/insert',
             data  : {
               Name: req.Name
             }
           }).then(function successCallback () {
             toastr.success('Client successfully created!');
           }, function errorCallback () {
             toastr.error('An error occurred while client creating!');
           });
         };
  
         this.clients.delete = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'user/clients/delete',
             data  : {
               Id: req.Id
             }
           }).then(function successCallback () {
             toastr.success('Client successfully created!');
           }, function errorCallback () {
             toastr.error('An error occurred while client creating!');
           });
         };
  
  
       });
	

