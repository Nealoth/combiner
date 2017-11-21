angular.module('app')
       .service('teamsResource', function ($rootScope, $http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       this.live      = Object.create(null);
	       this.system    = Object.create(null);
	       this.prematch  = Object.create(null);
	       this.teamTypes = Object.create(null);
	
	       this.info = function (IDsArray) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveteams/info',
			       params: {
				       IDs: IDsArray.join(',')
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading team information!');
		       });
	       };
	
	       this.system.info = function (IDsArray) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/teams/info',
			       params: {
				       IDs: IDsArray.join(',')
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading system information!');
		       });
	       };
	
	
	       /**
	        * Get live teams.
	        * @param serviceId
	        * @param sportId
	        * @param countryCode
	        * @returns {*|Promise.<TResult>}
	        */
	       this.live.get = function (serviceId, sportId, countryCode, SyncDate) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveteams/get',
			       params: {
				       serviceId  : serviceId,
				       sportId    : sportId,
				       liveType   : 1,
				       countryCode: countryCode,
				       SyncDate   : SyncDate
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading teams');
		       });
	       };
	
	       this.live.getPaginated = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveteamspagination/get',
			       params: {
				       serviceId : req.serviceID,
				       sportId   : req.sportID,
				       liveType  : 1,
				       searchText: req.searchText,
				       orderField: req.orderField || null,
				       pageNumber: req.pageNumber,
				       rowCount  : req.rowCount
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading teams');
		       });
	       };
	
	       /**
	        * Associate live team with system team.
	        * @param ExTeamId
	        * @param TeamId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.associate = function (ExTeamId, TeamId) {
		       return $http({
			       method: 'POST',
			       url   : url + 'live/associate/teams',
			       data  : {
				       ExTeamId: ExTeamId,
				       TeamId  : TeamId
			       }
		       }).then(function successCallback () {
			       toastr.success('Team successfully associated!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while association!');
		       });
	       };
	
	       ///**
	       // * Get system teams.
	       // * @param sportId
	       // * @param countryCode
	       // * @returns {*|Promise.<TResult>}
	       // */
	       //this.system.get = function (sportId, countryCode, SyncDate) {
		    //   return $http({
			//       method: 'GET',
			//       url   : url + 'system/teams/get',
			//       params: {
			//	       sportId    : sportId,
			//	       countryCode: countryCode,
			//	       SyncDate   : SyncDate
			//       }
		    //   }).then(function successCallback (response) {
			//       return response.data;
		    //   }, function errorCallback () {
			//       toastr.error('An error occurred while loading teams');
		    //   });
	       //};
	
	       this.system.getPaginated = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/teamspagination/get',
			       params: {
				       sportId     : req.sportId,
				       searchString: req.searchString,
				       OrderField  : req.OrderField || null,
				       pageNumber  : req.pageNumber,
				       rowCount    : req.rowCount,
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading teams');
		       });
	       };
	
	
	       this.system.getLeagues = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/teams/getLeagues',
			       params: {
				       teamID: req.teamID
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading team leagues');
		       });
	       };
	
	       /**
	        * Create system team.
	        * @param SportId
	        * @param Name
	        * @param CountryCode
	        * @param TeamIdParent
	        * @param Description
	        * @returns {*|Promise.<TResult>}
	        */
	       this.system.insert = function (SportId, Name, CountryCode, TeamIdParent, Description) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/teams/insert',
			       data  : {
				       SportId     : SportId,
				       Name        : Name,
				       CountryCode : CountryCode,
				       TeamIdParent: TeamIdParent,
				       Description : Description
			       }
		       }).then(function successCallback () {
			       toastr.success('Team successfully created!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while team creation!');
		       });
	       };
	
	       /**
	        * Update system team.
	        * @param TeamId
	        * @param SportId
	        * @param Name
	        * @param CountryCode
	        * @param TeamIdParent
	        * @param Description
	        * @returns {*|Promise.<TResult>}
	        */
	       this.system.update = function (TeamId, SportId, Name, CountryCode, TeamIdParent, Description) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/teams/update',
			       data  : {
				       TeamId      : TeamId,
				       SportId     : SportId,
				       Name        : Name,
				       CountryCode : CountryCode,
				       TeamIdParent: TeamIdParent,
				       Description : Description
			       }
		       }).then(function successCallback () {
			       toastr.success('Team successfully updated!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while team updating!');
		       });
	       };
	
	       /**
	        * Delete system team.
	        * @param TeamId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.system.delete = function (TeamId) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/teams/delete',
			       data  : {
				       Id: TeamId
			       }
		       }).then(function successCallback () {
			       toastr.success('Team successfully deleted!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while team deletion!');
		       });
	       };
	
	       this.system.getTeamTypes = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/teamteamtypes/get',
			       params: {
				       teamId: req.ID
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading team team types!');
		       });
	       };
	
	       this.system.addTeamType = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/teamteamtypes/insert',
			       data  : {
				       Int1: req.TeamID,
				       Int2: req.TeamTypeID
			       }
		       }).then(function successCallback () {
			       toastr.success('Team type successfully added!');
		       }, function errorCallback () {
			       toastr.error('An error occurred!');
		       });
	       };
	
	       this.system.deleteTeamType = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/teamteamtypes/delete',
			       data  : {
				       Id: req.removeID
			       }
		       }).then(function successCallback () {
			       toastr.success('Team type successfully deleted!');
		       }, function errorCallback () {
			       toastr.error('An error occurred!');
		       });
	       };
	
	
	       this.system.getChilds = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/childteams/get',
			       params: {
				       teamId: req.teamId
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading child teams!');
		       });
	       };
	
	       this.system.deleteChild = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/childteams/delete',
			       data  : {
				       Id: req.ID
			       }
		       }).then(function () {
			       toastr.success('Child team successfully deleted!');
		       }, function () {
			       toastr.error('An error occurred!');
		       });
	       };
	
	       this.system.addChild = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/childteams/insert',
			       data  : {
				       Int1: req.TeamID,
				       Int2: req.TeamIDChild
			       }
		       }).then(function () {
			       toastr.success('Child team successfully added!');
		       }, function () {
			       toastr.error('An error occurred!');
		       });
	       };
	
	       /**
	        * Get prematch teams.
	        * @param serviceId
	        * @param sportId
	        * @param countryCode
	        * @returns {*|Promise.<TResult>}
	        */
	       this.prematch.get = function (serviceId, sportId, countryCode, SyncDate) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveteams/get',
			       params: {
				       serviceId  : serviceId,
				       sportId    : sportId,
				       liveType   : 0,
				       countryCode: countryCode,
				       SyncDate   : SyncDate
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading teams');
		       });
	       };
	
	       this.prematch.getPaginated = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveteamspagination/get',
			       params: {
				       serviceId : req.serviceID,
				       sportId   : req.sportID,
				       liveType  : 0,
				       searchText: req.searchText,
				       orderField: req.orderField || null,
				       pageNumber: req.pageNumber,
				       rowCount  : req.rowCount
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading teams');
		       });
	       };
	
	       this.teamTypes.get = function () {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/teamtypes/get'
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading team types!');
		       });
	       };
	
	       this.teamTypes.create = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/teamtypes/insert',
			       data  : {
				       Name       : req.Name,
				       Description: req.Description,
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while team type creation!');
		       });
	       };
	
	       this.teamTypes.update = function () {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/teamtypes/update',
			       data  : {
				       ID         : req.ID,
				       Name       : req.Name,
				       Description: req.Description,
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while team type updating!');
		       });
	       };
	
	       this.teamTypes.delete = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/teamtypes/delete',
			       data  : {
				       Id: req.ID,
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred!');
		       });
	       };
	
	       this.system.getLeagues = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/leagueteams/get',
			       params: {
				       teamID: req.ID
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading team leagues!');
		       });
	       };
	
	       this.system.addLeague = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/leagueteams/insert',
			       data  : {
				       Int1: req.LeagueID,
				       Int2: req.TeamID,
			       }
		       }).then(function () {
			       toastr.success("League successfully added!")
		       }, function () {
			       toastr.error('An error occurred!');
		       });
	       };
	
	       this.system.deleteLeague = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/leagueteams/delete',
			       data  : {
				       Id: req.ID,
			       }
		       }).then(function () {
			       toastr.success("League successfully deleted!")
		       }, function () {
			       toastr.error('An error occurred!');
		       });
	       };
	
       });


