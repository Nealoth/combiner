angular.module('app')
       .service('othersResource', function ($http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       /**
	        * Get information about current working applications (Crawlers).
	        * @returns {*|Promise.<TResult>}
	        */
	       this.applications = function () {
		       return $http({
			       method: 'GET',
			       url   : url + 'base/m_services/get'
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading applications list');
		       });
	       };
	
	       this.getXMLtypes = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'logs/control/typenames',
			       params: {
				       isLive   : req.isLive,
				       serviceId: req.serviceID
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading xml types!');
		       });
	       };
	
       });


