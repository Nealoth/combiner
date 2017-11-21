require('./login.css');

function Login ($state, $rootScope, toastr, Auth, Navigator) {
  var ctrl               = this;
  this.username          = '';
  this.password          = '';
  this.title             = 'Odds Combiner';
  this.incorrectData     = false;
  this.passwordInputType = 'password';
  
  this.showPassword = function () {
    if(ctrl.passwordInputType == 'password')
      ctrl.passwordInputType = 'text';
    else
      ctrl.passwordInputType = 'password';
  };
  
  $rootScope.currentPage = 'Login';
  
  this.logIn = function () {
    if (ctrl.username.length > 0 && ctrl.password.length > 0) {
      Auth.authenticate(ctrl.username, ctrl.password)
        .then(function () {
          Navigator.goTo('home');
        }, function () {
          ctrl.failedAuthorize();
        });
    } else {
      toastr.warning('Please, type Your username and password in form');
    }
  };
  
  this.failedAuthorize = function () {
    ctrl.username      = '';
    ctrl.password      = '';
    ctrl.incorrectData = true;
    ctrl.title         = 'Entered data is invalid. Please try again';
  };
  
}

module.exports = {
  template    : require('./login.html'),
  controller  : Login,
  controllerAs: 'vm'
};
