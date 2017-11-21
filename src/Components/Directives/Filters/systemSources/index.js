var temp = require('./systemSources.html');

angular.module('app').directive('filterSystemSources', function (cacheSvc) {
	return {
		restrict: 'E',
		replace : false,
		template: temp,
		scope   : {
			model    : '=',
			liveType : '@',
			nullField: '@',
			label    : '@',
			change   : '&'
		},
		compile : function compile () {
			return {
				pre: function (scope, iElement) {
					scope.withAll    = !!iElement[ 0 ].attributes[ 'with-all' ];
					scope._nullField = scope.nullField || "All sources";
					scope._label     = scope.label || "Source";
					
					scope.options = null;
					
					scope._change = function () {
						if (scope.change) scope.change();
					};
					
					scope.$watch('model', function () {
						scope._change();
					});
					
					scope.liveTypeFilter = function (arr) {
						var lt     = scope.liveType === 'live' ? 1 : 0;
						var result = arr.filter(function (item) {
							return item.LiveType === lt || item.LiveType === 2;
						});
						return result;
					};
					
					scope.load = function () {
						cacheSvc.get('sources')
						        .then(function (sources) {
							        scope.options = scope.liveType ? scope.liveTypeFilter(sources) : sources;
							        scope.model   = scope.withAll ? null : scope.options[ 0 ];
						        }).catch(function (er) {
							console.error('Error while loading system sources', er);
							setTimeout(function () {
								scope.load();
							}, 6000);
						})
					};
					scope.load();
				}
			}
		}
	}
});