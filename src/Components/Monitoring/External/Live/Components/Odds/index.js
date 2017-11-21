function Monitoring_Live_Odds ($rootScope, $stateParams, eventsResource, oddsResource) {
	'use strict';
	$rootScope.spinner = false;
	var e           = eventsResource;
	var o           = oddsResource;
	var ctrl        = this;
	this.SyncDate   = null;
	this.betTypes   = null;
	this.onlyActive = true;
	
	setTimeout(function () {
		$rootScope.spinner = false;
	}, 3000);
	
	this.loadAllOdds = function () {
		o.live.get($stateParams.id, ctrl.SyncDate).then(function (eventOdds) {
			ctrl.betTypes = eventOdds.Object;
			ctrl.SyncDate = eventOdds.SyncDate;
			
			if ($stateParams.id) {
				ctrl.interval = setInterval(function () {
					ctrl.refreshTable();
				}, 5000);
			}
		});
	};
	this.loadAllOdds();
	
	this.refreshTable = function () {
		o.live.get($stateParams.id, ctrl.SyncDate).then(function (eventOdds) {
			if(eventOdds){
        ctrl.SyncDate = eventOdds.SyncDate;
        if (eventOdds.Object.length > 0) {
          for (var i = ctrl.betTypes.length; i--;) {
            for (var j = eventOdds.Object.length; j--;) {
              if (ctrl.betTypes[ i ].Id === eventOdds.Object[ j ].Id) {
                ctrl.betTypes[ i ].OddCountActive = eventOdds.Object[ j ].OddCountActive;
                eventOdds.Object[ j ].liveBetTypeOdds.forEach(function (updatedOdd) {
                  ctrl.betTypes[ i ].liveBetTypeOdds.forEach(function (odd, oddIndex) {
                    if (odd.Id === updatedOdd.Id) {
                      ctrl.betTypes[ i ].liveBetTypeOdds[ oddIndex ] = updatedOdd;
                      return;
                    }
                  });
                });
              }
            }
          }
        }
      }
		});
	};
	
	$rootScope.$on('$stateChangeStart',
		function () {
			clearInterval(ctrl.interval);
		});
	
	this.showOnlyActive = function (currentActiveOdds) {
		'use strict';
		var result = false;
		if (ctrl.onlyActive) {
			if (currentActiveOdds > 0) {
				result = true;
			}
		} else {
			result = true;
		}
		return result;
	};
	
}

module.exports = {
	template    : require('./monitoring.live.odds.html'),
	controller  : Monitoring_Live_Odds,
	controllerAs: 'vm'
};
