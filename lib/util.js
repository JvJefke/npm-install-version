'use strict';

var deasync = require('deasync');
var fs = require('fs');
var npm = require('npm');
var path = require('path');
var sanitizeFilename = require('sanitize-filename');

function directoryExists(destination) {
  try {
    fs.lstatSync(destination);
    return true;
  } catch (e) {
    return false;
  }
}

function error() {
  throw Error('You must specify an install target like this: csjs@1.0.0');
}

function getPackageName(packageName) {
  var load = deasync(npm.load);
  load({ loaded: false });

  var fetchPackageMetadata = deasync(require('npm/lib/fetch-package-metadata.js'));
  return fetchPackageMetadata(packageName, process.cwd()).name;
}

function getUsage() {
  var readme = path.join(__dirname, '..', 'README.md');
  var readmeText = String(fs.readFileSync(readme));
  return (/```usage\n([\s\S]*?)```/.exec(readmeText)[1]
  );
}

function sanitize(npmPackage) {
  return sanitizeFilename(npmPackage, { replacement: '-' });
}

function tryCatchOptimizer(fn, errorFn, finalFn) {
  var safeCallFunction = function safeCallFunction(fn) {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (typeof fn === "function") {
      fn.apply(undefined, params);
    }
  };

  try {
    safeCallFunction(fn);
  } catch (error) {
    safeCallFunction(errorFn);
  } finally {
    safeCallFunction(finalFn);
  }
}

module.exports = {
  directoryExists: directoryExists,
  error: error,
  getPackageName: getPackageName,
  getUsage: getUsage,
  sanitize: sanitize,
  tryCatchOptimizer: tryCatchOptimizer
};
//# sourceMappingURL=util.js.map