require('./Components');

function Monitoring_Live ($rootScope, $stateParams, $state, eventsResource) {
	
	var ctrl = this;
	var e = eventsResource;
	
	if(!$stateParams.id){
		$state.go('home');
	}
	
	e.live.getHeader($stateParams.id, null).then(function (eventHeader) {
		'use strict';
		var status = eventHeader.LiveEventStatusName ? "[" + eventHeader.LiveEventStatusName + "]" : "";
		$rootScope.headerInfo = eventHeader.EventName + status;
	});
}
	
module.exports = {
    template  : require('./monitoring.live.html'),
    controller: Monitoring_Live
};
