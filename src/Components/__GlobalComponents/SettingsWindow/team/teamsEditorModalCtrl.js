module.exports = function ($scope, params, teamsResource, ngDialog, confirmationWindow, cacheSvc) {
	var _this          = this;
	var t              = teamsResource;
	this.currentTeam   = null;
	this.buttonText    = params ? 'Save changes' : 'Create team';
	this.isManage      = !!params;
	this.teamTypeToAdd = null;
	this.teamTypes     = [];
	this.teamLeagues   = [];
	this.currentLeague = null;
	
	this.filters = {
		sport   : {
			options: [],
			model  : null
		},
		category: {
			options : [],
			_options: [],
			model   : null
		}
	};
	
	cacheSvc.get("systemSports").then(function (sports) {
		_this.filters.sport.options = sports;
	}).then(function () {
		cacheSvc.get("categories").then(function (categories) {
			_this.filters.category._options = categories;
		}).then(function () {
			_this.initialize();
		});
	});
	
	this.filtrateCategories = function () {
		_this.filters.category.options = _this.filters.category._options.filter(function (item) {
			return item.SportID === _this.filters.sport.model;
		});
		_this.filters.category.model   = params ?
			_this.currentTeam.SportID === _this.filters.sport.model ?
				_this.currentTeam.CountryCode : _this.filters.category.options[ 0 ].Code : _this.filters.category.options[ 0 ].Code;
	};
	
	this.initialize = function () {
		if (params)
			if (typeof params === "object") {
				_this.currentTeam         = params;
				_this.name                = params.Name;
				_this.description         = params.Description;
				_this.ordering            = params.Ordering;
				_this.currentCountryCode  = params.CountryCode;
				_this.filters.sport.model = _this.currentTeam.SportID;
				_this.currentSport        = _this.currentTeam.SportID;
				_this.filtrateCategories();
				_this.filters.category.model = _this.currentTeam.CountryCode;
			} else if (typeof params === "number") {
				t.system.info([ params ]).then(function (teamInfo) {
					_this.currentTeam         = teamInfo[ 0 ];
					_this.name                = _this.currentTeam.Name;
					_this.description         = _this.currentTeam.Description;
					_this.ordering            = _this.currentTeam.Ordering;
					_this.currentCountryCode  = _this.currentTeam.CountryCode;
					_this.currentSport        = _this.currentTeam.SportID;
					_this.filters.sport.model = _this.currentTeam.SportID;
					_this.filtrateCategories();
					_this.filters.category.model = _this.currentTeam.CountryCode;
				})
			} else {
				console.error("SystemSettingsWindow: Unsupported params type, must be object or number!");
				$scope.confirm();
			}
		else {
			_this.name                = null;
			_this.description         = null;
			_this.ordering            = null;
			_this.currentCountryCode  = null;
			_this.currentSport        = null;
			_this.filters.sport.model = _this.filters.sport.options[ 0 ].ID;
			_this.filtrateCategories();
		}
	};
	
	this.submit = function () {
		if (_this.isManage)
			_this.updateTeam();
		else
			_this.createTeam();
	};
	
	this.createTeam = function () {
		var country = _this.country ? _this.country.Code : null;
		t.system.insert(
			_this.filters.sport.model,
			_this.name,
			country,
			null,
			_this.description
		);
	};
	
	this.updateTeam = function () {
		var country = _this.country ? _this.country.Code : null;
		t.system.update(
			_this.currentTeam.ID,
			_this.filters.sport.model,
			_this.name,
			country,
			_this.currentTeam.TeamIDParent,
			_this.description
		);
	};
	
	this.deleteTeam = function () {
		t.system.delete(_this.currentTeam.ID);
	};
	
	this.initChildsModule = function () {
		require.ensure([], function () {
			require('./ChildTeam/teamsEditorModal_Childs')(_this, teamsResource, _this.currentTeam, ngDialog, confirmationWindow);
		})
	};
	
	this.initTeamTypesModule = function () {
		t.system.getTeamTypes({ID: _this.currentTeam.ID}).then(function (teamTypes) {
			_this.teamTypes = teamTypes;
		});
	};
	
	this.modifyTeamTypes = function (teamTypeToRemove) {
		var method = teamTypeToRemove ? 'deleteTeamType' : 'addTeamType';
		
		var req = {
			TeamID    : _this.currentTeam.ID,
			TeamTypeID: _this.teamTypeToAdd,
			removeID  : teamTypeToRemove || null
		};
		
		t.system[ method ](req).then(function () {
			_this.initTeamTypesModule();
		});
	};
	
	this.initTeamLeaguesModule = function (isRefresh) {
		if (!_this.teamLeagues.length || isRefresh)
			t.system.getLeagues({ID: _this.currentTeam.ID}).then(function (leagues) {
				if (leagues) _this.teamLeagues = leagues;
			});
	};
	
	this.addLeague = function () {
		if (_this.currentLeague)
			t.system.addLeague({TeamID: _this.currentTeam.ID, LeagueID: _this.currentLeague.ID}).then(function () {
				_this.initTeamLeaguesModule(true);
			})
	};
	
	this.deleteLeague = function (ID) {
		t.system.deleteLeague({ID: ID}).then(function () {
			_this.initTeamLeaguesModule(true);
		})
	};
};
