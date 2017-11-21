angular.module('app')
    .directive('menuClose', function() {
        return {
            restrict: 'AC',
            link: function($scope, $element) {
                $element.bind('click', function() {
                    setTimeout(function () {
	                    var drawer = angular.element(document.querySelector('.mdl-layout__drawer'));
	                    var obfuscator = angular.element(document.querySelector('.mdl-layout__obfuscator'));
	                    if(drawer) {
		                    drawer.toggleClass('is-visible');
	                    }
	                    if(obfuscator){
		                    obfuscator.toggleClass('is-visible');
	                    }
                    })
                });
            }
        };
    });