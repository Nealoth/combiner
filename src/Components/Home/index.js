function Home (Navigator, $rootScope, $state) {
	'use strict';
	var _this = this;
	
	this.parentModules = Navigator.getNavigation();
	
	setTimeout(function () {
		$rootScope.currentSubPage = "Navigation map";
	}, 600);
	
	setTimeout(function () {
		document.getElementById("main__current-subpage").classList.remove("main__current-subPage-faded");
	}, 1300);
	
	this.goToLink = function (stateName) {
		$state.go(stateName);
	};
	
	
}

module.exports = {
	template    : require('./home.html'),
	controller  : Home,
	controllerAs: 'vm'
};
