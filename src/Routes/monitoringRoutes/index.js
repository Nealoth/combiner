module.exports = {
  system  : {
    live    : require('./system.live'),
    prematch: require('./system.prematch')
  },
  external: {
    live     : require('./external.live'),
    prematch : require('./external.prematch'),
    outrights: {
      prematch: require('./external.prematch.outrights')
    }
  }
};
