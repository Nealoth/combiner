function Logs_CrawlerLogs (eventsResource, apiHelper, logsResource, toastr, othersResource) {
	'use strict';
	var _this  = this;
	this.table = [];
	var e      = eventsResource;
	var l      = logsResource;
	var o      = othersResource;
	
	this.filters = {
		event  : {
			options       : null,
			model         : null,
			optionTemplate: "'[' + option.PEventID + '] / ' + option.EventDate + ' / ' + option.EventName",
			searchText    : ''
		},
		date   : {
			start: moment().subtract(1, 'days').format(),
			end  : moment().format()
		},
		time   : {
			start: moment().format(),
			end  : moment().endOf('day').format()
		},
		xmlType: {
			options : [],
			model   : null,
			sourceID: null,
			isLive  : null
		},
		source : null,
		isLive : null
	};
	
	this.modal = {
		temp: require('./modalTemp.html'),
		ctrl: null
	};
	
	this.loadXMLTypes = function () {
		if (_this.filters.source) {
			if (_this.filters.source.Id !== _this.filters.xmlType.sourceID
				|| _this.filters.isLive.value !== _this.filters.xmlType.isLive) {
				
				var req = {
					serviceID: _this.filters.source.Id,
					isLive   : !!_this.filters.isLive.value
				};
				
				o.getXMLtypes(req).then(function (types) {
					_this.filters.xmlType.options  = types;
					_this.filters.xmlType.sourceID = _this.filters.source.Id;
					_this.filters.xmlType.isLive   = _this.filters.isLive.value;
					_this.filters.xmlType.options.unshift({
						ID      : null,
						TypeName: "All types"
					});
					_this.filters.xmlType.model = _this.filters.xmlType.options[0];
				});
			}
		} else
			setTimeout(function () {
				_this.loadXMLTypes();
			}, 500);
	};
	this.loadXMLTypes();
	
	this.loadEvents = function () {
		if (_this.filters.event.searchText.length >= 3)
			e.live.searchExEvent({
				 serviceID      : 1,
				 searchCondition: _this.filters.event.searchText
			 })
			 .then(function (events) {
				 _this.filters.event.options = events;
			 });
	};
	
	this.refresh = function () {
		var req = {
			eventID   : _this.filters.event.model ? _this.filters.event.model.PEventID : null,
			typeName  : _this.filters.xmlType.model.ID ? _this.filters.xmlType.model.TypeName : null,
			dateBegin : apiHelper.format.dateTime(_this.filters.date.start, _this.filters.time.start),
			dateEnd   : apiHelper.format.dateTime(_this.filters.date.end, _this.filters.time.end),
			pageNumber: _this.currentPage,
			rowCount  : _this.itemsPerPage,
			IsLive    : !!_this.filters.isLive.value,
			ServiceID : _this.filters.source.Id
		};
		
		l.crawler.get(req).then(function (logs) {
			_this.table = logs.Object;
			_this.count = logs.Count;
		});
	};
	
	this.viewLog = function (log) {
		var ua = navigator.userAgent;
		if (ua.search(/Firefox/) > -1)
			l.crawler.getXML({
				IDs: log.ID,
				isLive: !!_this.filters.isLive.value,
				serviceID: _this.filters.source.Id
			}).then(function (xml) {
				_this.xml    = '<?xml version="1.0"?>' + xml[ 0 ].XML;
				var myWindow = window.open('data:text/xml,' + encodeURIComponent(_this.xml), "", "_blank");
				myWindow.focus();
			});
		else
			toastr.warning("Use Firefox browser to comfortably  view XML logs");
	};
}

module.exports = {
	template    : require('./logs.crawlerLogs.html'),
	controller  : Logs_CrawlerLogs,
	controllerAs: 'vm'
};
