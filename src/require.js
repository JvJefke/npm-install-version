const path = require("path");
const { sanitize } = require('./util.js');

function _require (npmPackage) {
  return require(path.join(process.cwd(), "niv_modules", sanitize(npmPackage)));
}

module.exports = _require;
