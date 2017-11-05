'use strict';

var childProcess = require('child_process');
var path = require('path');
var fse = require("fs-extra");

var util = require('./util.js');

var CWD = process.cwd();
var TEMP = path.join(CWD, 'niv_modules', '.npm-install-version-temp' + Math.random());

function install(npmPackage) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$destination = options.destination,
      destination = _options$destination === undefined ? util.sanitize(npmPackage) : _options$destination,
      _options$overwrite = options.overwrite,
      overwrite = _options$overwrite === undefined ? false : _options$overwrite,
      _options$quiet = options.quiet,
      quiet = _options$quiet === undefined ? false : _options$quiet;


  var log = quiet ? function () {} : function () {
    var _console;

    return (_console = console).log.apply(_console, arguments);
  };

  if (!npmPackage) util.error();
  var destinationPath = path.join(CWD, 'niv_modules', destination);
  if (!overwrite && util.directoryExists(destinationPath)) {
    return log('Directory at ' + destinationPath + ' already exists, skipping');
  }

  // get real package name
  var packageName = util.getPackageName(npmPackage);

  return fse.remove(TEMP)
  // make temp install dir
  .then(function () {
    return fse.mkdirs(path.join(TEMP, 'node_modules'));
  })

  // copy local .npmrc file if exists
  .then(function () {
    return fse.pathExists(path.join(CWD, '.npmrc'));
  }).then(function (npmrcExists) {
    if (npmrcExists) {
      return fse.copy(path.join(CWD, '.npmrc'), path.join(TEMP, ".npmrc"));
    }
  })

  // install package to temp dir
  .then(function () {
    var installOptions = {
      cwd: TEMP,
      stdio: [null, null, null]
    };
    var command = process.platform === 'win32' ? 'npm.cmd' : 'npm';

    return new Promise(function (resolve, reject) {
      var ps = childProcess.exec([command, 'install', npmPackage].join(" "), installOptions);

      ps.stdout.on("data", function (data) {
        return log(data);
      });
      ps.stderr.on("data", function (data) {
        return log(data);
      });
      ps.on("close", function (code) {
        if (code !== 0) {
          return reject('npm install process exited with code ' + code);
        }
        resolve();
      });
    });
  })

  // move deps inside package
  .then(function () {
    return fse.mkdirs(path.join(TEMP, 'node_modules', packageName, 'node_modules'));
  }).then(function () {
    var from = path.join(TEMP, 'node_modules');
    var to = path.join(TEMP, 'node_modules', packageName, 'node_modules');
    var filterRegex = new RegExp("^" + path.join(TEMP, 'node_modules', packageName));
    var filter = function filter(src, dest) {
      return !src.match(filterRegex);
    };

    return fse.copy(from, to, { filter: filter });
  })

  // copy to niv_modules/
  .then(function () {
    return fse.remove(destinationPath);
  }).then(function () {
    return fse.move(path.join(TEMP, 'node_modules', packageName), destinationPath);
  })

  // cleanup
  .then(function () {
    return fse.remove(TEMP);
  }).then(function () {
    return log('Installed ' + npmPackage + ' to ' + destinationPath);
  }, function (error) {
    console.error('Error installing ' + npmPackage);
    console.error(error.toString());

    throw Error('Error installing ' + npmPackage);
  });
}

module.exports = install;
//# sourceMappingURL=install.js.map