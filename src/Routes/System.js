module.exports = [
	{
		state      : 'system',
		routeConfig: {
			url        : '/system',
			component  : 'system',
			parent     : 'authorized__layout',
			navIcon    : 'system_update_alt',
			moduleID   : 1,
			navName    : 'System',
			navOrdering: 8,
			navVisible : true,
		}
	},
	{
		state      : 'system.sports',
		routeConfig: {
			url       : '/sports',
			component : 'system.sports',
			moduleID  : 86,
			navVisible: true,
			navName   : 'Sports'
		}
	},
	{
		state      : 'system.bettypes',
		routeConfig: {
			url       : '/bettypes',
			component : 'system.bettypes',
			moduleID  : 2,
			navVisible: true,
			navName   : 'Bet Types'
		}
	},
	{
		state      : 'system.leagues',
		routeConfig: {
			url       : '/leagues',
			component : 'system.leagues',
			moduleID  : 3,
			navVisible: true,
			navName   : 'Leagues'
		}
	},
	{
		state      : 'system.teams',
		routeConfig: {
			url       : '/teams',
			component : 'system.teams',
			moduleID  : 26,
			navVisible: true,
			navName   : 'Teams'
		}
	},
	{
		state      : 'system.documentation',
		routeConfig: {
			url       : '/documentation',
			component : 'system.documentation',
			moduleID  : 27,
			navVisible: false,
			navName   : 'Documentation'
		}
	},
	{
		state      : 'system.appmonitoring',
		routeConfig: {
			url       : '/appmonitoring',
			component : 'system.appmonitoring',
			moduleID  : 35,
			navVisible: true,
			navName   : 'App monitoring'
		}
	},
	{
		state      : 'system.scores',
		routeConfig: {
			url       : '/scores',
			component : 'system.scores',
			moduleID  : 47,
			navVisible: true,
			navName   : 'Scores'
		}
	},
	{
		state      : 'system.players',
		routeConfig: {
			url       : '/players',
			component : 'system.players',
			moduleID  : 74,
			navVisible: true,
			navName   : 'Players'
		}
	},
	{
		state      : 'system.outrights',
		routeConfig: {
			url       : '/outrights',
			component : 'system.outrights',
			moduleID  : 78,
			navVisible: true,
			navName   : 'Outrights'
		}
	},
	{
		state      : 'system.betTypeViews',
		routeConfig: {
			url       : '/bettypeviews',
			component : 'system.betTypeViews',
			moduleID  : 84,
			navVisible: true,
			navName   : 'Bet Type Views'
		}
	},
	{
		state      : 'system.teamTypes',
		routeConfig: {
			url       : '/teamTypes',
			component : 'system.teamTypes',
			moduleID  : 85,
			navVisible: true,
			navName   : 'Team Types'
		}
	}
];
