module.exports = [
	{
		state      : 'configuration',
		routeConfig: {
			url        : '/configuration',
			component  : 'configuration',
			parent     : 'authorized__layout',
			navIcon    : 'build',
			navName    : 'Configuration',
			navOrdering: 1,
			navVisible : true,
			moduleID   : 16
		}
	},
	{
		state      : 'configuration.oddskeys',
		routeConfig: {
			url       : '/oddskeys',
			component : 'configuration.oddskeys',
			moduleID  : 19,
			navVisible: true,
			navName   : 'Odds Keys'
		}
	},
	{
		state      : 'configuration.sending',
		routeConfig: {
			url       : '/sending',
			component : 'configuration.sending',
			moduleID  : 59,
			navVisible: true,
			navName   : 'Sending'
		}
	},
	{
		state      : 'configuration.formulas',
		routeConfig: {
			url       : '/formulas',
			component : 'configuration.formulas',
			moduleID  : 87,
			navVisible: false,
			navName   : 'Formula Configuration'
		}
	},
	{
		state      : 'configuration.settings',
		routeConfig: {
			url       : '/settings',
			component : 'configuration.settings',
			moduleID  : 89,
			navVisible: true,
			navName   : 'Settings'
		}
	}
];
