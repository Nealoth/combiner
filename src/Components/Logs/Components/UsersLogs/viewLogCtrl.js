module.exports = function (log) {
  'use strict';
  var _this = this;
  
  this.query = {};
  
  if (log.QueryText) {
    _this.query = JSON.parse(log.QueryText)
  } else {
    _this.query = log.Link.split('?').length > 1 ?
      JSON.parse('{"' + decodeURI(log.Link.split('?')[ 1 ].replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}') :
      "In this query there are no parameters"
  }
  
};
