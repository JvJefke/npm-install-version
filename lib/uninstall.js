'use strict';

var shelljs = require('shelljs');
var path = require("path");

var _require = require('./util.js'),
    sanitize = _require.sanitize;

var MODULES_DIRECTORY = path.join(process.cwd(), "/niv_modules");

module.exports = function (npmPackage) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$quiet = options.quiet,
      quiet = _options$quiet === undefined ? false : _options$quiet;


  shelljs.rm("-rf", path.join(MODULES_DIRECTORY, sanitize(npmPackage)));

  if (shelljs.error() && !quiet) {
    throw Error("Package not found!");
  }
};
//# sourceMappingURL=uninstall.js.map