function LoginLayout (CurrentUser, $state) {
	CurrentUser.checkUser().then(function () {
		$state.go('home');
	});
}

module.exports = {
  template  : require('./loginLayout.html'),
  controller: LoginLayout
};
