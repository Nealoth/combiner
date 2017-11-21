angular.module('app')
       .service('countriesResource', function ($http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       /**
	        * Get system countries (Used in filters).
	        * @param req
	        * @returns {*|Promise.<TResult>}
	        */
	       this.get = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'base/category/get',
			       params: {
				       sportId     : req ? req.sportId : null,
				       isOnlyActive: req ? req.isOnlyActive : null,
				       liveType    : req ? req.liveType : null
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading countries');
		       });
	       };
	
	
       });


