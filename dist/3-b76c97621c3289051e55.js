webpackJsonp([3],{509:function(module,exports,__webpack_require__){module.exports=function(score,cacheSvc,scoresResource,ngDialog,$scope){"use strict";var _this=this,s=scoresResource;this.buttonText=score?"Save":"Create",this.isManage=!!score,this.name=score?score.Name:null,this.ordering=score?score.Ordering:null,this.period=score?score.PeriodNumber:null,this.code=score?score.Code:null,this.isCalc=!!score&&score.IsCalc,this.sports=null,this.kinds={options:[],model:null},this.types={options:[],model:null},this.modal={ctrl:null,temp:__webpack_require__(524)},cacheSvc.get("scoreKinds").then(function(kinds){_this.kinds.options=kinds,score?_this.kinds.options.forEach(function(kind,i){kind.Id===score.ScoreKindId&&(_this.kinds.model=_this.kinds.options[i])}):_this.kinds.model=_this.kinds.options[0]}),cacheSvc.get("scoreTypes").then(function(types){_this.types.options=types,score?_this.types.options.forEach(function(type,i){type.Id===score.ScoreTypeId&&(_this.types.model=_this.types.options[i])}):_this.types.model=_this.types.options[0]}),this.getSports=function(need){_this.sports&&!need||s.system.getSports(score.Id).then(function(scoreGroupSports){_this.sports=scoreGroupSports})},this.removeSport=function(sport){s.system.removeSport(sport.ID).then(function(){_this.getSports(!0)})},this.addSport=function(){__webpack_require__.e(29)["catch"](function(err){__webpack_require__.oe(err)}).then(function(){_this.modal.ctrl=__webpack_require__(529)}.bind(null,__webpack_require__)).then(function(){ngDialog.openConfirm({template:_this.modal.temp,controller:_this.modal.ctrl}).then(function(sportID){sportID&&s.system.addSport(sportID,score.Id).then(function(){_this.getSports(!0)})})})},this.submit=function(){_this.isManage?s.system.update(score.Id,_this.name,_this.types.model.Id,_this.ordering,_this.kinds.model.Id,_this.period,_this.code,_this.isCalc).then(function(){$scope.confirm(!0)}):s.system.insert(_this.name,_this.types.model.Id,_this.ordering,_this.kinds.model.Id,_this.period,_this.code,_this.isCalc).then(function(){$scope.confirm(!0)})},setTimeout(function(){componentHandler.upgradeAllRegistered()},100)}},524:function(module,exports){module.exports='<modal-wrapper>\r\n  <br>\r\n  <input-default model="vm.search" label="Search"></input-default>\r\n  <div class="max__height-300 overflow-auto">\r\n    <table class="material__table-small">\r\n      <thead>\r\n      <tr>\r\n        <th>ID</th>\r\n        <th>Name</th>\r\n      </tr>\r\n      </thead>\r\n      <tbody>\r\n      <tr class="hover"\r\n          ng-click="confirm(sport.ID)"\r\n          ng-repeat="sport in vm.sports | filter: vm.search track by $index">\r\n        <td ng-bind="sport.ID"></td>\r\n        <td ng-bind="sport.Name"></td>\r\n      </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</modal-wrapper>\r\n'}});