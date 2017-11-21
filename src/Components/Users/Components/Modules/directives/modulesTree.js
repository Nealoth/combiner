angular.module('app')
       .directive('treeList', function () {
	       return {
		       scope: {
			       module: '=treeList',
			       callbackFn: '=onClick'
		       },
           replace: true,
		       restrict: 'EA',
		       template: "<li>" +
		                    "<span ng-click='callbackFn(module)'>[{{module.Id}}] {{module.Name}}</span>" +
		       "             <ul ng-if='module.children'>" +
		       "                <li ng-repeat=\"child in module.children track by Id + '-' + $index\" tree-list='child' on-click='callbackFn'></li>" +
		       "             </ul>" +
		       "           </li>"
	       }
       });
