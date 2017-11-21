/**
 * Constructor of storage class.
 * @constructor
 */
function Cache (params) {
  'use strict';
  var date         = new Date();
  this.cacheName   = params.cacheName;
  //console.log(date);
  this.cachedItems = {};
}

/**
 * Add item structure in cache storage.
 * @param name - Name of stored item.
 * @param updateFunction - Function for updating data in stored item (MUST RETURN PROMISE).
 */
Cache.prototype.add = function (name, updateFunction) {
  var _this = this;
  
  if (!name || !updateFunction) {
    console.error('One or more arguments are missing', arguments);
    throw new ReferenceError();
  }
  if (typeof name !== "string") {
    console.error('Name must be a string', arguments);
    throw new TypeError();
  }
  if (typeof updateFunction !== "function") {
    console.error('Update function must be a function', arguments);
    throw new TypeError();
  }
  
  /**
   * Adding initial structure of cached item.
   * @type {{cached: null, update: *}}
   */
  this.cachedItems[ name ] = {
    cached        : null,
    cachedAccessor: null,
    update        : updateFunction,
    set cached (newValue) {
      this.cachedAccessor = newValue;
      if (newValue) _this.updateLocalStorage();
    },
    get cached () {
      return this.cachedAccessor;
    }
  };
  
  return this;
};

/**
 * Get item from cache
 * @param name - name of cached item.
 */
Cache.prototype.getItem = function (name) {
  'use strict';
  var _this = this;
  if (typeof name !== "string") {
    console.error('Invalid argument. Must be a string', arguments);
    throw new TypeError();
  }
  if (this.cachedItems[ name ]) {
    return new Promise(function (resolve) {
      if (_this.cachedItems[ name ].cached) {
        resolve(_this.cachedItems[ name ].cached);
      } else {
        _this.cachedItems[ name ].update().then(function (items) {
          _this.cachedItems[ name ].cached = items;
          resolve(_this.cachedItems[ name ].cached);
        })
      }
    });
  } else {
    console.error('Requested item (' + name + ') is not in cache', this.cachedItems);
    throw new ReferenceError();
  }
};

/**
 * Force updates item in cache.
 * @param name - name of cached item.
 * @returns {Promise}
 */
Cache.prototype.updateItem = function (name) {
  var _this = this;
  if (typeof name !== "string") {
    console.error('Invalid argument. Must be a string', arguments);
    throw new TypeError();
  }
  if (this.cachedItems[ name ]) {
    return new Promise(function (resolve) {
      _this.cachedItems[ name ].update().then(function (items) {
        _this.cachedItems[ name ].cached = items;
        resolve(_this.cachedItems[ name ].cached);
      })
    });
  } else {
    console.error('Requested item (' + name + ') is not in cache', this.cachedItems);
    throw new ReferenceError();
  }
};

/**
 * Return all objects in cache.
 * @param withServiceFields - if true returns fields like accessors and __proto__.
 * @returns {Array}
 */
Cache.prototype.getAll = function (withServiceFields) {
  'use strict';
  var _this  = this;
  var result = {};
  for (var key in this.cachedItems) {
    result[ key ] = withServiceFields ?
      _this.cachedItems[ key ] :
      _this.cachedItems[ key ].cached
  }
  return result;
};

/**
 * Updates local storage on SET of 'cached' field.
 */
Cache.prototype.updateLocalStorage = function () {
  //window.localStorage.setItem(this.cacheName, JSON.stringify(this.getAll()));
};

module.exports = Cache;
