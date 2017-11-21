require('./Components');

function Monitoring_PrematchOutrigts ($rootScope, $stateParams, $state, eventsResource) {
  
  var ctrl = this;
  var e    = eventsResource;
  
  //if(!$stateParams.id){
  //	$state.go('home');
  //}
  
  $rootScope.headerInfo = 'Prematch Outrights Monitoring';
  
  //e.system.getHeader($stateParams.id, null).then(function (eventHeader) {
  //	$rootScope.currentPage = eventHeader.EventName;
  //});
}

module.exports = {
  template  : require('./monitoring.prematchOutrights.html'),
  controller: Monitoring_PrematchOutrigts
};
