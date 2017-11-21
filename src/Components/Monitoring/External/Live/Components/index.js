var Odds       = require('./Odds');
var Results    = require('./Results');
var Scores     = require('./Scores');
var Chronology = require('./Chronology');

angular.module('app')
       .component('monitoring.live.odds', Odds)
       .component('monitoring.live.results', Results)
       .component('monitoring.live.scores', Scores)
       .component('monitoring.live.chronology', Chronology);
