angular.module('app')
       .service('dynamicCacheResource', function (leaguesResource, teamsResource, dynamicCacheSvc) {
	       'use strict';
	       var l = leaguesResource;
	       var t = teamsResource;
	
	       var getArguments = function (args) {
		       var result = [];
		       for (var i = 0; i < args.length; i++) {
			       result.push(args[ i ]);
		       }
		       return result;
	       };
	
	       /**
	        * System entities or DB tables.
	        * @type {Object}
	        */
	       this.system   = Object.create(null);
	       this.live     = Object.create(null);
	       this.prematch = Object.create(null);
	
	       this.system.leagues = function () {
		       return dynamicCacheSvc.get({
			       collectionName: 'systemLeagues',
			       method        : l.get,
			       params        : getArguments(arguments),
			       updateBy      : 'ID'
		       })
	       };
	
	       this.system.teams = function () {
		       return dynamicCacheSvc.get({
			       collectionName: 'systemTeams',
			       method        : t.system.get,
			       params        : getArguments(arguments),
			       updateBy      : 'Id'
		       })
	       };
	
	       this.live.leagues = function () {
		       return dynamicCacheSvc.get({
			       collectionName: 'liveLeagues',
			       method        : l.live.get,
			       params        : getArguments(arguments),
			       updateBy      : 'Id'
		       })
	       };
	
	       this.live.teams = function () {
		       return dynamicCacheSvc.get({
			       collectionName: 'liveTeams',
			       method        : t.live.get,
			       params        : getArguments(arguments),
			       updateBy      : 'ID'
		       })
	       };
	       
	       this.prematch.leagues = function () {
		       return dynamicCacheSvc.get({
			       collectionName: 'prematchLeagues',
			       method        : l.prematch.get,
			       params        : getArguments(arguments),
			       updateBy      : 'Id'
		       })
	       };
	       
	       this.prematch.teams = function () {
		       return dynamicCacheSvc.get({
			       collectionName: 'prematchTeams',
			       method        : t.prematch.get,
			       params        : getArguments(arguments),
			       updateBy      : 'ID'
		       })
	       }
	
       });