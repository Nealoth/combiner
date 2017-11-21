var Prism = require('prismjs');

module.exports = function (log, logsResource) {
	'use strict';
	var _this = this;
	var l = logsResource;
	
	this.xml = "";
	
	l.radar.live.getXML({IDs: log.ID}).then(function (xml) {
		_this.xml = '<?xml version="1.0"?>' + xml[ 0 ].XML;
		//document.querySelector('#logs__distPrematch-modalview').innerHTML = Prism.highlight(xml[ 0 ].XML, Prism.languages.xml);
		
		window.open('data:text/xml,' + encodeURIComponent(_this.xml), "asd");
		
	});
	
	this.copy = function () {
		window.prompt("Copy to clipboard: Ctrl+C, Enter", _this.xml);
	};
};