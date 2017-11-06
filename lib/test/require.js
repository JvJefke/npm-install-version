'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var test = require('tape');

var niv = require('../index.js');

var _require = require('./test-util.js'),
    clean = _require.clean;

test('niv.require normal', function (t) {
  clean();
  niv.install('csjs@1.0.0').then(function () {
    var csjs = niv.require('csjs@1.0.0');
    t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
    t.end();
  }, function (err) {
    return t.end(err);
  });
});

test('niv.require remote', function (t) {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance').then(function () {
    var csjs = niv.require('scott113341/csjs#extract-extends-performance');
    t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
    t.end();
  }, function (err) {
    return t.end(err);
  });
});

test('niv.require scoped', function (t) {
  clean();
  niv.install('@scott113341/niv-scoped-test@1.0.0').then(function () {
    var pkg = niv.require('@scott113341/niv-scoped-test@1.0.0');
    t.assert(_typeof(pkg.addNumbers), 'function');
    t.end();
  }, function (err) {
    return t.end(err);
  });
});

test('niv.require w/ destination', function (t) {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance', { destination: 'csjs@yolo' }).then(function () {
    var csjs = niv.require('csjs@yolo');
    t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
    t.end();
  }, function (err) {
    return t.end(err);
  });
});

test('niv.require path', function (t) {
  clean();
  niv.install('@scott113341/niv-scoped-test@1.0.0').then(function () {
    var packageJson = niv.require('@scott113341/niv-scoped-test@1.0.0', "package.json");
    t.assert(packageJson.name = '@scott113341/niv-scoped-test');
    t.end();
  }, function (err) {
    return t.end(err);
  });
});
//# sourceMappingURL=require.js.map