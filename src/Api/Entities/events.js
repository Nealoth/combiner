angular.module('app')
       .service('eventsResource', function ($rootScope, $http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       this.system   = Object.create(null);
	       this.live     = Object.create(null);
	       this.prematch = Object.create(null);
	       this.calendar = Object.create(null);
	
	       /**
	        * Get system imported events.
	        * @param leagueId
	        * @param eventId
	        * @param sportid
	        * @param datebegin
	        * @param dateend
	        * @returns {*|Promise.<TResult>}
	        */
	       this.system.get = function (leagueId, eventId, sportid, datebegin, dateend, liveType, distributeTemplateId) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/events/get',
			       params: {
				       leagueId            : leagueId,
				       eventId             : eventId,
				       sportid             : sportid,
				       datebegin           : datebegin,
				       dateend             : dateend,
				       liveType            : liveType,
				       distributeTemplateId: distributeTemplateId
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading system events');
		       });
	       };
	
	       this.system.getPersonal = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/events/get',
			       params: {
				       leagueId            : req.leagueID || null,
				       eventId             : req.eventID || null,
				       sportid             : req.sportID || null,
				       datebegin           : req.dateBegin || null,
				       dateend             : req.dateEnd || null,
				       liveType            : req.liveType || null,
				       distributeTemplateId: req.distributeTemplateID || null
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading system events');
		       });
	       };
	
	       /**
	        * Get heading of event (Event name, timings, scores...)
	        * @param eventId
	        * @param syncDate
	        * @returns {*|Promise.<TResult>}
	        */
	       this.system.getHeader = function (eventId, syncDate) {
		       return $http({
			       method: 'GET',
			       url   : url + 'eventmonitoring/eventmonitoringheader',
			       params: {
				       eventId : eventId,
				       syncDate: syncDate,
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading event header (monitoring)');
		       });
	       };
	
	       /**
	        * Get scores of event.
	        * @param eventIds
	        * @param SyncDate
	        * @returns {*|Promise.<TResult>}
	        */
	       this.system.getScores = function (eventIds, SyncDate) {
		       return $http({
			       method: 'GET',
			       url   : url + 'eventmonitoring/eventlivescores/get',
			       params: {
				       eventIds: eventIds,
				       SyncDate: SyncDate
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live event scores');
		       });
	       };
	
	       /**
	        * Get live events.
	        * @param begindate
	        * @param enddate
	        * @param serviceid
	        * @param sportid
	        * @param isimport
	        * @param combineMode
	        * @returns {*|Promise.<TResult>}
	        */
	       this.live.get = function (begindate, enddate, serviceid, sportid, isimport, combineMode) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/exevents/get',
			       params: {
				       begindate  : begindate,
				       enddate    : enddate,
				       serviceid  : serviceid,
				       sportid    : sportid,
				       isimport   : isimport,
				       combineMode: combineMode
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live events');
		       });
	       };
	
	       /**
	        * Import live event to system.
	        * @param ExEventId
	        * @param EventId
	        * @param IsImport
	        * @returns {*|Promise.<TResult>}
	        */
	       this.live.import = function (ExEventId, EventId, IsImport, ServiceId) {
		       return $http({
			       method: 'POST',
			       url   : url + 'live/exevents/import',
			       data  : {
				       ExEventId: ExEventId,
				       EventId  : EventId,
				       IsImport : IsImport,
				       ServiceId: ServiceId
			       }
		       }).then(function successCallback () {
			       toastr.success('Event successfully imported!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while event importing!');
		       });
	       };
	
	       /**
	        * Get scores of Live event.
	        * @param exEventIds
	        * @param SyncDate
	        * @returns {*|Promise.<TResult>}
	        */
	       this.live.getScores = function (exEventIds, SyncDate) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveeventscores/get',
			       params: {
				       exEventIds: exEventIds,
				       SyncDate  : SyncDate
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live event scores');
		       });
	       };
	
	       /**
	        * Get header of live event (Event name, timing, scores...).
	        * @param ExEventId
	        * @param syncDate
	        * @returns {*|Promise.<TResult>}
	        */
	       this.live.getHeader = function (ExEventId, syncDate) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/eventmonitoring/header',
			       params: {
				       ExEventId: ExEventId,
				       syncDate : syncDate,
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading event header (monitoring)');
		       });
	       };
	
	       /**
	        * Associate a lot of live events with ONE system event.
	        * @param EventId
	        * @param ExEventIds
	        * @returns {*|Promise.<TResult>}
	        */
	       this.live.combine = function (EventId, ExEventIds) {
		       return $http({
			       method: 'POST',
			       url   : url + 'live/liveevents/combine',
			       data  : {
				       EventId   : EventId,
				       ExEventIds: ExEventIds
			       }
		       }).then(function successCallback () {
			       toastr.success('Events successfully combined!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while event combining!');
		       });
	       };
	
	       /**
	        * Delete combination
	        * @param Id
	        * @returns {*|Promise.<TResult>}
	        */
	       this.live.uncombine = function (Id) {
		       return $http({
			       method: 'POST',
			       url   : url + 'live/liveevents/uncombine',
			       data  : {
				       Id: Id,
			       }
		       }).then(function successCallback () {
			       toastr.success('Events successfully uncombined!');
		       }, function errorCallback () {
			       toastr.error('An error occurred while event uncombining!');
		       });
	       };
	
	       /**
	        * Get prematch events.
	        * @param begindate
	        * @param enddate
	        * @param serviceid
	        * @param sportid
	        * @param isimport
	        * @returns {*|Promise.<TResult>}
	        */
	       this.prematch.get = function (begindate, enddate, serviceid, sportid, isimport) {
		       return $http({
			       method: 'GET',
			       url   : url + 'prematch/exevents/get',
			       params: {
				       begindate: begindate,
				       enddate  : enddate,
				       serviceid: serviceid,
				       sportid  : sportid,
				       isimport : isimport
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading prematch events');
		       });
	       };
	
	       this.searchEvent = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/eventssearch/get',
			       params: {
				       searchCondition: req.searchCondition
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading prematch events');
		       });
	       };
	
	       this.live.searchExEvent = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/exeventssearch/get',
			       params: {
				       serviceId: req.serviceID,
				       searchCondition: req.searchCondition || "",
				       isLive: true,
				       pageNumber: req.pageNumber || null,
				       rowCount: req.rowCount || null
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live ex events!');
		       });
	       };
	
	       this.calendar.get = function (start, end) {
		       return $http({
			       method: 'GET',
			       url   : url + 'api/calendar/events_s',
			       params: {
				       start: start,
				       end  : end
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading calendar');
		       });
	       };
	
	       this.calendar.buy = function (Id) {
		       return $http({
			       method: 'POST',
			       url   : url + 'api/calendar/eventdistributetemplates/insert',
			       data  : {
				       Id: Id
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred!');
		       });
	       };
	
	       this.system.searchOutrights = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'system/eventoutrightssearch/get',
			       params: {
				       searchCondition: req.searchCondition,
				       pageNumber     : req.pageNumber,
				       rowCount       : req.rowCount
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading event outrights');
		       });
	       };
	
       });


