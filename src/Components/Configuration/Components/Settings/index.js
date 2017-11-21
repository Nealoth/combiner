function Configuration_Settings (sportsResource, categoriesResource, leaguesResource, templatesResource, CurrentUser) {
	'use strict';
	var _this = this;
	var s     = sportsResource;
	var c     = categoriesResource;
	var l     = leaguesResource;
	var t     = templatesResource;
	
	this.tables = {
		sports    : [],
		categories: [],
		leagues   : []
	};
	
	console.log(c);
	
	this.currentUser = CurrentUser.get();
	
	this.filters = {
		isLive            : null,
		distributeTemplate: {
			options        : [],
			filteredOptions: [],
			model          : _this.currentUser.DistributeTemplateID,
			init           : null,
			filtrate       : null
		}
	};
	
	this.filters.distributeTemplate.filtrate = function () {
		_this.filters.distributeTemplate.filteredOptions =
			_this.filters.distributeTemplate.options.filter(function (item) {
				return item.LiveType === _this.filters.isLive.value || item.LiveType === 2;
			});
		
		_this.filters.distributeTemplate.model = _this.currentUser.DistributeTemplateID;
	};
	
	this.filters.distributeTemplate.init = function () {
		t.get().then(function (templates) {
			_this.filters.distributeTemplate.options = templates;
			_this.filters.distributeTemplate.filtrate();
			_this.loadSports();
		});
	};
	_this.filters.distributeTemplate.init();
	
	this.loadSports = function () {
		s.getTree({distributeTemplateID: _this.filters.distributeTemplate.model})
		 .then(function (sports) {
			 _this.tables.sports = sports.sports;
		 });
	};
	
	this.loadCategories = function (ID) {
		c.getTree({sportID: ID, distributeTemplateID: _this.filters.distributeTemplate.model})
		 .then(function (categories) {
			 _this.tables.categories = categories;
		 });
	};
	
	this.loadLeagues = function () {
		l.getTree(sportID, distributeTemplateID, categoryID);
	};
	
	
}

module.exports = {
	template    : require('./configuration.settings.html'),
	controller  : Configuration_Settings,
	controllerAs: 'vm'
};