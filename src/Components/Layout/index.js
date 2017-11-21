require('./layout.css');
require('./directives/menuCloser');

function Layout (Auth, CurrentUser, Navigator, $state) {
	this.user = CurrentUser.get();
	
	CurrentUser.checkUser().then(function () {
			Navigator.runSubNavigationBuilder($state.current);
		},
		function () {
			$state.go('login');
		});
	
	
	this.logOut = function () {
		Auth.logout();
	};
}

module.exports = {
	template    : require('./layout.html'),
	controller  : Layout,
	controllerAs: 'vm'
};
