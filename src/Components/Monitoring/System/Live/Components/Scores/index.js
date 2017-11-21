function Monitoring_System_Scores ($stateParams, $rootScope, eventsResource) {
	var _this     = this;
	var e         = eventsResource;
	this.scores   = null;
	this.SyncDate = null;
	this.interval = null;
	
	setTimeout(function () {
		$rootScope.spinner = false;
	}, 3000);
	
	this.refresh = function () {
		e.system.getScores($stateParams.id, null).then(function (scores) {
			_this.scores   = scores.Object;
			_this.SyncDate = scores.SyncDate;
		});
	};
	
	this.increment = function () {
		e.system.getScores($stateParams.id, _this.SyncDate).then(function (scores) {
			_this.SyncDate = scores.SyncDate;
			
			for (var i = scores.Object.length; i--;) {
				for (var k = _this.scores.length; k--;) {
					if (_this.scores[ k ].Id === scores.Object[ i ].Id) {
						_this.scores[ k ] = scores.Object[ i ];
					}
				}
			}
		});
	};
	
	(function () {
		_this.refresh();
		_this.interval = setInterval(function () {
			_this.increment();
		}, 5000)
	})();
	
	$rootScope.$on('$stateChangeStart',
		function () {
			clearInterval(_this.interval);
		});
}

module.exports = {
	template    : require('./monitoring.system.scores.html'),
	controller  : Monitoring_System_Scores,
	controllerAs: 'vm'
};