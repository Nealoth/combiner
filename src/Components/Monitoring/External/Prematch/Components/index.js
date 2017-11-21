var Odds       = require('./Odds');
var Results    = require('./Results');
var Scores     = require('./Scores');
var Chronology = require('./Chronology');

angular.module('app')
       .component('monitoring.prematch.odds', Odds)
       .component('monitoring.prematch.results', Results)
       .component('monitoring.prematch.scores', Scores)
       .component('monitoring.prematch.chronology', Chronology);
