angular.module('app')
       .service('sportsResource', function ($http, CONFIG, toastr) {
	       var url   = CONFIG.api.url;
	       var _this = this;
	       /**
	        * Get all system sports. Can be filtered by crawler.
	        * @param serviceId
	        * @returns {*|Promise.<TResult>}
	        */
	       this.get = function (serviceId, isOnlyActive, liveType) {
		       var service = serviceId || null;
		
		       return $http({
			       method: 'GET',
			       url   : url + 'base/sport/get',
			       params: {
				       serviceId   : service,
				       isOnlyActive: isOnlyActive,
				       liveType    : liveType
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading sports');
		       });
	       };
	
	       this.getPersonal = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'base/sport/get',
			       params: {
				       serviceId           : req.service || null,
				       isOnlyActive        : req.isOnlyActive || null,
				       liveType            : req.liveType || null,
				       distributeTemplateId: req.distributeTemplateId || null
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading sports');
		       });
	       };
	
	       var modify = function (method, req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/sports/' + method,
			       params: {
				       SportID : req.ID,
				       Code    : req.Code,
				       Name    : req.Name,
				       Ordering: req.Ordering
			       }
		       }).then(function () {
			       toastr.success('System teams successfully modified!');
		       }, function () {
			       toastr.error('An error occurred!');
		       });
	       };
	
	       this.update = modify.bind(null, 'update');
	       this.create = modify.bind(null, 'insert');
	
	
	       this.delete = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'system/sports/delete',
			       params: {
				       Id      : req.ID
			       }
		       }).then(function () {
			       toastr.success('System teams successfully deleted!');
		       }, function () {
			       toastr.error('An error occurred!');
		       });
	       };
	       
	       this.getTree = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'configuration/sporttree/get',
			       params: {
				       distributeTemplateId: req.distributeTemplateID
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading sports tree!');
		       });
	       };
	       
       });


