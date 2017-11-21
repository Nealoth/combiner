module.exports = [
	{
		state      : 'logs',
		routeConfig: {
			url        : '/logs',
			component  : 'logs',
			parent     : 'authorized__layout',
			navIcon    : 'format_list_numbered',
			moduleID   : 50,
			navName    : 'Logs',
			navOrdering: 4,
			navVisible : true,
		}
	},
	{
		state      : 'logs.servicelogs',
		routeConfig: {
			url       : '/servicelogs',
			component : 'logs.servicelogs',
			moduleID  : 51,
			navVisible: true,
			navName   : 'Service Logs'
		}
		
	},
	{
		state      : 'logs.parsererror',
		routeConfig: {
			url       : '/parsererror',
			component : 'logs.parsererror',
			moduleID  : 52,
			navVisible: true,
			navName   : 'Parser Logs'
		}
		
	},
	{
		state      : 'logs.distributePrematch',
		routeConfig: {
			url       : '/distributeprematch',
			component : 'logs.distributePrematch',
			moduleID  : 56,
			navVisible: true,
			navName   : 'Distribute Prematch Logs'
		}
		
	},
	{
		state      : 'logs.usersLogs',
		routeConfig: {
			url       : '/usersLogs',
			component : 'logs.usersLogs',
			moduleID  : 54,
			navVisible: true,
			navName   : 'User Logs'
		}
	},
	{
		state      : 'logs.crawlerLogs',
		routeConfig: {
			url       : '/crawlerLogs',
			component : 'logs.crawlerLogs',
			moduleID  : 89,
			navVisible: true,
			navName   : 'Crawler Logs'
		}
	}
];
