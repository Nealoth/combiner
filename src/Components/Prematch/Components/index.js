var BetTypes  = require('./BetTypes');
var Leagues   = require('./Leagues');
var Teams     = require('./Teams');
var Events    = require('./Events');
var Scores    = require('./Scores');
var Players   = require('./Players');
var Outrights = require('./Outrights');

angular.module('app')
       .component('prematch.bettypes', BetTypes)
       .component('prematch.leagues', Leagues)
       .component('prematch.teams', Teams)
       .component('prematch.events', Events)
       .component('prematch.scores', Scores)
       .component('prematch.players', Players)
       .component('prematch.outrights', Outrights)
