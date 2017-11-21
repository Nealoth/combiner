angular.module('app')
       .service('Auth', function (authResource, $rootScope, AppModules, CurrentUser, Encryption, $state, Navigator) {
	       var _this = this;
	       var state = {
		       watching    : false,
		       watcherIndex: null
	       };
	
	       this.runWatch = function () {
		       $rootScope.$on('$stateChangeStart',
			       function (event, next, params, prev, prevParams) {
				       if (state.watching)
					       CurrentUser.checkUser()
					                  .then(function () {
						                  if (!AppModules.checkModule(next.moduleID)) $state.go("home");
					                  }, function () {
						                  _this.logout();
						                  $state.go("login");
					                  });
			       });
	       };
	
	       this.authenticate = function (login, password) {
		       return new Promise(function (resolve, reject) {
			       if (login && password)
				       authResource.authenticate(login, password)
				                   .then(function (response) {
					                   if (response) {
						                   AppModules.buildModulesTree(response.userPersonnelsModules);
						                   Navigator.buildNavigationModel();
						                   CurrentUser.saveUser(response.authorization);
						                   Navigator.enableNavigation();
						                   state.watching = true;
						                   resolve();
					                   } else {
						                   reject();
					                   }
				                   }, function () {
					                   reject();
				                   });
			       else
				       _this.logout();
		       });
	       };
	
	       this.logout = function () {
		       state.watching = false;
		       CurrentUser.clearUser();
		       AppModules.deleteModulesTree();
		       Navigator.deleteNavigationModel();
		       _this.goToLogin();
	       };
	
	       this.goToLogin = function () {
		       Navigator.goTo('login');
		       Navigator.disableNavigation();
	       };
	
	       this.run = function () {
		       Navigator.stopNavigation();
		       _this.runWatch();
		       CurrentUser.checkUser()
		                  .then(function (token) {
				                  var user = Encryption.decrypt(token).split('|');
				                  _this.authenticate(user[ 0 ], user[ 1 ])
				                       .then(function successAuthFromBackend () {
						                       Navigator.resumeNavigation();
					                       },
					                       function errorAuthFromBackend () {
						                       Navigator.enableNavigation();
						                       _this.logout();
					                       });
			                  },
			                  function () {
				                  Navigator.enableNavigation();
				                  _this.goToLogin();
			                  });
	       };
       });
