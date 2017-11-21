angular.module('app')
       .service('CurrentUser', function ($cookies, Encryption, CONFIG, $http, Navigator) {
	       var currentUser;
	
	       this.saveUser = function (userData) {
		       currentUser    = userData;
		       var enc        = Encryption.encrypt(userData.Login + '|' + userData.Password);
		       var expireDate = new Date();
		
		       expireDate.setDate(expireDate.getHours() + CONFIG.session.cookieExpireHours);
		
		       $cookies.put(CONFIG.session.authTokenName, enc, {'expires': expireDate});
		
		       $http.defaults.headers.common.Authorization = 'Basic ' + btoa(userData.Login + ':' + userData.Password);
	       };
	
	       this.checkUser = function () {
		       return new Promise(function (resolve, reject) {
			       if ($cookies.get(CONFIG.session.authTokenName))
				       resolve($cookies.get(CONFIG.session.authTokenName));
			       else
				       reject();
		       });
	       };
	
	       this.clearUser = function () {
		       $cookies.remove(CONFIG.session.authTokenName);
		       currentUser = null;
	       };
	
	       this.get = function () {
		       return currentUser;
	       };
	
       });
