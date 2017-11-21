angular.module('app')
       .service('playersResource', function ($http, CONFIG, toastr) {
         var url = CONFIG.api.url;
  
         this.system   = Object.create(null);
         this.prematch = Object.create(null);
  
         this.system.get = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'system/players/get',
             params: {
               sportId   : req.sportId,
               searchText: req.searchText,
               pageNumber: req.pageNumber,
               rowCount  : req.rowCount,
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading system players!');
           });
         };
  
         this.system.create = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'system/players/insert',
             data  : {
               SportId: req.SportID,
               Name   : req.Name,
             }
           }).then(function successCallback () {
             toastr.success('Player successfully created!');
           }, function errorCallback () {
             toastr.error('An error occurred!');
           });
         };
  
         this.system.update = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'system/players/update',
             data  : {
               Id  : req.ID,
               Name: req.Name,
             }
           }).then(function successCallback () {
             toastr.success('Player successfully updated!');
           }, function errorCallback () {
             toastr.error('An error occurred!');
           });
         };
  
         this.system.delete = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'system/players/delete',
             data  : {
               Id: req.ID
             }
           }).then(function successCallback () {
             toastr.success('Player successfully deleted!');
           }, function errorCallback () {
             toastr.error('An error occurred!');
           });
         };
  
         this.prematch.get = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'prematch/explayers/get',
             params: {
               serviceId : req.serviceID,
               sportId   : req.sportID,
               liveType  : 0,
               searchText: req.search,
               pageNumber: req.currentPage,
               rowCount  : req.itemsPerPage
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred!');
           });
         };
  
         this.prematch.associate = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'prematch/explayers/associate',
             data  : {
               Int1: req.ExPlayerID,
               Int2: req.PlayerID,
             }
           }).then(function successCallback () {
             toastr.success('Player successfully associated!');
           }, function errorCallback () {
             toastr.error('An error occurred!');
           });
         };
  
         this.prematch.import = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'prematch/explayers/import',
             data  : {
               Id: req.ID
             }
           }).then(function successCallback () {
             toastr.success('Player successfully imported!');
           }, function errorCallback () {
             toastr.error('An error occurred!');
           });
         };
  
       });


