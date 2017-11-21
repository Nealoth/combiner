angular.module('app')
       .service('outrightsResource', function ($http, CONFIG, toastr) {
         var url = CONFIG.api.url;
  
         this.system   = Object.create(null);
         this.prematch = Object.create(null);
  
         this.system.get = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'system/eventoutrightodds/get',
             params: {
               sportId   : req.sportID,
               dateEnd   : req.dateEnd,
               categoryId: req.categoryID
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading event outrights!');
           });
         };
  
         this.prematch.get = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'prematch/exeventoutrights/get',
             params: {
               serviceId : req.serviceID.Id,
               sportId   : req.sportID,
               dateEnd   : req.dateEnd,
               categoryId: req.categoryID
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading event outrights!');
           });
         };
  
         this.prematch.getOdds = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'prematch/exeventoutrightodds/get',
             params: {
               exEventOutrightID: req.ID
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading event outright odds!');
           });
         };
  
         this.prematch.getResults = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'prematch/exeventoutrightresults/get',
             params: {
               exEventOutrightID: req.ID
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading event outright results!');
           });
         };
  
       });


