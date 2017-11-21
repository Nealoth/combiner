var TotalRoutes = require('./../Routes/_TotalRoutes');

angular.module('app')
       .service('Navigator', function (CONFIG, $rootScope, $state, AppModules) {
	       'use strict';
	       var _this                = this;
	       var lastURL              = null;
	       var isNavigationDisabled = false;
	       var lastState            = null;
	       var lastStateParams      = null;
	
	       var totalRoutes = new TotalRoutes();
	
	       var elements = {
		       currentPage   : null,
		       currentSubPage: null
	       };
	
	
	       $rootScope.$on('$stateChangeStart', function (event, next, nextParams) {
		       lastState       = next.stateName;
		       lastStateParams = nextParams;
		       if (isNavigationDisabled) event.preventDefault();
	       });
	
	       var Navigation = {
		       parentModules: {}
	       };
	
	       var allStates       = $state.get();
	       var availableStates = [];
	
	       this.goTo = function (state) {
		       $state.go(state);
	       };
	
	       this.disableNavigation = function () {
		       isNavigationDisabled = true;
	       };
	
	       this.enableNavigation = function () {
		       isNavigationDisabled = false;
	       };
	
	       this.stopNavigation = function () {
		       _this.disableNavigation();
		       lastURL = location.href;
	       };
	
	       this.resumeNavigation = function () {
		       if (location.href === location.origin + "/#/") {
			       $state.go("home");
		       } else {
			       $state.go(lastState, lastStateParams);
		       }
	       };
	
	       this.deleteNavigationModel = function () {
		       Navigation = {
			       parentModules: {}
		       };
		
		       availableStates     = [];
		       $rootScope.pages    = null;
		       $rootScope.subpages = null;
	       };
	
	       this.buildParentModules = function () {
		       Navigation.parentModules.home = totalRoutes.states.home;
		       availableStates.forEach(function (state) {
			       if (state.parent === "authorized__layout") {
				       Navigation.parentModules[ state.stateName ] = state;
				       _this.buildSubNavigation(state.stateName, null, false);
			       }
		       });
		       $rootScope.pages = Navigation.parentModules;
	       };
	
	       this.buildNavigationModel = function () {
		       allStates.forEach(function (state) {
			       if (AppModules.checkModule(state.moduleID)) availableStates.push(state);
		       });
		       _this.buildParentModules();
	       };
	
	       this.runSubNavigationBuilder = function (state) {
		       var parentStateName = state.stateName.split(".")[ 0 ];
		       _this.buildSubNavigation(parentStateName, state, true);
		       _this.setTitle(parentStateName, state, false);
		
		       elements.currentPage = document.getElementById("main__current-page");
		
		       $rootScope.$on("$stateChangeStart", function (e, nextState) {
			       parentStateName = nextState.stateName.split(".")[ 0 ];
			       _this.buildSubNavigation(parentStateName, nextState, true);
			       _this.setTitle(parentStateName, nextState, true);
		       });
	       };
	
	       this.buildSubNavigation = function (parentStateName, state, needToFillSubpages) {
		       if (Navigation.parentModules[ parentStateName ] && !Navigation.parentModules[ parentStateName ].childModules) {
			       Navigation.parentModules[ parentStateName ].childModules = [];
			       availableStates.forEach(function (availableState) {
				       if (parentStateName === availableState.stateName.split(".")[ 0 ] &&
					       availableState.stateName.split(".").length === 2) {
					       Navigation.parentModules[ parentStateName ].childModules.push(availableState);
				       }
			       });
		       }
		       if (needToFillSubpages && Navigation.parentModules[ parentStateName ])
			       $rootScope.subpages = Navigation.parentModules[ parentStateName ].childModules;
	       };
	
	       this.setTitle = function (parentState, state, needToAnimate) {
		       if (!elements.currentSubPage) elements.currentPage = document.getElementById("main__current-page");
		       if (!elements.currentSubPage) elements.currentSubPage = document.getElementById("main__current-subpage");
		
		       if (Navigation.parentModules[ parentState ] && Navigation.parentModules[ parentState ].navName) {
			       $rootScope.headerInfo = null;
			
			       if (needToAnimate && $rootScope.currentPage !== Navigation.parentModules[ parentState ].navName) elements.currentPage.classList.add("main__current-page-faded");
			
			       $rootScope.currentPage = Navigation.parentModules[ parentState ].navName;
			
			       setTimeout(function () {
				       elements.currentPage.classList.remove("main__current-page-faded");
			       }, 400);
			
			       if (state.navName === $rootScope.currentPage) {
				       $rootScope.currentSubPage = null;
				
				       elements.currentSubPage.classList.add("main__current-subPage-faded");
				
				       setTimeout(function () {
					       $rootScope.currentSubPage = null;
				       }, 100);
				
			       } else {
				       elements.currentSubPage.classList.add("main__current-subPage-faded");
				       $rootScope.currentSubPage = state.navName;
				
				       setTimeout(function () {
					       elements.currentSubPage.classList.remove("main__current-subPage-faded");
				       }, 500);
			       }
		       }
	       };
	
	       this.getNavigation = function () {
		       return Navigation.parentModules;
	       };
       });
