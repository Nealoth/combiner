angular.module('app')
       .service('apiHelper', function () {
  
         this.format = Object.create(null);
  
         this.format.dateTime = function (date, time) {
           return moment(date).format('YYYY-MM-DD') + 'T' + moment(time).format('HH:mm');
         }
         
       });


