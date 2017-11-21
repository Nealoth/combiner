require('./Components');

function Translations () {}

module.exports = {
  template    : require('./translations.html'),
  controller  : Translations,
  controllerAs: 'vm'
};

