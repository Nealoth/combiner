module.exports = function (itemsToCombine, toastr, ngDialog, filters, eventsResource, $scope) {
	'use strict';
	var _this           = this;
	var e               = eventsResource;
	this.itemsToCombine = itemsToCombine;
	this.itemsCount     = Object.keys(itemsToCombine).length;
	this.associateWith  = null;

	this.modal = {
	  ctrl: null,
    temp: require('./eventCombineWithEventTemp.html')
  };
	
	this.validateItems = function () {
		'use strict';
		return new Promise(function (resolve, reject) {
			var uniqueSports  = {};
			var uniqueSources = {
				sources: {},
				valid  : true
			};
			_this.itemsToCombine.forEach(function (event, i) {
				if(!event.SportID) reject('Possible unassociated sport - ' + _this.itemsToCombine[i].SportName);
				
				uniqueSports[ event.SportID ] = event.EventName;
			});
			_this.itemsToCombine.forEach(function (event) {
				return uniqueSources[ event.SourceName ] ? uniqueSources.valid = false : uniqueSources[ event.SourceName ] = true;
			});
			if (Object.keys(uniqueSports).length > 1) {
				reject('Cannot combine events by few kinds of sport');
			}
			if (!uniqueSources.valid) {
				reject('Cannot combine events from the same source');
			}
			
			resolve(itemsToCombine[ 0 ].SportID);
		})
	};
	
	this.goToPrematch = function () {
		_this.validateItems().then(function (sportId) {
		  require.ensure([], function () {
        _this.modal.ctrl = require('./eventCombineWithEventCtrl')
      }).then(function () {
        ngDialog.openConfirm({
          template    : _this.modal.temp,
          controller  : _this.modal.ctrl,
          resolve     : {
            filters       : function () {
              return {
                beginDate: filters.beginDate,
                endDate  : filters.endDate,
                sportId  : sportId
              }
            },
            itemsToCombine: function () {
              return _this.itemsToCombine
            }
          },
          width       : '900px'
        }).then(function (event) {
          _this.associateWith = event;
        })
      })
		}).catch(function (message) {
			toastr.warning(message);
		})
	};
	
	this.combine = function () {
		this.exEventsIDs = _this.itemsToCombine.map(function (item) {
			return item.ID;
		}).join('|');
		this.systemEventID = _this.associateWith.ID;
		
		e.live.combine(this.systemEventID, this.exEventsIDs).then(function () {
			$scope.confirm(true);
		})
	};
	
	this.uncombine = function () {
		console.log(_this.itemsToCombine[0]);
		e.live.uncombine(_this.itemsToCombine[0].ID).then(function () {
			$scope.confirm(true);
		})
	};
	
	this.deleteItem = function (index) {
		_this.itemsToCombine.splice(index, 1);
	};
};
