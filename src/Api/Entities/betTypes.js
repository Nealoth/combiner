angular.module('app')
       .service('betTypesResource', function ($rootScope, $http, CONFIG, toastr) {
	       var url       = CONFIG.api.url;
	       this.system   = Object.create(null);
	       this.live     = Object.create(null);
	       this.prematch = Object.create(null);
	
	       //-------------------S Y S T E M----------------------
	
	       /**
	        * Query for system bet types.
	        * @param sportId
	        * @param searchText
	        * @param count
	        * @returns {*|Promise.<TResult>}
	        */
	       this.get = function (sportId, searchText, count, liveType) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/bettypes/get',
			       params: {
				       sportId   : sportId,
				       searchText: searchText,
				       count     : count,
				       liveType  : liveType
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error("An error occured!");
		       });
	       };
	
	       /**
	        * Create system bet type.
	        * @param code
	        * @param name
	        * @param betTypeViewId
	        * @param description
	        * @param shortName
	        * @param liveType
	        * @param Ordering
	        * @returns {*|Promise.<TResult>}
	        */
	       this.create = function (code, name, betTypeViewId, description, shortName, liveType, Ordering) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/bettypes/insert',
			       data  : {
				       Code         : code,
				       Name         : name,
				       BetTypeViewId: betTypeViewId,
				       Description  : description,
				       ShortName    : shortName,
				       LiveType     : liveType,
				       Ordering     : Ordering
			       }
		       }).then(function successCallback () {
			       toastr.success('Bet Type successfully created!');
		       }, function errorCallback () {
			       toastr.error('Bet Type creation has failed!');
		       });
	       };
	
	       /**
	        * Update system bet type.
	        * @param id
	        * @param code
	        * @param name
	        * @param betTypeViewId
	        * @param description
	        * @param shortName
	        * @param liveType
	        * @param Ordering
	        * @returns {*|Promise.<TResult>}
	        */
	       this.update = function (id, code, name, betTypeViewId, description, shortName, liveType, Ordering) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/bettypes/update',
			       data  : {
				       BetTypeId    : id,
				       Code         : code,
				       Name         : name,
				       BetTypeViewId: betTypeViewId,
				       Description  : description,
				       ShortName    : shortName,
				       LiveType     : liveType,
				       Ordering     : Ordering
			       }
		       }).then(function successCallback () {
			       toastr.success('Bet Type successfully updated!');
		       }, function errorCallback () {
			       toastr.error('Bet Type updating has failed!');
		       });
	       };
	
	       /**
	        * Delete system bet type.
	        * @param betTypeId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.delete = function (betTypeId) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/bettypes/delete',
			       data  : {
				       Id: betTypeId
			       }
		       }).then(function successCallback () {
			       toastr.success('Bet Type successfully deleted!');
		       }, function errorCallback () {
			       toastr.error('Bet Type deletion has failed!');
		       });
	       };
	
	       /**
	        * Get types of bets. (Ternary)
	        * @returns {*|Promise.<TResult>}
	        */
	       this.getViews = function () {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/bettypeviews/get'
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback (response) {
			       console.error(response);
		       });
	       };
	
	       this.updateView = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/bettypeviews/update',
			       data  : {
				       Id               : req.Id,
				       Name             : req.Name,
				       ViewType         : req.ViewType,
				       InitCount        : req.InitCount,
				       BaseTeam         : req.BaseTeam,
				       BasePlayer       : req.BasePlayer,
				       IsSpecialOdsValue: req.IsSpecialOdsValue,
				       WinCount         : req.WinCount,
				       MultMin          : req.MultMin,
				       MultMax          : req.MultMax,
				       OddsKeysMin      : req.OddsKeysMin,
				       OddsKeysMax      : req.OddsKeysMax,
			       }
		       }).then(function successCallback () {
			       toastr.success('Bet type view successfully updated!');
		       }, function errorCallback () {
			       toastr.error('An error occured!');
		       });
	       };
	
	       this.createView = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/bettypeviews/insert',
			       data  : {
				       Name             : req.Name,
				       ViewType         : req.ViewType,
				       InitCount        : req.InitCount,
				       BaseTeam         : req.BaseTeam,
				       BasePlayer       : req.BasePlayer,
				       IsSpecialOdsValue: req.IsSpecialOdsValue,
				       WinCount         : req.WinCount,
				       MultMin          : req.MultMin,
				       MultMax          : req.MultMax,
				       OddsKeysMin      : req.OddsKeysMin,
				       OddsKeysMax      : req.OddsKeysMax,
			       }
		       }).then(function successCallback () {
			       toastr.success('Bet type view successfully created!');
		       }, function errorCallback () {
			       toastr.error('An error occured!');
		       });
	       };
	
	       /**
	        * Get odds of bet type by ID.
	        * @param betTypeId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.getOdds = function (betTypeId) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/bettypeodds/get',
			       params: {
				       betTypeId: betTypeId,
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback (response) {
			       console.error(response);
		       });
	       };
	
	       /**
	        * Create ODD
	        * @param BetTypeId
	        * @param OddType
	        * @param Title
	        * @param Ordering
	        * @param SetColumn
	        * @param ShortName
	        * @returns {*|Promise.<TResult>}
	        */
	       this.createOdd = function (BetTypeId, OddType, Title, Ordering, SetColumn, ShortName) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/bettypeodds/insert',
			       data  : {
				       BetTypeId: BetTypeId,
				       OddType  : OddType,
				       Title    : Title,
				       Ordering : Ordering,
				       SetColumn: SetColumn,
				       ShortName: ShortName
			       }
		       }).then(function successCallback () {
			       toastr.success('Odd Type successfully added!');
		       }, function errorCallback () {
			       toastr.error('Odd Type creation has failed!');
		       });
	       };
	
	       /**
	        * Delete odd.
	        * @param Id
	        * @returns {*|Promise.<TResult>}
	        */
	       this.deleteOdd = function (Id) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/bettypeodds/delete',
			       data  : {
				       Id: Id
			       }
		       }).then(function successCallback () {
			       toastr.success('Odd Type successfully deleted!');
		       }, function errorCallback () {
			       toastr.error('Odd Type deletion has failed!');
		       });
	       };
	
	       /**
	        * Update odd.
	        * @param BetTypeOdId
	        * @param OddType
	        * @param Title
	        * @param Ordering
	        * @param SetColumn
	        * @param ShortName
	        * @returns {*|Promise.<TResult>}
	        */
	       this.updateOdd = function (BetTypeOdId, OddType, Title, Ordering, SetColumn, ShortName) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/bettypeodds/update',
			       data  : {
				       BetTypeOdId: BetTypeOdId,
				       OddType    : OddType,
				       Title      : Title,
				       Ordering   : Ordering,
				       SetColumn  : SetColumn,
				       ShortName  : ShortName
			       }
		       }).then(function successCallback () {
			       toastr.success('Odd Type successfully updated!');
		       }, function errorCallback () {
			       toastr.error('Odd Type updating has failed!');
		       });
	       };
	
	       /**
	        * Get system sports where bet type used.
	        * @param betTypeId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.getSports = function (betTypeId) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/sportbettypes/get',
			       params: {
				       betTypeId: betTypeId,
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback (response) {
			       console.error(response);
		       });
	       };
	
	       /**
	        * Add system sport, who uses bet type.
	        * @param SportId
	        * @param BetTypeId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.addSport = function (SportId, BetTypeId) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/sportbettypes/insert',
			       data  : {
				       SportId  : SportId,
				       BetTypeId: BetTypeId,
			       }
		       }).then(function successCallback () {
			       toastr.success('Sport successfully added!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while adding sport!');
		       });
	       };
	
	       /**
	        * Delete bet type using from sport.
	        * @param Id
	        * @returns {*|Promise.<TResult>}
	        */
	       this.deleteSport = function (Id) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/sportbettypes/delete',
			       data  : {
				       Id: Id
			       }
		       }).then(function successCallback () {
			       toastr.success('Sport successfully deleted!');
		       }, function errorCallback () {
			       toastr.error('Sport deletion has failed!');
		       });
	       };
	
	       this.getOddTypeSports = function (oddTypeID) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/sportbettypeodds/get',
			       params: {
				       betTypeId: oddTypeID,
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error("An error occured while loading odd type sports!")
		       });
	       };
	
	       this.addOddTypeSport = function (SportId, oddTypeID) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/sportbettypeodds/insert',
			       data  : {
				       SportId  : SportId,
				       BetTypeId: oddTypeID,
			       }
		       }).then(function successCallback () {
			       toastr.success('Sport successfully added!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while adding sport!');
		       });
	       };
	
	       this.deleteOddTypeSport = function (Id) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/sportbettypeodds/delete',
			       data  : {
				       Id: Id
			       }
		       }).then(function successCallback () {
			       toastr.success('Sport successfully deleted!');
		       }, function errorCallback () {
			       toastr.error('Sport deletion has failed!');
		       });
	       };
	
	       //-------------------L I V E----------------------------
	
	       /**
	        * Get Live bet types.
	        * @param serviceId
	        * @param SportId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.getLive = function (serviceId, SportId) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/livebettypes/get',
			       params: {
				       serviceId: serviceId,
				       SportId  : SportId,
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live bet types!')
		       });
	       };
	
	       /**
	        * Get odds of live bet type ID.
	        * @param liveBetTypeID
	        * @returns {*|Promise.<TResult>}
	        */
	       this.getLiveOdds = function (liveBetTypeID) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/LiveBetTypeOdds/get',
			       params: {
				       liveBetTypeID: liveBetTypeID
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live bet type ODDS!')
		       });
	       };
	
	       /**
	        * Associate live bet type with system bet type.
	        * @param LiveBetTypeId
	        * @param BetTypeId
	        * @param specialBetValue
	        * @returns {*|Promise.<TResult>}
	        */
	       this.liveAssociate = function (LiveBetTypeId, BetTypeId, specialBetValue) {
		       return $http({
			       method: 'POST',
			       url   : url + 'live/associate/bettypes',
			       data  : {
				       LiveBetTypeId  : LiveBetTypeId,
				       BetTypeId      : BetTypeId,
				       specialBetValue: specialBetValue
			       }
		       }).then(function successCallback () {
			       toastr.success('Bet Type successfully associated!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while Bet Type associating!');
		       });
	       };
	
	       /**
	        * Associate odds of live bet type with system odds.
	        * @param LiveBetTypeOddId
	        * @param BetTypeOddId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.liveAssociateOdd = function (LiveBetTypeOddId, BetTypeOddId) {
		       return $http({
			       method: 'POST',
			       url   : url + 'live/associate/bettypeodds',
			       data  : {
				       LiveBetTypeOddId: LiveBetTypeOddId,
				       BetTypeOddId    : BetTypeOddId
			       }
		       }).then(function successCallback () {
			       toastr.success('Odd successfully associated!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while Odd associating!');
		       });
	       };
	
	       /**
	        * Delete odds data from crawler.
	        * @param Id
	        * @returns {*|Promise.<TResult>}
	        */
	       this.live.deleteOdd = function (Id) {
		       return $http({
			       method: 'POST',
			       url   : url + 'live/LiveBetTypeOdds/delete',
			       data  : {
				       Id: Id
			       }
		       }).then(function successCallback () {
			       toastr.success('Odd successfully deleted!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while Odd deleting!');
		       });
	       };
	
	       /**
	        * Get special bet value of bet type (Used by BR).
	        * @param BetTypeID
	        * @returns {*|Promise.<TResult>}
	        */
	       this.live.getSpecialBetValue = function (BetTypeID) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/SpecialBetValue/get',
			       params: {
				       BetTypeID: BetTypeID
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading special bet value!');
		       });
	       };
	
	       /**
	        * Get prematch bet types.
	        * @param serviceId
	        * @param SportId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.prematch.get = function (serviceId, SportId) {
		       return $http({
			       method: 'GET',
			       url   : url + 'prematch/exbettypes/get',
			       params: {
				       serviceId: serviceId,
				       SportId  : SportId,
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live bet types!')
		       });
	       };
	
	       /**
	        * Get odds of prematch bet type.
	        * @param liveBetTypeID
	        * @returns {*|Promise.<TResult>}
	        */
	       this.prematch.getOdds = function (liveBetTypeID) {
		       return $http({
			       method: 'GET',
			       url   : url + 'prematch/ExBetTypeOdds/get',
			       params: {
				       liveBetTypeID: liveBetTypeID
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live bet type ODDS!')
		       });
	       };
	
	       /**
	        * Associate prematch bet type with system bet type.
	        * @param ExBetTypeId
	        * @param BetTypeId
	        * @param specialBetValue
	        * @returns {*|Promise.<TResult>}
	        */
	       this.prematch.associate = function (ExBetTypeId, BetTypeId, specialBetValue) {
		       return $http({
			       method: 'POST',
			       url   : url + 'prematch/associate/bettypes',
			       data  : {
				       ExBetTypeId    : ExBetTypeId,
				       BetTypeId      : BetTypeId,
				       specialBetValue: specialBetValue
			       }
		       }).then(function successCallback () {
			       toastr.success('Bet Type successfully associated!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while Bet Type associating!');
		       });
	       };
	
	       this.prematch.updateMultiplier = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'prematch/exbettypes/update',
			       data  : {
				       Int1: req.ExBetTypeID,
				       Int2: req.IsMult,
			       }
		       }).then(function () {
			       toastr.success('Multiplier successfully updated!');
		       }, function () {
			       toastr.error('An error occurred!');
		       });
	       };
	
	       /**
	        * Associate odd of prematch bet type with system odd.
	        * @param ExBetTypeOddId
	        * @param BetTypeOddId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.prematch.associateOdd = function (ExBetTypeOddId, BetTypeOddId) {
		       return $http({
			       method: 'POST',
			       url   : url + 'prematch/associate/bettypeodds',
			       data  : {
				       UserPersonnel : $rootScope.user.PersonnelId,
				       ExBetTypeOddId: ExBetTypeOddId,
				       BetTypeOddId  : BetTypeOddId
			       }
		       }).then(function successCallback () {
			       toastr.success('Odd successfully associated!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while Odd associating!');
		       });
	       };
	
       });


