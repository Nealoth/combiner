module.exports = [
	{
		state      : 'monitoring-prematch',
		routeConfig: {
			url       : '/monitoring/prematch/:id',
			component : 'monitoring.prematch',
			parent    : 'authorized__layout',
			moduleID  : 34,
			navVisible: false
		}
	},
	{
		state      : 'monitoring-prematch.odds',
		routeConfig: {
			url        : '/odds',
			component  : 'monitoring.prematch.odds',
			moduleID   : 34,
			navVisible : true,
			navOrdering: 1,
			navName    : "Odds"
		}
	},
	{
		state      : 'monitoring-prematch.results',
		routeConfig: {
			url        : '/results',
			component  : 'monitoring.prematch.results',
			moduleID   : 34,
			navVisible : false,
			navOrdering: 2,
			navName    : "Results"
		}
	},
	{
		state      : 'monitoring-prematch.scores',
		routeConfig: {
			url        : '/scores',
			component  : 'monitoring.prematch.scores',
			moduleID   : 34,
			navVisible : true,
			navOrdering: 3,
			navName    : "Scores"
		}
	},
	{
		state      : 'monitoring-prematch.chronology',
		routeConfig: {
			url        : '/chronology',
			component  : 'monitoring.prematch.chronology',
			moduleID   : 34,
			navVisible : false,
			navOrdering: 4,
			navName    : "Chronology"
		}
	}
];
