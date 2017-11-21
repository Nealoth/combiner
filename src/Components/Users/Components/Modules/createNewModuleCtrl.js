module.exports = function (parentModule, usersResource, $scope, confirmationWindow) {
  var _this          = this;
  var u              = usersResource;
  this.parentId      = parentModule ? parentModule.Id : null;
  this.newModuleName = parentModule ? parentModule.Name + ' ' : null;
  
  this.text = parentModule ?
    'new child module of ' + parentModule.Name : 'new parent module';
  
  this.createNewModule = function () {
    u.modules.create(_this.newModuleName, _this.parentId).then(function () {
      $scope.confirm(true);
    })
  };
  
  this.deleteModule = function () {
    confirmationWindow
      .open()
      .then(function () {
        u.modules.delete({ID: _this.parentId})
         .then(function () {
           $scope.confirm(true);
         })
      });
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered()
  }, 50);
};
