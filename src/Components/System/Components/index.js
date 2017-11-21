var BetTypes      = require('./BetTypes');
var Leagues       = require('./Leagues');
var Teams         = require('./Teams');
var Documentation = require('./Documentation');
var AppMonitoring = require('./AppMonitoring');
var Scores        = require('./Scores');
var Players       = require('./Players');
var Outrights     = require('./Outrights');
var BetTypeViews  = require('./BetTypeViews');
var TeamTypes     = require('./TeamTypes');
var Sports        = require('./Sports');

angular.module('app')
       .component('system.bettypes', BetTypes)
       .component('system.leagues', Leagues)
       .component('system.teams', Teams)
       .component('system.documentation', Documentation)
       .component('system.appmonitoring', AppMonitoring)
       .component('system.scores', Scores)
       .component('system.players', Players)
       .component('system.outrights', Outrights)
       .component('system.betTypeViews', BetTypeViews)
       .component('system.teamTypes', TeamTypes)
       .component('system.sports', Sports)
