angular.module('app')
       .service('authResource', function ($http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       /**
			* Check auth information
	        * @param  {string} username
	        * @param  {string} password
	        */
	       this.authenticate = function (username, password) {
		       return $http({
			       method: 'POST',
			       url   : url + 'user/authorizations',
			       data  : {
				       login   : username,
				       password: password
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('Sorry, authorization process has failed. Please try again later.');
		       });
	       };
	
	       /**
	        * Check user modules
	        * @param username
	        * @param password
	        * @returns {*|Promise.<TResult>}
	        */
	       this.getModules = function (username, password) {
		       return $http({
			       method: 'POST',
			       url   : url + 'user/authorizations',
			       data  : {
				       login   : username,
				       password: password
			       }
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('Sorry, authorization process has failed. Please try again later.');
		       });
	       };
	
       });


