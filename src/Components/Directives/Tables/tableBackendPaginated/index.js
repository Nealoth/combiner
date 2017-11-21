var temp = require('./tableBackendPaginated.html');
require('./styles.css');

angular.module("app")
       .directive("tableBackendPaginated", function () {
	       return {
		       restrict  : "E",
		       template  : temp,
		       replace   : false,
		       transclude: true,
		       scope     : {
			       perPage        : '=',
			       currentPage    : '=',
			       totalCount     : '=',
			       refreshFunction: '&'
		       },
		       controller: function ($scope, $element, $attrs, $transclude) {
			       $scope.itemsPerPage = [
				       {
					       name : "20",
					       value: 20
				       },
				       {
					       name : "50",
					       value: 50
				       },
				       {
					       name : "70",
					       value: 70
				       },
				       {
					       name : "100",
					       value: 100
				       }
			       ];
			
			       $scope.perPage     = $scope.itemsPerPage[ 0 ].value;
			       $scope.currentPage = 1;
			       $scope.totalCount  = 0;
			       $scope.pagesCount  = 0;
			       $scope.pages       = [];
			       $scope.firstLoad   = false;
			       $scope.isLoading   = false;
			
			       $scope.calculatePages = function () {
				       $scope.pagesCount = Math.ceil($scope.totalCount / $scope.perPage);
				       $scope.pages      = [];
				
				       for (var i = 1; i <= $scope.pagesCount; i++) {
					       if ((i > $scope.currentPage - 4 && i <= $scope.currentPage)) {
						       $scope.pages.push(i);
					       }
					       if ((i < $scope.currentPage + 4 && i > $scope.currentPage)) {
						       $scope.pages.push(i);
					       }
				       }
			       };
			
			       $scope.$watch('totalCount', function () {
				       if (!$scope.firstLoad && $scope.totalCount > 0) $scope.firstLoad = true;
				       $scope.calculatePages();
				       $scope.checkPageAvailibility();
			       }, true);
			
			       $scope.$watch('perPage', function () {
				       if ($scope.totalCount) {
					       $scope.calculatePages();
					       $scope.refresh();
				       }
				
				       $scope.checkPageAvailibility();
			       }, true);
			
			       $scope.changePage = function (page) {
				       if ($scope.currentPage !== page) {
					       $scope.isLoading = true;
					       $scope.currentPage = page;
					       $scope.calculatePages();
					       $scope.refresh();
				       }
			       };
			
			       $scope.checkPageAvailibility = function () {
				       if ($scope.currentPage > $scope.pagesCount) {
					       if ($scope.pagesCount > 0) {
						       $scope.changePage($scope.pagesCount);
					       }
				       }
			       };
			
			       $scope.refresh = function () {
				       
				       $scope.refreshFunction();
				       
				       setTimeout(function () {
					       $scope.isLoading = false;
				       }, 300);
			       };
		       },
		       link      : function () {
			       componentHandler.upgradeAllRegistered();
		       }
	       }
       });