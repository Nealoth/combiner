module.exports = function (serviceID, cacheSvc) {
  'use strict';
  var _this     = this;
  this.services = null;
  
  cacheSvc.get("sources").then(function (services) {
    _this.services = JSON.parse(JSON.stringify(services));
    
    _this.services.forEach(function (item, i) {
      _this.changeName(item);
      
      if (item.Id === serviceID) item.Name += " (Selected)";
    });
  });
  
  _this.changeName = function (service) {
    switch (service.Name){
      case 'BR':
        service.Name = 'Radar';
        break;
      case 'B':
        service.Name = 'Bet365';
        break;
      case 'BW':
        service.Name = 'BWin';
        break;
      default:
        service.Name = '- ' + service.Name + ' -';
        break;
    }
  };
};
