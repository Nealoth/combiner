angular.module('app')
       .service('templatesResource', function ($http, CONFIG, toastr) {
	       var url = CONFIG.api.url;
	
	       this.updateEntity = Object.create(null);
	
	       /**
	        * Get availible templates of system users.
	        * @returns {*|Promise.<TResult>}
	        */
	       this.get = function () {
		       return $http({
			       method: 'GET',
			       url   : url + 'base/distributetemplates/get'
		       }).then(function successCallback (response) {
			       return response.data;
		       }, function errorCallback () {
			       toastr.error('An error occurred while loading distribute templates');
		       });
	       };
	
	       var updateEntity = function (path, req) {
		       return $http({
			       method: 'POST',
			       url   : url + 'configuration/' + path + '/update',
			       data  : {
				       DistributeTemplateID: req.DistributeTemplateID,
				       EntityID            : req.EntityID,
				       IsLive              : req.IsLive,
				       IsOn                : req.IsOn,
				       ServiceIDConduct    : req.ServiceIDConduct
			       }
		       }).then(function () {
			       toastr.success('Configuration successfully updated!');
		       }, function () {
			       toastr.error('An error occured!');
		       });
	       };
	
	       this.updateEntity.sport   = updateEntity.bind(null, 'distributetemplatesports');
	       this.updateEntity.country = updateEntity.bind(null, 'distributetemplatecountrys');
	       this.updateEntity.league  = updateEntity.bind(null, 'distributetemplateleagues');
	       this.updateEntity.event   = updateEntity.bind(null, 'distributetemplateevents');
	
	
       });



