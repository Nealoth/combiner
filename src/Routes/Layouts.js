module.exports = [
	{
		state      : 'authorized__layout',
		routeConfig: {
			abstract: true,
			views   : {
				'layout': {
					component: 'layout'
				}
			},
			moduleID: 0,
		}
	},
	{
		state      : 'unauthorized__layout',
		routeConfig: {
			abstract: true,
			views   : {
				'layout': {
					component: 'loginLayout'
				}
			},
			moduleID: 0
		}
	}
];
