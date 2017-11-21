angular.module('app')
       .service('translationsResource', function ($http, CONFIG, toastr, $rootScope) {
         var url     = CONFIG.api.url;
         this.system = Object.create(null);
         this.client = Object.create(null);
  
  
         /**
          * Get availible translations.
          * @returns {*|Promise.<TResult>}
          */
         this.get = function (translationEntityNameId,
                              languageCode,
                              distributeTemplateId,
                              hasActiveEvent,
                              searchText,
                              pageNumber,
                              rowCount) {
           return $http({
             method: 'GET',
             url   : url + 'translations/translations/get',
             params: {
               translationEntityNameId: translationEntityNameId,
               languageCode           : languageCode,
               distributeTemplateId   : distributeTemplateId,
               hasActiveEvent         : hasActiveEvent,
               searchText             : searchText,
               pageNumber             : pageNumber,
               rowCount               : rowCount
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading translates');
           });
         };
  
         this.getByID = function (translationEntityNameId,
                                  RecordId,
                                  distributeTemplateId) {
           return $http({
             method: 'GET',
             url   : url + 'translations/translationsbyid/get',
             params: {
               translationEntityNameId: translationEntityNameId,
               RecordId               : RecordId,
               distributeTemplateId   : distributeTemplateId
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading translates');
           });
         };
  
         this.getLanguages = function (userID) {
           return $http({
             method: 'GET',
             url   : url + 'translations/languages/get',
             params: {
               UserPersonnelId: userID ? userID : null
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading languages');
           });
         };
  
         this.getEntities = function () {
           return $http({
             method: 'GET',
             url   : url + 'translations/translationentitymames/get'
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading entities');
           });
         };
  
         this.system.update = function (TranslationEntityNameID, LanguageCode, RecordID, Translate) {
           return $http({
             method: 'POST',
             url   : url + 'translations/translations/update',
             data  : {
               TranslationEntityNameID: TranslationEntityNameID,
               LanguageCode           : LanguageCode,
               RecordID               : RecordID,
               Translate              : Translate
             }
           }).then(function successCallback () {
             toastr.success('System translate successfully updated!');
           }, function errorCallback () {
             toastr.error('An error occurred while updating translate!');
           });
         };
  
         this.client.update = function (TranslationEntityNameID, LanguageCode, RecordID, Translate, distTemplateID) {
           return $http({
             method: 'POST',
             url   : url + 'translations/translationdistributetemplates/update',
             data  : {
               TranslationEntityNameID: TranslationEntityNameID,
               LanguageCode           : LanguageCode,
               RecordID               : RecordID,
               Translate              : Translate,
               DistributeTemplateID   : distTemplateID
             }
           }).then(function successCallback () {
             toastr.success('Client translate successfully updated!');
           }, function errorCallback () {
             toastr.error('An error occurred while updating translate!');
           });
         };
  
       });


