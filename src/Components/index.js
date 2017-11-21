require('./Directives');
require('./__GlobalComponents');
var Layout        = require('./Layout');
var LoginLayout   = require('./LoginLayout');
var Home          = require('./Home');
var Calendar      = require('./Calendar');
var Configuration = require('./Configuration');
var Live          = require('./Live');
var Prematch      = require('./Prematch');
var Users         = require('./Users');
var Login         = require('./Login');
var System        = require('./System');
var Monitoring    = require('./Monitoring');
var Translations  = require('./Translations');
var Logs          = require('./Logs');

angular.module('app')

       //Layout modules
       .component('layout', Layout)
       .component('loginLayout', LoginLayout)

       //Main modules
       .component('login', Login)
       .component('home', Home)
       .component('calendar', Calendar)
       .component('configuration', Configuration)
       .component('live', Live)
       .component('prematch', Prematch)
       .component('users', Users)
       .component('system', System)
       .component('translations', Translations)
       .component('logs', Logs)

       //Monitoring modules
       .component('monitoring.system.live', Monitoring.system.live)
       .component('monitoring.system.prematch', Monitoring.system.prematch)
       .component('monitoring.live', Monitoring.external.live)
       .component('monitoring.prematch', Monitoring.external.prematch)
       .component('monitoring.external.prematchOutrights', Monitoring.external.prematchOutrights)

