var Cache = require('./Cache');

angular.module('app')
       .service('cacheSvc', function ($rootScope,
                                      servicesResource,
                                      countriesResource,
                                      sportsResource,
                                      betTypesResource,
                                      templatesResource,
                                      scoresResource,
                                      translationsResource,
                                      usersResource,
                                      teamsResource,
                                      eventStatusesResource,
                                      othersResource) {
	       'use strict';
	       var scope = this;
	       var s     = sportsResource;
	       var bt    = betTypesResource;
	       var c     = countriesResource;
	       var t     = templatesResource;
	       var tm    = teamsResource;
	       var svc   = servicesResource;
	       var scr   = scoresResource;
	       var tr    = translationsResource;
	       var u     = usersResource;
	       var es    = eventStatusesResource;
	       var o     = othersResource;
	       var cache = null;
	
	       var initCache = function () {
		       cache = new Cache({
			       cacheName: 'StaticCache'
		       })
			       .add('systemSports', s.get)
			       .add('betTypeViews', bt.getViews)
			       .add('categories', c.get)
			       .add('sources', svc.get)
			       .add('distTemplates', t.get)
			       .add('scoreKinds', scr.system.getKinds)
			       .add('scoreTypes', scr.system.getTypes)
			       .add('translationsLanguages', tr.getLanguages)
			       .add('systemEntities', tr.getEntities)
			       .add('systemRights', u.urt.get)
			       .add('systemModules', u.modules.get)
			       .add('clients', u.clients.get)
			       .add('users', u.users.get)
			       .add('teamTypes', tm.teamTypes.get)
			       .add('systemStatuses', es.system.get)
			       .add('xmlTypes', o.getXMLtypes)
	       };
	
	       initCache();
	
	       this.get = function (entity) {
		       return cache.getItem(entity);
	       };
	
	       this.update = function (entity) {
		       return cache.updateItem(entity);
	       };
	
       });
