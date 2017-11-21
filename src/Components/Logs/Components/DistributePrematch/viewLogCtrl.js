var Prism = require('prismjs');

module.exports = function (logsResource, log) {
  'use strict';
  var _this = this;
  var l     = logsResource;
  this.xml  = "";
  
  l.distPrematch.viewLog({logDistributeIds: log.ID}).then(function (xml) {
    _this.xml = xml[ 0 ].XML;
    document.querySelector('#logs__distPrematch-modalview').innerHTML = Prism.highlight(xml[ 0 ].XML, Prism.languages.xml);
  });
  
  this.copy = function () {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", _this.xml);
  }
};
