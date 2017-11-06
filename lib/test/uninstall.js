'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var test = require('tape');
var fs = require("fs");

var niv = require('../index.js');

var _require = require('./test-util.js'),
    clean = _require.clean,
    tryCatchOptimizer = _require.tryCatchOptimizer;

test('niv.uninstall normal', function (t) {
  clean();
  niv.install('csjs@1.0.0').then(function () {
    var csjs = niv.require('csjs@1.0.0');
    t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
    niv.uninstall('csjs@1.0.0');
    t.throws(fs.readFileSync.bind(undefined, 'niv_modules/csjs@yolo/package.json'), /ENOENT/, "Should throw ENOENT error.");
    t.end();
  }, function (err) {
    return t.end(err);
  });
});

test('niv.uninstall remote', function (t) {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance').then(function () {
    var csjs = niv.require('scott113341/csjs#extract-extends-performance');
    t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
    niv.uninstall('scott113341/csjs#extract-extends-performance');
    t.throws(fs.readFileSync.bind(undefined, 'scott113341/csjs#extract-extends-performance'), /ENOENT/, "Should throw ENOENT error.");
    t.end();
  }, function (err) {
    return t.end(err);
  });
});

test('niv.uninstall scoped', function (t) {
  clean();
  niv.install('@scott113341/niv-scoped-test@1.0.0').then(function () {
    var pkg = niv.require('@scott113341/niv-scoped-test@1.0.0');
    t.assert(_typeof(pkg.addNumbers), 'function');
    niv.uninstall('@scott113341/niv-scoped-test@1.0.0');
    t.throws(fs.readFileSync.bind(undefined, '@scott113341/niv-scoped-test@1.0.0'), /ENOENT/, "Should throw ENOENT error.");
    t.end();
  }, function (err) {
    return t.end(err);
  });
});

test('niv.uninstall w/ destination', function (t) {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance', { destination: 'csjs@yolo' }).then(function () {
    var csjs = niv.require('csjs@yolo');
    t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
    niv.uninstall('csjs@yolo');
    t.throws(fs.readFileSync.bind(undefined, 'csjs@yolo'), /ENOENT/, "Should throw ENOENT error.");
    t.end();
  }, function (err) {
    return t.end(err);
  });
});
//# sourceMappingURL=uninstall.js.map