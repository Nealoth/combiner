require('./../Polyfills');
require('./../Vendors');
require('./../index.css');
var routesConfig     = require('./../Routes/index');
var AnimationsConfig = require('./../Config/animations.json');

angular
	.module('app', [
		'angular-loading-bar',
		'ui.router',
		'ui.router.state.events',
		'ngCookies',
		'ngDialog',
		'ngAnimate',
		'toastr',
		'datePicker',
		'angular-table',
		'anim-in-out',
		'ivh.treeview',
		'jsonFormatter',
		'ngPopover',
		'oc.lazyLoad',
		'tooltips',
		'vAccordion'
	])
	.config(routesConfig)
	.config(function (cfpLoadingBarProvider) {
		cfpLoadingBarProvider.parentSelector  = 'body';
		cfpLoadingBarProvider.spinnerTemplate = "<div class='spinner'><div class='mdl-spinner mdl-js-spinner is-active'></div></div>";
		cfpLoadingBarProvider.includeSpinner  = true;
	})
	.config(function (toastrConfig) {
		angular.extend(toastrConfig, {
			positionClass: 'toast-bottom-right',
			target       : 'body',
			progressBar  : true,
		});
	})
	.config(function (ngDialogProvider) {
		ngDialogProvider.setDefaults({
			disableAnimation: !AnimationsConfig.dialogWindows,
			ariaAuto        : false,
			plain           : true,
			controllerAs    : 'vm',
			cache           : true
		});
	})
	.config(function ($compileProvider) {
		var devMode = true;
		$compileProvider.debugInfoEnabled(devMode);
		$compileProvider.commentDirectivesEnabled(false);
		$compileProvider.cssClassDirectivesEnabled(false);
	})
	.config(function (ivhTreeviewOptionsProvider) {
		ivhTreeviewOptionsProvider.set({
			twistieExpandedTpl : '<i class="ivh-treeview-material-icon material-icons">expand_more</i>',
			twistieCollapsedTpl: '<i class="ivh-treeview-material-icon material-icons">chevron_right</i>',
			twistieLeafTpl     : '<i class="ivh-treeview-material-icon material-icons">remove</i>'
		});
	})
	.config(function ($injector) {
		$injector.invoke([ '$qProvider', function ($qProvider) {
			$qProvider.errorOnUnhandledRejections(false);
		} ]);
	});

require('./../Config');
require('./../GlobalServices');
require('./../Api');
require('./../Cache');
require('./../Components');

angular
	.module('app')
	.run(function ($http, $rootScope, $state, Auth) {
		Auth.run();
		$rootScope.subpageAnimSpeed = AnimationsConfig.subpageChangeAnimationSpeed;
		$rootScope.currentPage      = "";
		
		$rootScope.$on('$stateChangeStart',
			function () {
				componentHandler.upgradeAllRegistered();
				$rootScope.spinner = AnimationsConfig.spinnerDefault;
			});
		
		$rootScope.$on('$stateChangeSuccess',
			function () {
				componentHandler.upgradeAllRegistered();
				$rootScope.title   = 'Combiner | ' + $rootScope.currentPage;
				$rootScope.spinner = true;
			});
	});
