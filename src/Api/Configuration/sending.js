angular.module('app')
       .service('sendingResource', function ($http, CONFIG, toastr) {
         var url = CONFIG.api.url;
  
         this.prematch = Object.create(null);
  
         this.prematch.get = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'configuration/prematchsending/get',
             params: {
               distributeTemplateId: req.distTemplateId
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading sendings list');
           });
         };
  
         this.prematch.update = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'configuration/prematchsending/update',
             data  : {
               SendingDistributeTemplateId: req.SendingDistributeTemplateId,
               IsLive                     : 0,
               DistributeTemplateId       : req.DistributeTemplateId,
               Link                       : req.Link,
               IsOn                       : req.IsOn
             }
           }).then(function successCallback () {
             toastr.success('Sending configuration successfully updated!');
           }, function errorCallback () {
             toastr.error('An error occurred while sending configuration updating!');
           });
         };
  
         this.prematch.create = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'configuration/prematchsending/insert',
             data  : {
               IsLive              : 0,
               DistributeTemplateId: req.DistributeTemplateId,
               Link                : req.Link,
               IsOn                : req.IsOn
             }
           }).then(function successCallback () {
             toastr.success('Sending configuration successfully created!');
           }, function errorCallback () {
             toastr.error('An error occurred while sending configuration creating!');
           });
         };
  
       });


