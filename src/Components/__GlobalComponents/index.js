var AssociationWindow = require('./AssociationWindow');
var SettingsWindow = require('./SettingsWindow');

angular.module('app')
       .service('Components', function ($injector) {
	
	       this.windows = Object.create(null);
	
	       this.windows.association = new AssociationWindow($injector);
	       this.windows.settings    = new SettingsWindow($injector);
       });