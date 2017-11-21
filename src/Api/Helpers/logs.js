angular.module('app')
       .service('logsResource', function ($http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       this.service      = Object.create(null);
	       this.parserErrors = Object.create(null);
	       this.distPrematch = Object.create(null);
	       this.users        = Object.create(null);
	       this.crawler      = Object.create(null);
	       this.radar        = Object.create(null);
	       this.radar.live   = Object.create(null);
	
	       /**
	        * Get information of combiner system logs (All system applications and instances).
	        * @param Instance
	        * @param Count
	        * @returns {*|Promise.<TResult>}
	        */
	       this.service.get = function (Instance, Count) {
		       return $http({
			       method: 'GET',
			       url   : url + 'logs/servicelogs_s',
			       params: {
				       Instance: Instance,
				       Count   : Count
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading service logs');
		       });
	       };
	
	       this.parserErrors.get = function (pageNumber, rowCount) {
		       return $http({
			       method: 'GET',
			       url   : url + 'logs/parsererrorlog_s',
			       params: {
				       pageNumber: pageNumber,
				       rowCount  : rowCount
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading parser error logs');
		       });
	       };
	
	       this.distPrematch.get = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'logs/logdistributes_s',
			       params: {
				       distributeTemplateId: req.distributeTemplateId,
				       eventId             : req.eventId,
				       dateBegin           : req.dateBegin,
				       dateEnd             : req.dateEnd,
				       pageNumber          : req.pageNumber,
				       rowCount            : req.rowCount,
				       eventOutrightId     : req.eventOutrightId
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading distribute prematch logs');
		       });
	       };
	
	       this.distPrematch.viewLog = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'logs/logdistributesbyid_s',
			       params: {
				       logDistributeIds: req.logDistributeIds
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading distribute prematch xml');
		       });
	       };
	
	       this.users.get = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'logs/userpersonneladminlogs_s',
			       params: {
				       userPersonnelId: req.userPersonnelId,
				       dateBegin      : req.dateBegin,
				       dateEnd        : req.dateEnd,
				       type           : req.type,
				       searchText     : req.searchText,
				       pageNumber     : req.pageNumber,
				       rowCount       : req.rowCount,
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading users logs');
		       });
	       };
	
	       this.crawler.get = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'logs/logxmls_s',
			       params: {
				       eventId   : req.eventID,
				       typeName  : req.typeName,
				       dateBegin : req.dateBegin,
				       dateEnd   : req.dateEnd,
				       pageNumber: req.pageNumber,
				       rowCount  : req.rowCount,
				       IsLive    : req.IsLive,
				       ServiceID : req.ServiceID
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live radar logs');
		       });
	       };
	
	       this.crawler.getXML = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'logs/logxmlsbyid_s',
			       params: {
				       logXmlsIds: req.IDs,
				       isLive    : req.isLive,
				       serviceId : req.serviceID
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading live log xmls!');
		       });
	       }
	
       });


