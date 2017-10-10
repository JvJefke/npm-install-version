"use strict";

var path = require("path");

var _require2 = require('./util.js'),
    sanitize = _require2.sanitize;

function _require(npmPackage) {
  var customPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  return require(path.join(process.cwd(), "niv_modules", sanitize(npmPackage), customPath));
}

module.exports = _require;
//# sourceMappingURL=require.js.map