var systemTranslateModalTemp = require('./../systemModal/systemTranslateModalTemp.html');
var systemTranslateModalCtrl = require('./../systemModal/systemTranslateModalCtrl');

module.exports = function (translationsResource,
                           currentLanguage,
                           currentEntityID,
                           mode,
                           distTemplateID,
                           RecordId,
                           ngDialog,
                           AppModules) {
	'use strict';
	var _this = this;
	var t     = translationsResource;
	
	this.translations = [];
	this.systemName   = "Loading...";
	
	this.clientRights = AppModules.checkModule(43);
	
	this.refresh = function () {
		t.getByID(currentEntityID, RecordId, distTemplateID).then(function (translations) {
			_this.translations = translations;
			_this.systemName   = translations[ 0 ].OrigineName
		})
	};
	
	this.openModal = function (translation) {
		//ngDialog.openConfirm({
		//	controller  : systemTranslateModalCtrl,
		//	template    : systemTranslateModalTemp,
		//	plain       : true,
		//	controllerAs: 'vm',
		//	width       : '800px',
		//	resolve     : {
		//		translation    : function () {
		//			return translation;
		//		},
		//		currentLanguage: function () {
		//			return currentLanguage;
		//		},
		//		currentEntityID: function () {
		//			return currentEntityID
		//		},
		//		mode           : function () {
		//			return mode;
		//		},
		//		distTemplateID : function () {
		//			return distTemplateID;
		//		}
		//	}
		//}).then(function (needToRefresh) {
		//	if (needToRefresh) _this.refresh();
		//})
	};
	
	setTimeout(function () {
		componentHandler.upgradeAllRegistered();
		_this.refresh();
	}, 100);
	
};
