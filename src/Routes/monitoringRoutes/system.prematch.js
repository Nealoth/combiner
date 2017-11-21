module.exports = [
	{
		state      : 'monitoring-system-prematch',
		routeConfig: {
			url       : '/monitoring/system/prematch/:id',
			component : 'monitoring.system.prematch',
			parent    : 'authorized__layout',
			moduleID  : 57,
			navVisible: false
		}
	},
	{
		state      : 'monitoring-system-prematch.odds',
		routeConfig: {
			url        : '/odds',
			component  : 'monitoring.system.prematch.odds',
			moduleID   : 57,
			navVisible : true,
			navOrdering: 1,
			navName    : "Odds"
		}
	},
	{
		state      : 'monitoring-system-prematch.results',
		routeConfig: {
			url        : '/results',
			component  : 'monitoring.system.prematch.results',
			moduleID   : 57,
			navVisible : false,
			navOrdering: 2,
			navName    : "Results"
		}
	},
	{
		state      : 'monitoring-system-prematch.scores',
		routeConfig: {
			url        : '/scores',
			component  : 'monitoring.system.prematch.scores',
			moduleID   : 57,
			navVisible : true,
			navOrdering: 3,
			navName    : "Scores"
		}
	},
	{
		state      : 'monitoring-system-prematch.chronology',
		routeConfig: {
			url        : '/chronology',
			component  : 'monitoring.system.prematch.chronology',
			moduleID   : 57,
			navVisible : false,
			navOrdering: 4,
			navName    : "Chronology"
		}
	}
];
