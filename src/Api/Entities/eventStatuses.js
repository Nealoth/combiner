angular.module('app')
       .service('eventStatusesResource', function ($http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       this.live   = Object.create(null);
	       this.system = Object.create(null);
	
	       this.system.get = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'configuration/eventstatus_s/get',
			       params: {
				       BetTypeID: req ? req.BetTypeID : null,
				       SportID  : req ? req.SportID : null
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading event statuses!');
		       });
	       };
	
	       this.live.get = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'live/liveeventstatus/get',
			       params: {
				       serviceId: req.serviceID,
				       SportId  : req.sportID
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading event statuses!');
		       });
	       };
	
	       this.live.associate = function (req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'live/associate/eventstatus',
			       data  : {
				       Int1: req.LiveEventStatusID,
				       Int2: req.EventStatusID
			       }
		       }).then(function () {
			       toastr.success("Success!")
		       }, function () {
			       toastr.error('An error occurred while loading event statuses!');
		       });
	       };
	
	
       });


