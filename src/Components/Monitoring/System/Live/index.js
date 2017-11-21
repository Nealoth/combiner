require('./Components');

function Monitoring_System_Live ($rootScope, $stateParams, $state, eventsResource) {
	'use strict';
	
	var ctrl = this;
	var e    = eventsResource;
	
	if (!$stateParams.id) {
		$state.go('home');
	}
	
	e.system.getHeader($stateParams.id, null).then(function (eventHeader) {
		if (eventHeader) {
			$rootScope.headerInfo = eventHeader.EventName;
			eventHeader.eventScores.forEach(function (item) {
				if (item.GroupScoreId === 1) {
					$rootScope.headerInfo += ' (' + item.HomePoints + ' - ' + item.GuestPoints + ') ';
				}
			})
		}
	});
}

module.exports = {
	template  : require('./monitoring.system.live.html'),
	controller: Monitoring_System_Live
};
