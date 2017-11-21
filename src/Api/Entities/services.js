angular.module('app')
       .service('servicesResource', function ($http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       /**
	        * Get list of all system crawlers.
	        * @returns {*|Promise.<TResult>}
	        */
	       this.get = function () {
		       return $http({
			       method: 'GET',
			       url   : url + 'base/service/get'
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading services');
		       });
	       };
	
       });


