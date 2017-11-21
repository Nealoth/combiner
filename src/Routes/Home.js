module.exports = [
  {
    state      : 'home',
    routeConfig: {
      url        : '/home',
      component  : 'home',
      parent     : 'authorized__layout',
      navIcon    : 'home',
      moduleID   : 0,
      navName    : 'Home',
      navOrdering: 1,
      navVisible : true,
    }
  }
];
