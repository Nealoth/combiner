function Monitoring_System_Odds ($stateParams, oddsResource, $rootScope, cfpLoadingBar) {
	'use strict';
	$rootScope.spinner = false;
	var o           = oddsResource;
	var ctrl        = this;
	this.betTypes   = null;
	this.SyncDate   = null;
	this.onlyActive = true;
	
	setTimeout(function () {
		$rootScope.spinner = false;
	}, 3000);
	
	this.checkActive = function (betType) {
		setTimeout(function () {
			'use strict';
			var currentActiveOdds = 0;
			betType.betTypeOdds.forEach(function (row) {
				row.bto.forEach(function (cell) {
					if (cell.OddStatus === 0) {
						currentActiveOdds++;
					}
				})
			});
			betType.currentActiveOdds = currentActiveOdds;
		});
	};
	
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
	
	this.loadAll = function () {
		setTimeout(function () {
      o.system.get($stateParams.id, ctrl.SyncDate).then(function (eventOdds) {
        ctrl.betTypes = eventOdds.Object;
        ctrl.SyncDate = eventOdds.SyncDate;
        
        ctrl.betTypes.forEach(function (betType) {
          ctrl.checkActive(betType);
        });
        
        if ($stateParams.id && ctrl.betTypes.length > 0) {
          ctrl.interval = setInterval(function () {
            ctrl.refreshTable();
          }, 5000);
        }
      });
    }, 100);
	};
	this.loadAll();
	
	
	this.refreshTable = function () {
		o.system.get($stateParams.id, ctrl.SyncDate).then(function (eventOdds) {
			if (eventOdds) {
				ctrl.SyncDate = eventOdds.SyncDate;
				if (eventOdds.eventOdds.length > 0) {
					for (var i = ctrl.betTypes.length; i--;) {
						for (var j = eventOdds.eventOdds.length; j--;) {
							if (ctrl.betTypes[ i ].Id === eventOdds.eventOdds[ j ].BetTypeId) {
								ctrl.betTypes[ i ].betTypeOdds.forEach(function (row, rowIndex) {
									row.bto.forEach(function (cell, cellIndex) {
										if (cell.Id === eventOdds.eventOdds[ j ].Id) {
											console.info(
												ctrl.betTypes[ i ].Name + ' ' +
												cell.Title + ' [ ' + cell.OddFactor + ' => ' +
												eventOdds.eventOdds[ j ].OddFactor + ' ]'
											);
											ctrl.betTypes[ i ].betTypeOdds[ rowIndex ].bto[ cellIndex ] = eventOdds.eventOdds[ j ];
											return;
										}
									});
								});
								ctrl.checkActive(ctrl.betTypes[ i ]);
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
	
	this.expandAll = function () {
		ctrl.betTypes.forEach(function (item) {
			item.collapse = false;
		})
	};
	
	this.collapseAll = function () {
		ctrl.betTypes.forEach(function (item) {
			item.collapse = true;
		})
	};
}

module.exports = {
	template    : require('./monitoring.system.odds.html'),
	controller  : Monitoring_System_Odds,
	controllerAs: 'vm'
};
