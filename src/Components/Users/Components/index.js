var Modules             = require('./Modules');
var DistributeTemplates = require('./DistributeTemplates');
var UserTemplates       = require('./UserTemplates');
var Users               = require('./Users');
var Activity            = require('./Activity');
var Clients             = require('./Clients');

angular.module('app')
       .component('users.modules', Modules)
       .component('users.distributeTemplates', DistributeTemplates)
       .component('users.userTemplates', UserTemplates)
       .component('users.users', Users)
       .component('users.activity', Activity)
       .component('users.clients', Clients);
