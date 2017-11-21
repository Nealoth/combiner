angular.module('app')
       .service('oddsKeysResource', function ($http, $rootScope, CONFIG, toastr) {
         var url = CONFIG.api.url;
  
         /**
          * Get odds keys of system entity (it can be league, sport or event).
          * @param isLive
          * @param distributeTemplateId
          * @param sportId
          * @param leagueId
          * @param eventId
          * @returns {*|Promise.<TResult>}
          */
         this.get = function (isLive, distributeTemplateId, sportId, leagueId, eventId) {
           return $http({
             method: 'GET',
             url   : url + 'configuration/oddskey/get',
             params: {
               isLive              : isLive,
               distributeTemplateId: distributeTemplateId,
               sportId             : sportId,
               leagueId            : leagueId,
               eventId             : eventId
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading odds keys');
           });
         };
  
         this.update = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'configuration/oddskey/update',
             data  : {
               settings: req
             }
           }).then(function successCallback () {
             toastr.success('Odd Keys successfully updated!');
           }, function errorCallback () {
             toastr.error('Odd Key updating has failed!');
           });
         };
  
         this.copy = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'configuration/oddskey/copy',
             data  : {
               IsLive                      : req.IsLive,
               DistributeTemplateId        : req.DistributeTemplateId,
               SportId                     : req.SportId,
               LeagueId                    : req.LeagueId,
               EventId                     : req.EventId,
               DistributeTemplateIdCopyFrom: req.DistributeTemplateIdCopyFrom,
               SportIdCopyFrom             : req.SportIdCopyFrom,
               LeagueIdCopyFrom            : req.LeagueIdCopyFrom,
               EventIdCopyFrom             : req.EventIdCopyFrom,
               OddsKeyDif                  : req.OddsKeyDif,
               MultDif                     : req.MultDif,
               MinimumOfferDif             : req.MinimumOfferDif,
               MaximumCapDif               : req.MaximumCapDif,
             }
           }).then(function successCallback () {
             toastr.success('Template successfully copied!');
           }, function errorCallback () {
             toastr.error('An error occured!');
           });
         };
  
       });


