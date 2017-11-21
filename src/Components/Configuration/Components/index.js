var OddsKeys = require('./OddsKeys');
var Sending  = require('./Sending');
var Formulas = require('./Formulas');
var Settings = require('./Settings');

angular.module('app')
       .component('configuration.oddskeys', OddsKeys)
       .component('configuration.sending', Sending)
       .component('configuration.formulas', Formulas)
       .component('configuration.settings', Settings)
       
