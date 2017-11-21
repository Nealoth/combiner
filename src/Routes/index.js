var Layouts       = require('./Layouts');
var Login         = require('./Login');
var Home          = require('./Home');
var Calendar      = require('./Calendar');
var Live          = require('./Live');
var Prematch      = require('./Prematch');
var Configuration = require('./Configuration');
var Users         = require('./Users');
var System        = require('./System');
var Translations  = require('./Translations');
var Logs          = require('./Logs');
var Monitoring    = require('./monitoringRoutes');
var TotalRoutes   = require('./_TotalRoutes');

module.exports = function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(false).hashPrefix('');
  
  var totalRoutes = new TotalRoutes();
  
  this.registerSection = function (routesArray) {
    routesArray.forEach(function (route) {
      if (route[ 'state' ] && route[ 'routeConfig' ]) {
        if (typeof route.routeConfig[ 'moduleID' ] == 'number') {
          $stateProvider.state(route.state, route.routeConfig);
          totalRoutes.push(route);
          route.routeConfig.stateName = route.state;
        } else console.error('Needed by auth Module ID field not found in route: ', route);
      }
      else
        console.error('There may be no field (state or routeConfig) in route: ', route);
    });
  };
  
  $stateProvider.state('404', {
    url      : '/404',
    component: '404',
    parent   : 'authorized__layout'
  });
  
  this.registerSection(Layouts);
  this.registerSection(Login);
  this.registerSection(Home);
  this.registerSection(Calendar);
  this.registerSection(Live);
  this.registerSection(Prematch);
  this.registerSection(Configuration);
  this.registerSection(Users);
  this.registerSection(System);
  this.registerSection(Translations);
  this.registerSection(Logs);
  this.registerSection(Monitoring.system.live);
  this.registerSection(Monitoring.system.prematch);
  this.registerSection(Monitoring.external.live);
  this.registerSection(Monitoring.external.prematch);
  this.registerSection(Monitoring.external.outrights.prematch);
};
