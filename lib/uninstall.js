'use strict';

var shelljs = require('shelljs');
var path = require("path");

var _require = require('./util.js'),
    sanitize = _require.sanitize;

var MODULES_DIRECTORY = path.join(process.cwd(), "/niv_modules");

module.exports = function (npmPackage) {
  shelljs.rm("-rf", path.join(MODULES_DIRECTORY, sanitize(npmPackage)));
};
//# sourceMappingURL=uninstall.js.map