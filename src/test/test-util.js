const shelljs = require('shelljs');

function clean () {
  shelljs.rm('-rf', 'niv_modules/csjs*', 'niv_modules/@scott113341*', 'niv_modules/scott113341*', 'niv_modules/push-dir*');
}

module.exports = {
  clean
};
