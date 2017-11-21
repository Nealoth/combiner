var TotalRoutes = require('./../Routes/_TotalRoutes');

angular.module('app')
       .service('AppModules', function () {
		       'use strict';
		       var _this       = this;
		       var totalRoutes = new TotalRoutes();
		
		       var state = {
			       modulesTreeBuilt: false
		       };
		
		       var collections = {
			       userModuleIDs: [],
			       userServerIDs: [],
			       userModules  : []
		       };
		
		       function addHomePage () {
			       collections.userServerIDs[ 0 ] = totalRoutes.states.home;
			       collections.userModuleIDs[ 0 ] = totalRoutes.states.home;
		       }
		
		       function addServerID (module) {
			       if (module.Id)
				       if (!collections.userServerIDs[ module.Id ])
					       collections.userServerIDs[ module.Id ] = module;
				       else {
					       console.error("AppModules: Not unique server ID of module: ", module)
					       throw new Error("FatalError");
				       }
			       else {
				       console.error("AppModules: Server module ID not found in module: ", module);
				       throw new Error("Fatal error");
			       }
		       }
		
		       function addModuleID (module) {
			       if (collections.userModuleIDs[ module.ModuleID ]) {
				       collections.userModuleIDs[ module.ModuleID ].ServerIDs.push(module.Id);
			       } else {
				       collections.userModuleIDs[ module.ModuleID ] = {ServerIDs: []};
				       collections.userModuleIDs[ module.ModuleID ].ServerIDs.push(module.Id);
			       }
		       }
		
		       this.buildModulesTree = function (userModules) {
			       if (!state.modulesTreeBuilt) {
				       addHomePage();
				       userModules.forEach(function (userModule) {
					       addServerID(userModule);
					       addModuleID(userModule);
				       });
			       } else
				       throw new Error("AppModules: Modules tree already built!");
		       };
		
		       this.checkModule = function (moduleID) {
			       return !!collections.userModuleIDs[ moduleID ];
		       };
		
		       this.deleteModulesTree = function () {
			       collections = {
				       userModuleIDs: [],
				       userServerIDs: [],
				       userModules  : []
			       };
			
			       state.modulesTreeBuilt = false;
		       };
		
	       }
       );


