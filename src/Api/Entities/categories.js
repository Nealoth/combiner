angular.module('app')
       .service('categoriesResource', function ($http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       this.getTree = function (req) {
		       return $http({
			       method: 'GET',
			       url   : url + 'configuration/categorytree/get',
			       params: {
				       sportID             : req.sportID,
				       distributeTemplateID: req.distributeTemplateID
			       }
		       }).then(function (response) {
			       return response.data;
		       }, function () {
			       toastr.error('An error occurred while loading categories tree!');
		       });
	       };
	
       });


