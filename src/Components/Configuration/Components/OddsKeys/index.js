require('./configuration.oddskeys.css');

function Configuration_OddsKeys (oddsKeysResource, confirmationWindow, toastr,
                                 AppModules, CurrentUser, ngDialog, templatesResource) {
	'use strict';
	var ok   = oddsKeysResource;
	var ctrl = this;
	var t    = templatesResource;
	
	this.filtersCollapsed = false;
	
	this.rights = {
		viewTemplates  : AppModules.checkModule(48),
		changeTemplates: AppModules.checkModule(49)
	};
	
	this.filters = {
		isLive      : null,
		distTemplate: ctrl.rights.viewTemplates ? null : CurrentUser.get().DistributeTemplateID,
		isActive    : true
	};
	
	this.modal = {
		changeValue      : {
			ctrl: null,
			temp: require('./changeValue/changeValueTemp.html')
		},
		changeService    : {
			ctrl: null,
			temp: require('./changeService/changeServiceTemp.html')
		},
		copyConfiguration: {
			ctrl: null,
			temp: require('./copyConfiguration/copyConfigutationTemp.html')
		}
	};
	
	this.oddsKeys        = null;
	this.oddsKeys_backup = null;
	this.currentSportID  = null;
	this.currentLeagueID = null;
	this.currentEventID  = null;
	this.currentLiveType = null;
	this.currentTree     = {
		data     : null,
		isEnabled: true
	};
	
	this.getOddsKeys = function (treeData) {
		ctrl.oddsKeys_backup = null;
		
		if (treeData) {
			ctrl.currentSportID   = treeData.sport ? treeData.sport.ID : null;
			ctrl.currentLeagueID  = treeData.league ? treeData.league.ID : null;
			ctrl.currentEventID   = treeData.event ? treeData.event.ID : null;
			ctrl.currentTree.data = treeData;
			
			ctrl.currentTree.isEnabled =
				treeData.event ? treeData.event.IsOn :
					treeData.league ? treeData.league.IsOn :
						treeData.country ? treeData.country.IsOn :
							treeData.sport ? treeData.sport.IsOn : false;
		}
		ctrl.currentLiveType = ctrl.filters.isLive.value;
		
		ok.get(
			!!ctrl.filters.isLive.value,
			ctrl.filters.distTemplate,
			ctrl.currentSportID,
			ctrl.currentLeagueID,
			ctrl.currentEventID
		  )
		  .then(function (oddsKeys) {
			  ctrl.oddsKeys        = oddsKeys;
			  ctrl.oddsKeys_backup = JSON.parse(JSON.stringify(oddsKeys));
		  });
	};
	
	this.updateDistributedEntity = function () {
		var method =
			    ctrl.currentTree.data.event ? 'event' :
				    ctrl.currentTree.data.league ? 'league' :
					    ctrl.currentTree.data.country ? 'country' : 'sport';
		
		t.updateEntity[ method ]({
			DistributeTemplateID: ctrl.filters.distTemplate,
			EntityID            : ctrl.currentTree.data[ method ].ID,
			IsLive              : !!ctrl.filters.isLive,
			IsOn                : ctrl.currentTree.isEnabled,
			ServiceIDConduct    : null
		});
	};
	
	this.changeRow = function (oddsKey, field) {
		if (ctrl.oddsKeys_backup) oddsKey.changed = true;
	};
	
	this.update = function (oddsKeys) {
		var req = {
			settings: []
		};
		
		oddsKeys.forEach(function (oddsKey) {
			req.settings.push({
				IsLive              : ctrl.filters.isLive.value,
				DistributeTemplateId: ctrl.filters.distTemplate,
				SportId             : ctrl.currentSportID,
				BetTypeId           : oddsKey.BetTypeID,
				LeagueId            : ctrl.currentLeagueID,
				EventId             : ctrl.currentEventID,
				IsOn                : oddsKey.IsOn,
				ServiceId           : oddsKey.ServiceID,
				Mult                : oddsKey.Mult ? oddsKey.Mult : null,
				IsMult              : oddsKey.IsMult,
				OddsKey             : oddsKey.OddsKey,
				MinimumOffer        : oddsKey.MinimumOffer,
				MaximumCap          : oddsKey.MaximumCap
			})
		});
		
		ok.update(req.settings).then(function () {
			ctrl.getOddsKeys();
		});
	};
	
	this.checkRights = function () {
		if (ctrl.filters.distTemplate !== CurrentUser.get().DistributeTemplateID && ctrl.rights.changeTemplates) {
			return true;
		} else return ctrl.filters.distTemplate == CurrentUser.get().DistributeTemplateID;
	};
	
	this.updateAll = function () {
		if (ctrl.checkRights()) {
			if (ctrl.oddsKeys.length > 0) {
				var changes = ctrl.oddsKeys.some(function (element) {
					return !!element.changed;
				});
				if (changes) {
					confirmationWindow.open('Do you really want to update all changed Odd Keys?').then(function () {
						var changed = ctrl.oddsKeys.filter(function (item) {
							return item.changed;
						});
						ctrl.update(changed);
					});
				} else {
					toastr.warning('Nothing to save');
				}
			} else {
				toastr.warning('Nothing to save');
			}
		} else {
			toastr.warning('Not enough rights');
		}
	};
	
	this.changeService = function (oddsKey) {
		require.ensure([], function () {
			ctrl.modal.changeService.ctrl = require('./changeService/changeServiceCtrl');
		}).then(function () {
			ngDialog.openConfirm({
				controller: ctrl.modal.changeService.ctrl,
				template  : ctrl.modal.changeService.temp,
				resolve   : {
					serviceID: function () {
						return oddsKey.ServiceID;
					}
				}
			}).then(function (selected) {
				oddsKey.ServiceID   = selected.Id;
				oddsKey.ServiceName = selected.Name;
				oddsKey.changed     = true;
			})
		});
	};
	
	this.checkValue = function (changingField, item) {
		switch (changingField) {
			case 'OddsKey':
				return !item.IsMult;
				break;
			case 'Mult':
				return !!item.IsMult;
				break;
			default:
				return true;
				break;
		}
	};
	
	this.changeValue = function (field, changeValue) {
		'use strict';
		var len = ctrl.oddsKeys.length;
		for (var i = len - 1; i >= 0; i--) {
			if (ctrl.checkValue(field, ctrl.oddsKeys[ i ])) {
				ctrl.oddsKeys[ i ][ field ] = ctrl.oddsKeys[ i ][ field ] ?
					ctrl.oddsKeys[ i ][ field ] += changeValue
					:
					ctrl.oddsKeys[ i ][ field + 'Parent' ] + changeValue;
				
				ctrl.oddsKeys[ i ].changed = true;
				if (ctrl.oddsKeys[ i ][ field ] <= 0) ctrl.oddsKeys[ i ][ field ] = 0;
			}
		}
	};
	
	this.changeAllValues = function (header, field) {
		require.ensure([], function () {
			ctrl.modal.changeValue.ctrl = require('./changeValue/changeValueCtrl')
		}).then(function () {
			ngDialog.openConfirm({
				controller: ctrl.modal.changeValue.ctrl,
				template  : ctrl.modal.changeValue.temp,
				resolve   : {
					header: function () {
						return header
					}
				}
			}).then(function (value) {
				var len = ctrl.oddsKeys.length;
				for (var i = len - 1; i >= 0; i--) {
					if (ctrl.checkValue(field, ctrl.oddsKeys[ i ])) {
						ctrl.oddsKeys[ i ][ field ] = value;
						ctrl.oddsKeys[ i ].changed  = true;
					}
				}
			});
		});
	};
	
	this.clearAll = function () {
		'use strict';
		if (ctrl.checkRights()) {
			confirmationWindow.open("Are you sure want to clear all values?").then(function () {
				var len = ctrl.oddsKeys.length;
				for (var i = len - 1; i >= 0; i--) {
					ctrl.oddsKeys[ i ].Mult         = null;
					ctrl.oddsKeys[ i ].OddsKey      = null;
					ctrl.oddsKeys[ i ].MinimumOffer = null;
					ctrl.oddsKeys[ i ].MaximumCap   = null;
				}
				
				ctrl.update(ctrl.oddsKeys);
			});
		} else {
			toastr.warning("Not enough rights");
		}
	};
	
	this.discardChanges = function () {
		ctrl.oddsKeys = JSON.parse(JSON.stringify(ctrl.oddsKeys_backup));
	};
	
	this.copyFrom = function () {
		require.ensure([], function () {
			ctrl.modal.copyConfiguration.ctrl = require('./copyConfiguration/copyConfigurationCtrl');
		}).then(function () {
			ngDialog.openConfirm({
				template  : ctrl.modal.copyConfiguration.temp,
				controller: ctrl.modal.copyConfiguration.ctrl,
				width     : '90%',
				resolve   : {
					current: function () {
						return {
							liveType    : ctrl.currentLiveType,
							isActive    : ctrl.filters.isActive,
							distTemplate: ctrl.filters.distTemplate
						};
					},
					rights : function () {
						return {
							viewAnotherTemplates: ctrl.rights.viewTemplates
						}
					}
				}
			}).then(function (copyData) {
				var req = {
					IsLive                      : ctrl.filters.isLive.value,
					DistributeTemplateId        : ctrl.filters.distTemplate,
					SportId                     : ctrl.currentSportID,
					LeagueId                    : ctrl.currentLeagueID,
					EventId                     : ctrl.currentEventID,
					DistributeTemplateIdCopyFrom: copyData.copyFrom.template,
					SportIdCopyFrom             : copyData.copyFrom.sport,
					LeagueIdCopyFrom            : copyData.copyFrom.league,
					EventIdCopyFrom             : copyData.copyFrom.event,
					OddsKeyDif                  : copyData.dif.oddsKey,
					MultDif                     : copyData.dif.mult,
					MinimumOfferDif             : copyData.dif.minOffer,
					MaximumCapDif               : copyData.dif.maxCap
				};
				
				ok.copy(req).then(function () {
					ctrl.getOddsKeys();
				});
			});
		});
	};
	
	this.changeIncluding = function (value) {
		var len = ctrl.oddsKeys.length;
		for (var i = len - 1; i >= 0; i--) {
			ctrl.oddsKeys[ i ].IsOn = value;
			if (ctrl.oddsKeys_backup[ i ].IsOn !== value)
				ctrl.oddsKeys[ i ].changed = true;
			else
				ctrl.oddsKeys[ i ].changed = false;
		}
	};
	
}

module.exports = {
	template    : require('./configuration.oddskeys.html'),
	controller  : Configuration_OddsKeys,
	controllerAs: 'vm'
};
