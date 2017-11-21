var instance = null;

function TotalRoutes () {
	var _this = this;
	
	if (!instance) {
		_this.states    = {};
		_this.moduleIDs = [];
		instance        = _this;
	}
	
	return instance;
}

function addModuleID (_this, module) {
	if (_this.moduleIDs[ module.routeConfig.moduleID ])
		_this.moduleIDs[ module.routeConfig.moduleID ].unique = false;
	else
		_this.moduleIDs[ module.routeConfig.moduleID ] = {state: module.state, unique: true, IDs: []};
}

function addState (_this, module) {
	_this.states[ module.state ] = module.routeConfig;
}

TotalRoutes.prototype.push = function (module) {
	addModuleID(this, module);
	addState(this, module);
};

module.exports = TotalRoutes;
