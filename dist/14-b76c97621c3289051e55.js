webpackJsonp([14],{507:function(module,exports){module.exports=function($scope,$rootScope,league,currentSport,leaguesResource){var ctrl=this,l=leaguesResource;this.buttonText=league?"Save changes":"Create league",this.isManage=!!league,this.sport=null,this.category=null,this.name=null,this.code=null,this.countryCode=null,this.numberOfTeams=null,this.tableId=null,this.leagueSeasonType=null,this.leagueGroupId=null,this.continentId=null,this.stageType=null,this.currentSport=currentSport,this.currentCategoryID=league?league.CategoryID:null,league&&(ctrl.name=league.Name,ctrl.code=league.Code,ctrl.countryCode=league.CategoryID,ctrl.numberOfTeams=league.NumberOfTeams,ctrl.tableId=league.TableID,ctrl.leagueSeasonType=league.LeagueSeasonType,ctrl.leagueGroupId=league.leagueGroupID,ctrl.continentId=league.ContinentID,ctrl.stageType=league.StageType),this.createLeague=function(){l.create(ctrl.sport,ctrl.name,ctrl.code,ctrl.category,null,null,null,null,null,null,null,null,null,null)},this.updateLeague=function(){l.update(league.ID,ctrl.sport,ctrl.name,ctrl.code,ctrl.category,league.ServiceIDMain,league.NumberOfTeams,league.PresentationID,league.TableID,league.LeagueSeasonType,league.LeagueGroupID,league.ContinentID,league.LeagueTemplateID,league.ServiceUniqueIDMain,league.StageType)},this.deleteLeague=function(){l["delete"](league.ID),$scope.confirm(!0)},this.submit=function(){league?ctrl.updateLeague():ctrl.createLeague(),$scope.confirm(!0)}}}});