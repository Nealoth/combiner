module.exports = [
  {
    state      : 'prematch',
    routeConfig: {
      url        : '/prematch',
      component  : 'prematch',
      parent     : 'authorized__layout',
      navIcon    : 'present_to_all',
      moduleID   : 10,
      navName    : 'Prematch',
      navOrdering: 5,
      navVisible : true,
    },
  },
  {
    state      : 'prematch.leagues',
    routeConfig: {
      url       : '/leagues',
      component : 'prematch.leagues',
      moduleID  : 12,
      navVisible: true,
      navName   : 'Leagues'
    },
  },
  {
    state      : 'prematch.teams',
    routeConfig: {
      url       : '/teams',
      component : 'prematch.teams',
      moduleID  : 13,
      navVisible: true,
      navName   : 'Teams'
    },
  },
  {
    state      : 'prematch.bettypes',
    routeConfig: {
      url       : '/bettypes',
      component : 'prematch.bettypes',
      moduleID  : 14,
      navVisible: true,
      navName   : 'Bet Types'
    },
  },
  {
    state      : 'prematch.events',
    routeConfig: {
      url       : '/events',
      component : 'prematch.events',
      moduleID  : 33,
      navVisible: true,
      navName   : 'Events'
    },
  },
  {
    state      : 'prematch.scores',
    routeConfig: {
      url       : '/scores',
      component : 'prematch.scores',
      moduleID  : 15,
      navVisible: true,
      navName   : 'Scores'
    },
  },
  {
    state      : 'prematch.players',
    routeConfig: {
      url       : '/players',
      component : 'prematch.players',
      moduleID  : 76,
      navVisible: true,
      navName   : 'Players'
    },
  },
  {
    state      : 'prematch.outrights',
    routeConfig: {
      url       : '/outrights',
      component : 'prematch.outrights',
      moduleID  : 77,
      navVisible: true,
      navName   : 'Outrights'
    },
  }
];
