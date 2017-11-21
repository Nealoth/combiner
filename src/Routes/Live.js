module.exports = [
	{
		state      : 'live',
		routeConfig: {
			url        : '/live',
			component  : 'live',
			parent     : 'authorized__layout',
			navIcon    : 'cast_connected',
			moduleID   : 4,
			navName    : 'Live',
			navOrdering: 3,
			navVisible : true,
		}
	},
	{
		state      : 'live.bettypes',
		routeConfig: {
			url       : '/bettypes',
			component : 'live.bettypes',
			moduleID  : 5,
			navVisible: true,
			navName   : 'Bet Types'
		}
	},
	{
		state      : 'live.leagues',
		routeConfig: {
			url       : '/leagues',
			component : 'live.leagues',
			moduleID  : 6,
			navVisible: true,
			navName   : 'Leagues'
		}
	},
	{
		state      : 'live.teams',
		routeConfig: {
			url       : '/teams',
			component : 'live.teams',
			moduleID  : 7,
			navVisible: true,
			navName   : 'Teams'
		}
	},
	{
		state      : 'live.events',
		routeConfig: {
			url       : '/events',
			component : 'live.events',
			moduleID  : 30,
			navVisible: true,
			navName   : 'Events'
		}
	},
	{
		state      : 'live.scores',
		routeConfig: {
			url       : '/scores',
			component : 'live.scores',
			moduleID  : 36,
			navVisible: true,
			navName   : 'Scores'
		}
	},
	{
		state      : 'live.eventStatus',
		routeConfig: {
			url       : '/eventStatuses',
			component : 'live.eventStatus',
			moduleID  : 88,
			navVisible: true,
			navName   : 'Event Statuses'
		}
	},
];

