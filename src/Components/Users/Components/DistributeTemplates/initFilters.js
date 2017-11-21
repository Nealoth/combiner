module.exports = function (_this, cacheSvc, distTemplate) {
  'use strict';
  
  cacheSvc.get('clients').then(function (clients) {
    _this.client.options = clients;
    if (distTemplate)
      _this.client.options.forEach(function (option, i) {
        if (option.ID === distTemplate.Us_ClientID) _this.client.model = _this.client.options[ i ];
      })
  });
  
  cacheSvc.get('sources').then(function (sources) {
    _this.service.options = sources;
    if (distTemplate)
      _this.service.options.forEach(function (item, i) {
        if (item.Id === distTemplate.ServiceID)
          _this.service.model = _this.service.options[ i ];
      });
    else
      _this.service.model = _this.service.options[ 0 ];
  });
  
  cacheSvc.get('distTemplates').then(function (templates) {
    _this.copyFrom.options = templates;
  });
  
};
