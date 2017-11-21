module.exports = function (data, betTypesResource, $scope, confirmationWindow) {
	var ctrl                  = this;
	var bt                    = betTypesResource;
	this.betType              = data.betType;
	this.currentSource        = data.currentSource;
	this.currentSport         = data.currentSport;
	this.currentSystemBettype = null;
	this.liveOdds             = null;
	this.systemBetTypes       = null;
	this.systemOddTypes       = {
		options: null,
		value  : []
	};
	this.specialBetValues     = {
		options: null,
		value  : null
	};
	
	this.initModule = function () {
		bt.prematch.getOdds(ctrl.betType.Id).then(function (odds) {
			ctrl.liveOdds = odds;
		});
		
		bt.get(ctrl.currentSport).then(function (systemBetTypes) {
			ctrl.systemBetTypes = systemBetTypes
		});
	};
	
	this.loadOddTypes = function (betType) {
		bt.getOdds(betType.Id).then(function (systemOdds) {
			ctrl.systemOddTypes.options    = systemOdds;
			ctrl.betType.SystemBetTypeName = betType.Name;
			ctrl.currentSystemBettype      = betType;
		});
		
		bt.live.getSpecialBetValue(betType.Id).then(function (specialBetValues) {
			ctrl.specialBetValues.options = specialBetValues;
			if(ctrl.betType.SpecialBetValue){
				ctrl.specialBetValues.options.forEach(function (item, i) {
					if (item === ctrl.betType.SpecialBetValue){
						ctrl.specialBetValues.value = ctrl.specialBetValues.options[i];
					}
				})
			}
		});
	};
	
	this.saveChanges = function () {
		bt.prematch.associate(ctrl.betType.Id, ctrl.currentSystemBettype.Id, ctrl.specialBetValues.value).then(function () {
			ctrl.liveOdds.forEach(function (liveOddType, i) {
				bt.prematch.associateOdd(liveOddType.ID, ctrl.systemOddTypes.value[ i ].Id);
			});
			
			setTimeout(function () {
        $scope.confirm(true);
      }, 500);
		})
	};
	
	this.removeAssociation = function () {
		bt.prematch.associate(ctrl.betType.Id, null).then(function () {
			ctrl.liveOdds.forEach(function (liveOddType) {
				bt.prematch.associateOdd(liveOddType.ID, null);
			});
			
			setTimeout(function () {
        $scope.confirm(true);
      }, 500);
		})
	};
	
	this.deleteOdd = function (id) {
		confirmationWindow.open('Are You sure want to delete this Odd?').then(function () {
			bt.live.deleteOdd(id).then(function () {
				bt.getLiveOdds(ctrl.betType.Id).then(function (odds) {
					ctrl.liveOdds = odds;
				});
			});
		});
	};
	
	this.updateMult = function () {
    bt.prematch.updateMultiplier({ExBetTypeID: ctrl.betType.Id, IsMult: Number(ctrl.betType.IsMult)});
  };
	
	setTimeout(function () {
		ctrl.initModule();
		componentHandler.upgradeAllRegistered();
	}, 300)
};
