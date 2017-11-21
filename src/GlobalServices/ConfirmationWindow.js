	angular.module('app')
       .service('confirmationWindow', function (ngDialog) {
	
       	this.open = function (header) {
       		var headerText = header || 'Are you sure?';
	        return ngDialog.openConfirm({
		        template:
		        '<h5 class="text-center">' + headerText + '</h5>' +
		        '<br>' +
		        '<div>' +
		        '<button ' +
		        '   type="button" ' +
		        '   class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" ' +
		        '   ng-click="confirm(1)">Yes</button>&nbsp;&nbsp;&nbsp;' +
		        '<button ' +
		        '   type="button" ' +
		        '   class="pull-right mdl-button mdl-js-button mdl-button--raised" ' +
		        '   ng-click="closeThisDialog(0)">No</button>' +
		        '</div>',
		        plain: true,
	        })
        };
       });


