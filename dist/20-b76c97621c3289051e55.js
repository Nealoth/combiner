webpackJsonp([20],{500:function(module,exports){module.exports=function(log){"use strict";var _this=this;this.query={},log.QueryText?_this.query=JSON.parse(log.QueryText):_this.query=log.Link.split("?").length>1?JSON.parse('{"'+decodeURI(log.Link.split("?")[1].replace(/&/g,'","').replace(/=/g,'":"'))+'"}'):"In this query there are no parameters"}}});