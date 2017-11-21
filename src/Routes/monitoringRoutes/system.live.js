module.exports = [
	{
		state      : 'monitoring-system-live',
		routeConfig: {
			url       : '/monitoring/system/live/:id',
			component : 'monitoring.system.live',
			parent    : 'authorized__layout',
			moduleID  : 29,
			navVisible: false
		}
	},
	{
		state      : 'monitoring-system-live.odds',
		routeConfig: {
			url        : '/odds',
			component  : 'monitoring.system.live.odds',
			moduleID   : 29,
			navVisible : true,
			navOrdering: 1,
			navName    : "Odds"
		}
	},
	{
		state      : 'monitoring-system-live.results',
		routeConfig: {
			url        : '/results',
			component  : 'monitoring.system.live.results',
			moduleID   : 29,
			navVisible : false,
			navOrdering: 2,
			navName    : "Results"
		}
	},
	{
		state      : 'monitoring-system-live.scores',
		routeConfig: {
			url        : '/scores',
			component  : 'monitoring.system.live.scores',
			moduleID   : 29,
			navVisible : true,
			navOrdering: 3,
			navName    : "Scores"
		}
	},
	{
		state      : 'monitoring-system-live.chronology',
		routeConfig: {
			url        : '/chronology',
			component  : 'monitoring.system.live.chronology',
			moduleID   : 29,
			navVisible : false,
			navOrdering: 4,
			navName    : "Chronology"
		}
	}
];
