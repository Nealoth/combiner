var aesjs = require('aes-js');

angular.module('app')
       .service('Encryption', function (CONFIG) {
         var conf = CONFIG.encryption;
         var k = [];
         for (var i = 0; i < conf.b; i++) {
           k.push(Math.ceil((i ^ conf.k) * conf.c / conf.k * i) / i ^ conf.k);
         }
         
         this.encrypt = function (text) {
           var textBytes      = aesjs.utils.utf8.toBytes(text);
           var aesCtr         = new aesjs.ModeOfOperation.ctr(k, new aesjs.Counter(conf.c));
           var encryptedBytes = aesCtr.encrypt(textBytes);
    
           return aesjs.utils.hex.fromBytes(encryptedBytes);
         };
  
         this.decrypt = function (encryptedHex) {
           var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
           var aesCtr         = new aesjs.ModeOfOperation.ctr(k, new aesjs.Counter(conf.c));
           var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    
           return aesjs.utils.utf8.fromBytes(decryptedBytes);
         }
  
  
       });
