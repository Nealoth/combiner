function Logs_ParserErrors ($scope, logsResource) {
  var l      = logsResource;
  var _this  = this;
  this.table = [];
  
  this.refresh = function () {
    l.parserErrors.get($scope.currentPage, $scope.itemsPerPage).then(function (logs) {
      $scope.count = logs.Count;
      _this.table = logs.Object;
    })
  };
}

module.exports = {
  template    : require('./logs.parsererrors.html'),
  controller  : Logs_ParserErrors,
  controllerAs: 'vm'
};
