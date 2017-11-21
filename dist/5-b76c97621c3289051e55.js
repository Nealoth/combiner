webpackJsonp([5],{496:function(module,exports,__webpack_require__){module.exports=function(itemsToCombine,toastr,ngDialog,filters,eventsResource,$scope){"use strict";var _this=this,e=eventsResource;this.itemsToCombine=itemsToCombine,this.itemsCount=Object.keys(itemsToCombine).length,this.associateWith=null,this.modal={ctrl:null,temp:__webpack_require__(521)},this.validateItems=function(){return new Promise(function(resolve,reject){var uniqueSports={},uniqueSources={sources:{},valid:!0};_this.itemsToCombine.forEach(function(event,i){event.SportID||reject("Possible unassociated sport - "+_this.itemsToCombine[i].SportName),uniqueSports[event.SportID]=event.EventName}),_this.itemsToCombine.forEach(function(event){return uniqueSources[event.SourceName]?uniqueSources.valid=!1:uniqueSources[event.SourceName]=!0}),Object.keys(uniqueSports).length>1&&reject("Cannot combine events by few kinds of sport"),uniqueSources.valid||reject("Cannot combine events from the same source"),resolve(itemsToCombine[0].SportID)})},this.goToPrematch=function(){_this.validateItems().then(function(sportId){__webpack_require__.e(31)["catch"](function(err){__webpack_require__.oe(err)}).then(function(){_this.modal.ctrl=__webpack_require__(526)}.bind(null,__webpack_require__)).then(function(){ngDialog.openConfirm({template:_this.modal.temp,controller:_this.modal.ctrl,resolve:{filters:function(){return{beginDate:filters.beginDate,endDate:filters.endDate,sportId:sportId}},itemsToCombine:function(){return _this.itemsToCombine}},width:"900px"}).then(function(event){_this.associateWith=event})})})["catch"](function(message){toastr.warning(message)})},this.combine=function(){this.exEventsIDs=_this.itemsToCombine.map(function(item){return item.ID}).join("|"),this.systemEventID=_this.associateWith.ID,e.live.combine(this.systemEventID,this.exEventsIDs).then(function(){$scope.confirm(!0)})},this.uncombine=function(){console.log(_this.itemsToCombine[0]),e.live.uncombine(_this.itemsToCombine[0].ID).then(function(){$scope.confirm(!0)})},this.deleteItem=function(index){_this.itemsToCombine.splice(index,1)}}},521:function(module,exports){module.exports='<modal-wrapper>\r\n  <h5 class="text-center">\r\n    Associate with system event\r\n  </h5>\r\n  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\r\n    <strong class="text-upper text-primary">Home Team Name</strong>\r\n    <input class="mdl-textfield__input" type="text" ng-model="vm.searchBySystemEvent.TeamHomeName">\r\n    <label class="mdl-textfield__label"></label>\r\n  </div>\r\n\r\n  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\r\n    <strong class="text-upper text-primary">Guest Team Name</strong>\r\n    <input class="mdl-textfield__input" type="text" ng-model="vm.searchBySystemEvent.TeamGuestName">\r\n    <label class="mdl-textfield__label"></label>\r\n  </div>\r\n  <div class="overflow-auto max__height-500">\r\n    <table class="material__table-small">\r\n      <thead>\r\n      <tr>\r\n        <th>ID</th>\r\n        <th>League</th>\r\n        <th>Event</th>\r\n      </tr>\r\n      </thead>\r\n      <tbody>\r\n      <tr ng-repeat="systemEvent in vm.events | filter: vm.searchBySystemEvent track by $index"\r\n          ng-click="confirm(systemEvent)"\r\n          class="hover">\r\n        <td ng-bind="::systemEvent.ID"></td>\r\n        <td ng-bind="::systemEvent.LeagueName"></td>\r\n        <td ng-bind="::systemEvent.EventName"></td>\r\n      </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</modal-wrapper>\r\n'}});