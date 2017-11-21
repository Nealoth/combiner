module.exports = function ($scope, event, filters, eventsResource, confirmationWindow) {
	'use strict';
	var e             = eventsResource;
	var dateBegin     = moment(event.EventDate).subtract(1, 'days').format('YYYY-MM-DD') + 'T' + '00:00';
	var dateEnd       = moment(event.EventDate).add(1, 'days').format('YYYY-MM-DD') + 'T' + '23:59';
	var ctrl          = this;
	this.systemEvents = null;
	this.event        = event;
	this.canImport    = event.CanBeImported;
	
	this.searchBySystemEvent = Object.create(null);
	
	this.findLongestWord = function (str) {
		var words       = str.replace(/\(.*\)/ig, "").replace(/[,./]/g, " ");
		var longestWord = '';
		var wordsArray  = words.split(' ');
		if (wordsArray.length > 1)
			wordsArray.forEach(function (item) {
				if (item.length > longestWord.length) longestWord = item;
			});
		else
			longestWord = wordsArray[ 0 ];
		
		return longestWord;
	};
	
	setTimeout(function () {
		ctrl.searchBySystemEvent.TeamHomeName = ctrl.findLongestWord(event.TeamHomeName);
	});
	setTimeout(function () {
		ctrl.searchBySystemEvent.TeamGuestName = ctrl.findLongestWord(event.TeamGuestName);
	});
	
	e.system.get(
		null,
		null,
		event.SportID,
		dateBegin,
		dateEnd
	).then(function (systemEvents) {
		ctrl.systemEvents = systemEvents;
	});
	
	this.import = function (systemEvent, isImport) {
		if (isImport)
			confirmationWindow.open('Are you sure want to IMPORT this event?').then(function () {
				var sysId = systemEvent ? systemEvent.ID : null;
				e.live.import(ctrl.event.ID, sysId, isImport).then(function () {
					$scope.confirm(true);
				})
			});
		else
			confirmationWindow.open('Are you sure want to REMOVE association').then(function () {
				e.live.import(ctrl.event.ID, null, isImport).then(function () {
					$scope.confirm(true);
				})
			});
	};
	
	
	this.viewOdds = function () {
		window.open(window.location.origin + '/#/monitoring/prematch/' + ctrl.event.ID + '/odds');
	};
	
	setTimeout(function () {
		componentHandler.upgradeAllRegistered();
	}, 300);
};