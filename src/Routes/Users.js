module.exports = [
  {
    state      : 'users',
    routeConfig: {
      url        : '/users',
      component  : 'users',
      parent     : 'authorized__layout',
      navIcon    : 'account_box',
      moduleID   : 22,
      navName    : 'Users',
      navOrdering: 9,
      navVisible : true,
    }
  },
  {
    state      : 'users.clients',
    routeConfig: {
      url       : '/clients',
      component : 'users.clients',
      moduleID  : 60,
      navVisible: true,
      navName   : 'Clients'
    }
  },
  {
    state      : 'users.modules',
    routeConfig: {
      url       : '/modules',
      component : 'users.modules',
      moduleID  : 80,
      navVisible: true,
      navName   : 'Modules'
    }
  },
  {
    state      : 'users.distributeTemplates',
    routeConfig: {
      url       : '/distributeTemplates',
      component : 'users.distributeTemplates',
      moduleID  : 79,
      navVisible: true,
      navName   : 'Dist Templates'
    }
  },
  {
    state      : 'users.userTemplates',
    routeConfig: {
      url       : '/userTemplates',
      component : 'users.userTemplates',
      moduleID  : 82,
      navVisible: true,
      navName   : 'User Templates'
    }
  },
  {
    state      : 'users.users',
    routeConfig: {
      url       : '/users',
      component : 'users.users',
      moduleID  : 23,
      navVisible: true,
      navName   : 'Users'
    }
  },
  {
    state      : 'users.activity',
    routeConfig: {
      url       : '/activity',
      component : 'users.activity',
      moduleID  : 45,
      navVisible: true,
      navName   : 'Activity'
    }
  }
];
