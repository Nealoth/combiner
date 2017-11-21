function Logs_ServiceLogs (logsResource) {
	var l = logsResource;
	var _this = this;
	this.count = 100;
	this.instance = '';
	this.logsTable = [];
	
	this.refreshTable = function () {
		l.service.get(_this.instance, _this.count).then(function (logs) {
		  
		  var l = logs.length - 1;
		  for(var i = l; i >= 0; i--){
		    logs[i].TraceType = _this.parseTraceType(logs[i].TraceType);
      }
      
      _this.logsTable = logs;
		})
	};
	
	this.parseTraceType = function (traceType) {
		switch (traceType){
			case 0: return 'Critical Error'; break;
			case 1: return 'Debug Info'; break;
			case 2: return 'General Info'; break;
			case 3: return 'Warning'; break;
			default: return 'Unresolved Trace Type'; break;
		}
	}
	
}

module.exports = {
	template    : require('./logs.servicelogs.html'),
	controller  : Logs_ServiceLogs,
	controllerAs: 'vm'
};
