module.exports = [
	{
		state      : 'monitoring-live',
		routeConfig: {
			url       : '/monitoring/live/:id',
			component : 'monitoring.live',
			parent    : 'authorized__layout',
			moduleID  : 31,
			navVisible: false
		}
	},
	{
		state      : 'monitoring-live.odds',
		routeConfig: {
			url        : '/odds',
			component  : 'monitoring.live.odds',
			moduleID   : 31,
			navVisible : true,
			navOrdering: 1,
			navName    : "Odds"
		}
	},
	{
		state      : 'monitoring-live.results',
		routeConfig: {
			url        : '/results',
			component  : 'monitoring.live.results',
			moduleID   : 31,
			navVisible : false,
			navOrdering: 2,
			navName    : "Results"
		}
	},
	{
		state      : 'monitoring-live.scores',
		routeConfig: {
			url        : '/scores',
			component  : 'monitoring.live.scores',
			moduleID   : 31,
			navVisible : true,
			navOrdering: 3,
			navName    : "Scores"
		}
	},
	{
		state      : 'monitoring-live.chronology',
		routeConfig: {
			url        : '/chronology',
			component  : 'monitoring.live.chronology',
			moduleID   : 31,
			navVisible : false,
			navOrdering: 4,
			navName    : "Chronology"
		}
	}
];
