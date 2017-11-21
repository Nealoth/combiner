function System_AppMonitoring (othersResource, $rootScope) {
	'use strict';
	var o = othersResource;
	var _this = this;
	this.groups = null;
	
	this.refresh = function () {
		o.applications().then(function (apps) {
			'use strict';
			var uniqueGroups = {};
			
			apps.forEach(function (app) {
				if(!uniqueGroups[app.Group]){
					uniqueGroups[app.Group] = {
						name: app.Group,
						apps: apps.filter(function (filtered) {
							return filtered.Group === app.Group
						})
					};
				}
			});
			
			_this.groups = uniqueGroups;
		});
	};
	this.refresh();
	
	this.interval = setInterval(function () {
		_this.refresh();
	}, 5000);
	
	$rootScope.$on('$stateChangeStart',
		function () {
			clearInterval(_this.interval);
		});
	
	
	
}

module.exports = {
	template    : require('./system.appmonitoring.html'),
	controller  : System_AppMonitoring,
	controllerAs: 'vm'
};