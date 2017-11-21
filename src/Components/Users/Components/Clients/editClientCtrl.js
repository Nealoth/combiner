module.exports = function (client, usersResource, $scope, confirmationWindow) {
  'use strict';
  var _this = this;
  var u     = usersResource;
  
  this.buttonText = client ? 'Save' : 'Create';
  
  this.name = client ? client.Name : null;
  
  this.submit = function () {
    var method = client ? 'update' : 'create';
    var req    = {
      Us_TemplateId: client ? client.ID : null,
      Name         : _this.name
    };
    u.clients[ method ](req).then(function () {
      $scope.confirm(true);
    })
  };
  
  this.delete = function () {
    confirmationWindow.open().then(function () {
      u.clients.delete({Id: client.ID}).then(function () {
        $scope.confirm(true);
      })
    })
  };
  
  setTimeout(function () {
    componentHandler.upgradeAllRegistered();
  }, 100);
};
