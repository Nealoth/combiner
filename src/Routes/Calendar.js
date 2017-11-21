module.exports = [
  {
    state      : 'calendar',
    routeConfig: {
      url        : '/calendar',
      component  : 'calendar',
      parent     : 'authorized__layout',
      navIcon    : 'event_note',
      moduleID   : 8,
      navName    : 'Calendar',
      navOrdering: 1,
      navVisible : true,
    }
  }
];
