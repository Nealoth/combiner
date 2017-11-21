var Odds       = require('./Odds');
var Results    = require('./Results');
var Scores     = require('./Scores');
var Chronology = require('./Chronology');

angular.module('app')
       .component('monitoring.system.prematch.odds', Odds)
       .component('monitoring.system.prematch.results', Results)
       .component('monitoring.system.prematch.scores', Scores)
       .component('monitoring.system.prematch.chronology', Chronology);
