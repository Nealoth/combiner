angular.module('app')
       .service('oddsResource', function ($http, CONFIG, toastr) {
         var url = CONFIG.api.url;
  
         this.system          = Object.create(null);
         this.system.prematch = Object.create(null);
         this.live            = Object.create(null);
         this.prematch        = Object.create(null);
  
         /**
          * Get system odds of event (Used in live monitoring).
          * @param eventIds
          * @param syncDate
          * @returns {*|Promise.<TResult>}
          */
         this.system.get = function (eventIds, syncDate) {
           return $http({
             method: 'GET',
             url   : url + 'eventmonitoring/eventodd_s',
             params: {
               eventIds: eventIds,
               syncDate: syncDate
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading event odds');
           });
         };
  
         /**
          * Get live odds by event (Used in live monitoring).
          * @param exEventIds
          * @param syncDate
          * @returns {*|Promise.<TResult>}
          */
         this.live.get = function (exEventIds, syncDate) {
           return $http({
             method: 'GET',
             url   : url + 'live/liveeventodds/get',
             params: {
               exEventIds: exEventIds,
               syncDate  : syncDate
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading event odds');
           });
         };
  
         /**
          * Get odds of system prematch event (Used in system prematch monitoring).
          * @param req
          * @returns {*|Promise.<TResult>}
          */
         this.system.prematch.get = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'eventmonitoring/prematchodds/get',
             params: {
               distributeTemplateId: req.distributeTemplateId,
               eventId             : req.eventId
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading event odds');
           });
         };
  
         this.prematch.get = function (exEventIds, syncDate) {
           return $http({
             method: 'GET',
             url   : url + 'prematch/exeventodds/get',
             params: {
               exEventIds: exEventIds,
               syncDate  : syncDate
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading event odds');
           });
         };
  
         /**
          * Resend odds to client in system prematch monitoring.
          * @param req
          * @returns {*|Promise.<TResult>}
          */
         this.prematch.resendOdds = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'eventmonitoring/prematchdate/update',
             data  : {
               Id: req.ID
             }
           }).then(function successCallback () {
             toastr.success('Odds successfully sent!');
           }, function errorCallback () {
             toastr.error('An error occurred odds resending!');
           });
         }
  
       });


