//Больше не используется

angular.module('app')
       .service('dynamicCacheSvc', function () {
	       'use strict';
	       var store = new Store();
	
	       function Store () {}
	
	       Store.prototype.add = function (collectionParams) {
		       'use strict';
		       var _this = this;
		       if (_this[ collectionParams.collectionName ]) {
			       _this[ collectionParams.collectionName ][ collectionParams.params.join() ] = new Collection(collectionParams)
		       } else {
			       _this[ collectionParams.collectionName ]                                   = Object.create(null);
			       _this[ collectionParams.collectionName ][ collectionParams.params.join() ] = new Collection(collectionParams)
		       }
	       };
	
	       Store.prototype.checkCollection = function (collectionParams) {
		       var _this = this;
		       return new Promise(function (resolve) {
			       if (_this[ collectionParams.collectionName ]) {
				       if (_this[ collectionParams.collectionName ][ collectionParams.params.join() ]) {
					       resolve(_this[ collectionParams.collectionName ][ collectionParams.params.join() ]);
				       } else {
					       _this.add(collectionParams);
					       resolve(_this[ collectionParams.collectionName ][ collectionParams.params.join() ]);
				       }
			       } else {
				       _this.add(collectionParams);
				       resolve(_this[ collectionParams.collectionName ][ collectionParams.params.join() ]);
			       }
		       });
	       };
	
	       function Collection (collectionParams) {
		       this.method       = collectionParams.method;
		       this.params       = collectionParams.params;
		       this.updateBy     = collectionParams.updateBy;
		       this.collection   = null;
		       this.lastSyncDate = null;
		       this.lastUpdate   = null;
		       this.map          = null;
	       }
	
	       function Map () {
		       this.length = 0;
	       }
	
	       Collection.prototype.updateMap = function () {
		       'use strict';
		       var _this = this;
		       return new Promise(function (resolve) {
			       if (!_this.map) {
				       _this.map  = new Map();
				       var length = _this.collection.length;
				       for (var i = 0; i < length; i++) {
					       _this.map[ _this.collection[ i ][ _this.updateBy ] ] = i;
					       _this.map.length++;
				       }
			       } else {
				       _this.lastUpdate.forEach(function (lastUpdate) {
					       if (!_this.map[ lastUpdate[ _this.updateBy ] ]) {
						       _this.map[ lastUpdate[ _this.updateBy ] ] = _this.map.length + 1;
					       }
				       })
			       }
			       resolve();
		       });
	       };
	
	       Collection.prototype.updateCollection = function () {
		       var _this = this;
		       return new Promise(function (resolve) {
			       if (_this.lastUpdate) {
				       if (_this.lastUpdate.length) {
					       _this.lastUpdate.forEach(function (lastUpdate) {
						       _this.collection[ _this.map[ lastUpdate[ _this.updateBy ] ] ] = lastUpdate;
					       })
				       }
			       }
			       resolve();
		       })
	       };
	
	       Collection.prototype.update = function () {
		       var _this = this;
		       return new Promise(function (resolve) {
			       var params = _this.params.concat(_this.lastSyncDate);
			       _this.method.apply(null, params).then(function (collection) {
				       if (_this.collection) {
					       _this.lastUpdate = collection.Object;
				       } else {
					       _this.collection = collection.Object;
				       }
				       _this.lastSyncDate = collection.SyncDate;
				
				       _this.updateMap().then(function () {
					       _this.updateCollection().then(function () {
						       resolve(_this);
					       })
				       });
			       });
		       })
	       };
	
	       this.get = function (collectionParams) {
		       return new Promise(function (resolve) {
			       store.checkCollection(collectionParams)
			            .then(function (collection) {
				            collection.update().then(function (collection) {
					            resolve(collection.collection);
				            })
			            })
		       })
	       }
	
	
       });
