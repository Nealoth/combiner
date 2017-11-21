var temp = require('./systemSports.html');

angular.module('app').directive("filterSystemSports", function (cacheSvc) {
	return {
		restrict  : 'E',
		replace   : true,
		template  : temp,
		scope     : {
			model          : '=',
			source         : '=',
			selectedSportId: '='
		},
		controller: function ($scope, $element, $attrs, $compile) {
			$scope.withAll = !!$attrs.$attr[ 'withAll' ];
			$scope.compile = $compile;
			$scope.load    = function () {
				cacheSvc.get('systemSports')
				        .then(function (sports) {
					        $scope.options = sports;
					        if (sports) $scope.preFilter(sports);
				        })
				        .catch(function () {
					        setTimeout(function () {
						        $scope.load();
					        }, 6000);
				        });
			};
			$scope.load();
			
			$scope.addNullField = function () {
				var nullField           = {ID: null, Name: 'All sports', NullField: true};
				var nullFieldNotCreated = function (element) {return element.ID;};
				if ($scope.options.every(nullFieldNotCreated)) {
					var temp = [];
					temp.push(nullField);
					$scope.options.forEach(function (item) {temp.push(item)});
					$scope.options = temp;
				}
			}
		},
		compile   : function () {
			return {
				pre : function (scope, el, attr) {
					scope.preFilter = function (sports) {
						var sports = sports;
						if (attr.$attr[ 'source' ]) {
							scope.$watch('source', function () {
								if (scope.source) {
									scope.options = sports.filter(function (sport) {
										return sport.Sources.split('|').includes(scope.source.Id.toString());
									});
									if (scope.withAll) scope.addNullField();
								} else {
									scope.options = sports;
								}
								scope.postFilter();
							});
						}
						scope.postFilter();
					}
				},
				post: function (scope, el, attr) {
					scope.postFilter = function () {
						if (attr.$attr[ 'selectedSportId' ]) {
							setTimeout(function () {
								if (scope.selectedSportId)
									scope.options.forEach(function (item, i) {
										if (item.ID === scope.selectedSportId) {
											scope.model = scope.options[ i ].ID;
										}
									});
								else if (scope.withAll)
									scope.model = null;
								else
									scope.model = 1;
							}, 1000)
						} else {
							if (scope.withAll) {
								scope.addNullField();
								scope.model = null;
							} else {
								scope.model = 1;
							}
						}
						el.html(el.html());
						scope.compile(el)(scope);
					}
				}
			}
		}
	}
});
