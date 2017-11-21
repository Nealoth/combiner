var Odds       = require('./Odds');
var Results    = require('./Results');
var Scores     = require('./Scores');
var Chronology = require('./Chronology');

angular.module('app')
       .component('monitoring.system.live.odds', Odds)
       .component('monitoring.system.live.results', Results)
       .component('monitoring.system.live.scores', Scores)
       .component('monitoring.system.live.chronology', Chronology);
