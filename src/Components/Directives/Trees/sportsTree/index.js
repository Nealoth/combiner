var temp = require('./sportsTree.html');
require('./sportsTree.css');

angular.module('app')
       .directive('sportsTree', function () {
	       return {
		       restrict  : 'E',
		       replace   : false,
		       template  : temp,
		       scope     : {
			       liveType    : '=',
			       callback    : '&',
			       isOnlyActive: '=',
			       distTemplate: '=?'
		       },
		       controller: function ($scope,
		                             $element,
		                             $attrs,
		                             cacheSvc,
		                             sportsResource,
		                             countriesResource,
		                             leaguesResource,
		                             eventsResource) {
			       var s = sportsResource;
			       var c = countriesResource;
			       var l = leaguesResource;
			       var e = eventsResource;
			
			       if (!$scope.distTemplate) $scope.distTemplate = null;
			
			       $scope.multipleAttr = !!$attrs.$attr[ 'multiple' ];
			
			       $scope.current = {
				       sport  : null,
				       country: null,
				       league : null,
				       event  : null
			       };
			
			       $scope.loaded = {};
			
			       $scope.tree = {};
			
			       $scope.loadTree = function () {
				       var lt = $scope.liveType ? $scope.liveType.value : 2;
				       s.getPersonal({
					        isOnlyActive        : $scope.isOnlyActive,
					        liveType            : lt,
					        distributeTemplateId: $scope.distTemplate
				        })
				        .then(function (sports) {
					        $scope.tree = sports;
				        })
			       };
			
			       $scope.getCountries = function (sport) {
				       var lt = $scope.liveType ? $scope.liveType.value : 2;
				       if (!sport.countries) {
					       c.get({
						       sportId     : sport.ID,
						       isOnlyActive: $scope.isOnlyActive,
						       liveType    : lt
					       }).then(function (countries) {
						       sport.countries = countries;
					       })
				       }
				       sport.extend = sport.extend ? !sport.extend : true;
				       $scope.select(sport);
				       $scope.clear($scope.tree, 'sport');
			       };
			
			       $scope.getLeagues = function (sport, country, countries) {
				       var lt = $scope.liveType ? $scope.liveType.value : 2;
				       if (!country.leagues)
					       l.getPersonal({
						       sportId             : sport.ID,
						       CategoryID          : country.ID,
						       isOnlyActive        : $scope.isOnlyActive,
						       liveType            : lt,
						       distributeTemplateId: $scope.distTemplate
					       }).then(function (leagues) {
						       country.leagues = leagues.Object;
					       });
				
				       country.extend = country.extend ? !country.extend : true;
				       $scope.select(sport, country);
				       $scope.clear(countries, 'country');
			       };
			
			       $scope.getEvents = function (sport, country, league, leagues) {
				       var lt = $scope.liveType ? $scope.liveType.value : 2;
				       if (!league.events) {
					       e.system.getPersonal({
						       leagueID            : league.ID,
						       sportID             : sport.ID,
						       liveType            : lt,
						       distributeTemplateID: $scope.distTemplate
					       }).then(function (events) {
						       league.events = events;
					       })
				       }
				       league.extend = league.extend ? !league.extend : true;
				       $scope.select(sport, country, league);
				       $scope.clear(leagues, 'league');
			       };
			
			       $scope.select = function (sport, country, league, event) {
				       $scope.current.sport   = sport || null;
				       $scope.current.country = country || null;
				       $scope.current.league  = league || null;
				       $scope.current.event   = event || null;
				       $scope.fireCallback();
			       };
			
			       $scope.fireCallback = function () {
				       $scope.callback({treeData: $scope.current});
				       $scope.loaded = $scope.current;
			       };
			
			       $scope.clear = function (arr, current) {
				       if (arr && !$scope.multipleAttr) {
					       arr.forEach(function (item) {
						       if (item.extend === true && $scope.current[ current ] !== item) item.extend = false;
					       })
				       }
			       };
			
			       $scope.$watch('distTemplate', function () {
				       $scope.loadTree();
			       }, true);
			
			       $scope.$watch('liveType', function () {
				       $scope.loadTree();
			       }, true);
			
			       $scope.$watch('isOnlyActive', function () {
				       $scope.loadTree();
			       }, true)
		       }
	       }
	
       });
