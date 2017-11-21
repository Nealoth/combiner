require('./Components');

function Monitoring_Prematch ($rootScope, $stateParams, $state, eventsResource) {
	
	var ctrl = this;
	var e = eventsResource;
	
	if(!$stateParams.id){
		$state.go('home');
	}
	
	e.system.getHeader($stateParams.id, null).then(function (eventHeader) {
		$rootScope.headerInfo = eventHeader.EventName;
	});
}
	
module.exports = {
    template  : require('./monitoring.prematch.html'),
    controller: Monitoring_Prematch
};
