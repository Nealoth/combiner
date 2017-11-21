var ServiceLogs        = require('./ServiceLogs');
var ParserErrorLogs    = require('./ParserErrorLogs');
var DistributePrematch = require('./DistributePrematch');
var UsersLogs          = require('./UsersLogs');
var CrawlerLogs        = require('./CrawlerLogs');

angular.module('app')
       .component('logs.servicelogs', ServiceLogs)
       .component('logs.parsererror', ParserErrorLogs)
       .component('logs.distributePrematch', DistributePrematch)
       .component('logs.usersLogs', UsersLogs)
       .component('logs.crawlerLogs', CrawlerLogs)
