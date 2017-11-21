module.exports = [
	{
		state      : 'monitoring-external-prematchOutrights',
		routeConfig: {
			url       : '/monitoring/ext/prematchOutrights/:id',
			component : 'monitoring.external.prematchOutrights',
			parent    : 'authorized__layout',
			moduleID  : 78,
			navVisible: false
		}
	},
	{
		state      : 'monitoring-external-prematchOutrights.odds',
		routeConfig: {
			url        : '/odds',
			component  : 'monitoring.external.prematchOutrights.odds',
			moduleID   : 78,
			navVisible : true,
			navOrdering: 1,
			navName    : "Odds"
		}
	},
	{
		state      : 'monitoring-external-prematchOutrights.results',
		routeConfig: {
			url        : '/results',
			component  : 'monitoring.external.prematchOutrights.results',
			moduleID   : 78,
			navVisible : true,
			navOrdering: 2,
			navName    : "Results"
		}
	}
];
