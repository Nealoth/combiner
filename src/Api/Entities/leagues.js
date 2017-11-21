angular.module('app')
       .service('leaguesResource', function ($rootScope, $http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       this.system   = Object.create(null);
	       this.live     = Object.create(null);
	       this.prematch = Object.create(null);
	
	       this.info = function (IDs) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveleagues/info',
			       params: {
				       IDs: IDs.join(',')
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading league info!');
		       });
	       };
	
	       /**
	        * Associate league with system league.
	        * @param ExLeagueId
	        * @param LeagueId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.associate = function (ExLeagueId, LeagueId) {
		       return $http({
			       method: 'POST',
			       url   : url + 'live/associate/leagues',
			       data  : {
				       ExLeagueId: ExLeagueId,
				       LeagueId  : LeagueId,
			       }
		       }).then(function successCallback () {
			       toastr.success('League successfully associated!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while association!');
		       });
	       };
	
	       /**
	        * Get system leagues.
	        * @param sportId
	        * @param CategoryID
	        * @returns {*|Promise.<TResult>}
	        */
	       this.get = function (sportId, CategoryID, SyncDate, isOnlyActive, liveType) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/leagues/get',
			       params: {
				       sportId     : sportId,
				       CategoryID  : CategoryID,
				       SyncDate    : SyncDate,
				       isOnlyActive: isOnlyActive,
				       liveType    : liveType
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading leagues');
		       });
	       };
	
	       this.system.get = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/leaguespagination/get',
			       params: {
				       sportId             : req.sportID,
				       categoryId          : req.categoryID,
				       isOnlyActive        : req.isOnlyActive || null,
				       liveType            : req.liveType || null,
				       searchText          : req.searchText || null,
				       orderField          : req.orderField || null,
				       distributeTemplateId: req.distributeTemplateId || null,
				       pageNumber          : req.pageNumber,
				       rowCount            : req.rowCount,
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading leagues');
		       });
	       };
	
	       this.getPersonal = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/leagues/get',
			       params: {
				       sportId             : req.sportId || null,
				       CategoryID          : req.CategoryID || null,
				       SyncDate            : req.SyncDate || null,
				       isOnlyActive        : req.isOnlyActive || null,
				       liveType            : req.liveType || null,
				       distributeTemplateId: req.distributeTemplateId || null
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading leagues');
		       });
	       };
	
	       /**
	        * Create system league.
	        * @param SportId
	        * @param Name
	        * @param Code
	        * @param CategoryID
	        * @param ServiceIDMain
	        * @param NumberOfTeams
	        * @param PresentationID
	        * @param TableID
	        * @param LeagueSeasonType
	        * @param LeagueGroupID
	        * @param ContinentID
	        * @param LeagueTemplateID
	        * @param ServiceUniqueIDMain
	        * @param StageType
	        * @returns {*|Promise.<TResult>}
	        */
	       this.create = function (SportId, Name, Code, CategoryID, ServiceIDMain, NumberOfTeams,
	                               PresentationID, TableID, LeagueSeasonType, LeagueGroupID,
	                               ContinentID, LeagueTemplateID, ServiceUniqueIDMain, StageType) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/leagues/insert',
			       data  : {
				       SportId            : SportId,
				       Name               : Name,
				       Code               : Code,
				       CategoryID         : CategoryID,
				       ServiceIDMain      : ServiceIDMain,
				       NumberOfTeams      : NumberOfTeams,
				       PresentationID     : PresentationID,
				       TableID            : TableID,
				       LeagueSeasonType   : LeagueSeasonType,
				       LeagueGroupID      : LeagueGroupID,
				       ContinentID        : ContinentID,
				       LeagueTemplateID   : LeagueTemplateID,
				       ServiceUniqueIDMain: ServiceUniqueIDMain,
				       StageType          : StageType,
			       }
		       }).then(function successCallback () {
			       toastr.success('League successfully created!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while league creating!');
		       });
	       };
	
	       /**
	        * Update system league.
	        * @param LeagueId
	        * @param SportId
	        * @param Name
	        * @param Code
	        * @param CategoryID
	        * @param ServiceIDMain
	        * @param NumberOfTeams
	        * @param PresentationID
	        * @param TableID
	        * @param LeagueSeasonType
	        * @param LeagueGroupID
	        * @param ContinentID
	        * @param LeagueTemplateID
	        * @param ServiceUniqueIDMain
	        * @param StageType
	        * @returns {*|Promise.<TResult>}
	        */
	       this.update = function (LeagueId, SportId, Name, Code, CategoryID, ServiceIDMain, NumberOfTeams,
	                               PresentationID, TableID, LeagueSeasonType, LeagueGroupID,
	                               ContinentID, LeagueTemplateID, ServiceUniqueIDMain, StageType) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/leagues/update',
			       data  : {
				       LeagueId           : LeagueId,
				       SportId            : SportId,
				       Name               : Name,
				       Code               : Code,
				       CategoryID         : CategoryID,
				       ServiceIDMain      : ServiceIDMain,
				       NumberOfTeams      : NumberOfTeams,
				       PresentationID     : PresentationID,
				       TableID            : TableID,
				       LeagueSeasonType   : LeagueSeasonType,
				       LeagueGroupID      : LeagueGroupID,
				       ContinentID        : ContinentID,
				       LeagueTemplateID   : LeagueTemplateID,
				       ServiceUniqueIDMain: ServiceUniqueIDMain,
				       StageType          : StageType,
			       }
		       }).then(function successCallback () {
			       toastr.success('League successfully updated!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while league updating!');
		       });
	       };
	
	       /**
	        * Delete system league.
	        * @param leagueId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.delete = function (leagueId) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/leagues/delete',
			       data  : {
				       Id: leagueId
			       }
		       }).then(function successCallback () {
			       toastr.success('League successfully deleted!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while league deletion!');
		       });
	       };
	
	       /**
	        * Get live leagues.
	        * @param serviceId
	        * @param sportId
	        * @param countryCode
	        * @returns {*|Promise.<TResult>}
	        */
	       this.live.get = function (serviceId, sportId, countryCode, SyncDate) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveleagues/get',
			       params: {
				       serviceId  : serviceId,
				       sportId    : sportId,
				       countryCode: countryCode,
				       liveType   : 1,
				       SyncDate   : SyncDate
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live leagues');
		       });
	       };
	
	       this.live.getPaginated = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveleaguespagination/get',
			       params: {
				       serviceId : req.serviceID,
				       sportId   : req.sportID,
				       liveType  : 1,
				       categoryId: req.categoryID,
				       searchText: req.searchText,
				       orderField: req.orderField || null,
				       pageNumber: req.pageNumber,
				       rowCount  : req.rowCount
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading live leagues');
		       });
	       };
	
	       /**
	        * Get prematch leagues.
	        * @param serviceId
	        * @param sportId
	        * @param countryCode
	        * @returns {*|Promise.<TResult>}
	        */
	       this.prematch.get = function (serviceId, sportId, countryCode, SyncDate) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveleagues/get',
			       params: {
				       serviceId  : serviceId,
				       sportId    : sportId,
				       countryCode: countryCode,
				       liveType   : 0,
				       SyncDate   : SyncDate
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live leagues');
		       });
	       };
	
	       this.prematch.getPaginated = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveleaguespagination/get',
			       params: {
				       serviceId : req.serviceID,
				       sportId   : req.sportID,
				       liveType  : 0,
				       categoryId: req.categoryID,
				       searchText: req.searchText,
				       orderField: req.orderField || null,
				       pageNumber: req.pageNumber,
				       rowCount  : req.rowCount
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading live leagues');
		       });
	       };
	
	       this.getTree = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'configuration/leaguetree/get',
			       params: {
				       distributeTemplateID: req.distributeTemplateID,
				       sportID             : req.sportID,
				       categoryID          : req.categoryID
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading leagues tree!');
		       });
	       };
	
       });


