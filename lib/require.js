"use strict";

var path = require("path");

var _require2 = require('./util.js'),
    sanitize = _require2.sanitize;

function _require(npmPackage) {
  return require(path.join(process.cwd(), "niv_modules", sanitize(npmPackage)));
}

module.exports = _require;
//# sourceMappingURL=require.js.map