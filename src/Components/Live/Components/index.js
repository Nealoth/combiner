var BetTypes    = require('./BetTypes');
var Leagues     = require('./Leagues');
var Teams       = require('./Teams');
var Events      = require('./Events');
var Scores      = require('./Scores');
var EventStatus = require('./EventStatus');

angular.module('app')
       .component('live.bettypes', BetTypes)
       .component('live.leagues', Leagues)
       .component('live.teams', Teams)
       .component('live.events', Events)
       .component('live.scores', Scores)
       .component('live.eventStatus', EventStatus)
