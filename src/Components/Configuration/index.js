require('./Components');

function Configuration ($rootScope) {
  
  $rootScope.currentPage = 'Configuration';
  
}

module.exports = {
  template  : require('./configuration.html'),
  controller: Configuration
};
