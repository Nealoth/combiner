angular.module('app')
       .service('scoresResource', function ($rootScope, $http, CONFIG, toastr) {
         var url = CONFIG.api.url;
  
         this.system   = Object.create(null);
         this.prematch = Object.create(null);
         this.live     = Object.create(null);
  
         /**
          * Get live events scores.
          * @param serviceId
          * @param SportId
          * @returns {*|Promise.<TResult>}
          */
         this.live.get = function (serviceId, SportId) {
           return $http({
             method: 'GET',
             url   : url + 'live/livescoregroups/get',
             params: {
               serviceId: serviceId,
               SportId  : SportId
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading live scores');
           });
         };
  
         /**
          * Associate Live score with system score.
          * @param LiveScoreGroupId
          * @param ScoreGroupId
          * @returns {Promise.<TResult>|*}
          */
         this.live.associate = function (LiveScoreGroupId, ScoreGroupId) {
           return $http({
             method: 'POST',
             url   : url + 'live/associate/scoregroups',
             data  : {
               LiveScoreGroupId: LiveScoreGroupId,
               ScoreGroupId    : ScoreGroupId
             }
           }).then(function successCallback () {
             toastr.success('Score successfully associated!');
           }, function errorCallback () {
             toastr.error('An error occurred while score association!');
           });
         };
  
         /**
          * Get system scores kinds.
          * @returns {*|Promise.<TResult>}
          */
         this.system.getKinds = function () {
           return $http({
             method: 'GET',
             url   : url + 'system/scorekinds/get',
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading system score kinds');
           });
         };
  
         /**
          * Get system scores types.
          * @returns {*|Promise.<TResult>}
          */
         this.system.getTypes = function () {
           return $http({
             method: 'GET',
             url   : url + 'system/scoretypes/get',
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading system score types');
           });
         };
  
         /**
          * Get system events scores.
          * @param sportId
          * @param scoreGroupIDs
          * @returns {*|Promise.<TResult>}
          */
         this.system.get = function (sportId, scoreGroupIDs) {
           return $http({
             method: 'GET',
             url   : url + 'system/scoregroups/get',
             params: {
               sportId      : sportId,
               scoreGroupIDs: scoreGroupIDs
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading system scores');
           });
         };
  
         this.system.insert = function (Name,
                                        ScoreTypeId,
                                        Ordering,
                                        ScoreKindId,
                                        PeriodNumber,
                                        Code,
                                        IsCalc) {
           return $http({
             method: 'POST',
             url   : url + 'system/scoregroups/insert',
             data  : {
               Name        : Name,
               ScoreTypeId : ScoreTypeId,
               Ordering    : Ordering,
               ScoreKindId : ScoreKindId,
               PeriodNumber: PeriodNumber,
               Code        : Code,
               IsCalc      : IsCalc,
             }
           }).then(function successCallback () {
             toastr.success('Score successfully created!');
           }, function errorCallback () {
             toastr.error('An error occurred while score creating!');
           });
         };
  
         this.system.update = function (Id,
                                        Name,
                                        ScoreTypeId,
                                        Ordering,
                                        ScoreKindId,
                                        PeriodNumber,
                                        Code,
                                        IsCalc) {
           return $http({
             method: 'POST',
             url   : url + 'system/scoregroups/update',
             data  : {
               ScoreGroupId: Id,
               Name        : Name,
               ScoreTypeId : ScoreTypeId,
               Ordering    : Ordering,
               ScoreKindId : ScoreKindId,
               PeriodNumber: PeriodNumber,
               Code        : Code,
               IsCalc      : IsCalc,
             }
           }).then(function successCallback () {
             toastr.success('Score successfully updated!');
           }, function errorCallback () {
             toastr.error('An error occurred while score updating!');
           });
         };
  
         this.system.getSports = function (scoreGroupId) {
           return $http({
             method: 'GET',
             url   : url + 'system/sportscoregroup/get',
             params: {
               scoreGroupId: scoreGroupId
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading sports of system score');
           });
         };
  
         this.system.addSport = function (SportId, ScoreGroupId) {
           return $http({
             method: 'POST',
             url   : url + 'system/sportscoregroup/insert',
             data  : {
               SportId  : SportId,
               BetTypeId: ScoreGroupId
             }
           }).then(function successCallback () {
             toastr.success('Sport successfully added!');
           }, function errorCallback () {
             toastr.error('An error occurred while score group updating!');
           });
         };
  
         this.system.removeSport = function (SportId) {
           return $http({
             method: 'POST',
             url   : url + 'system/sportscoregroup/delete',
             data  : {
               Id: SportId
             }
           }).then(function successCallback () {
             toastr.success('Sport successfully deleted!');
           }, function errorCallback () {
             toastr.error('An error occurred while sport deleting!');
           });
         };
  
         this.prematch.get = function (req) {
           return $http({
             method: 'GET',
             url   : url + 'prematch/exscoregroups/get',
             params: {
               serviceId: req.serviceId,
               SportId  : req.SportId
             }
           }).then(function successCallback (response) {
             return response.data;
           }, function errorCallback () {
             toastr.error('An error occurred while loading prematch scores!');
           });
         };
  
         this.prematch.associate = function (req) {
           return $http({
             method: 'POST',
             url   : url + 'prematch/associate/scoregroups',
             data  : {
               Int1: req.ExScoreGroupID,
               Int2: req.ScoreGroupID
             }
           }).then(function successCallback () {
             toastr.success('Score successfully associated!');
           }, function errorCallback () {
             toastr.error('An error occurred while sport deleting!');
           });
         };
  
       });


