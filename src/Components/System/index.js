require('./Components');

function System () {}

module.exports = {
  template    : require('./system.html'),
  controller  : System,
  controllerAs: 'vm'
};

