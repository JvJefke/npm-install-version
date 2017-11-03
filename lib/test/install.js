'use strict';

var fs = require('fs');
var test = require('tape');

var niv = require('../index.js');

var _require = require('./test-util.js'),
    clean = _require.clean;

// TODO: Test cleanup & test dependencies

test('niv.install normal', function (t) {
  clean();

  niv.install('csjs@1.0.0').then(function () {
    var packageJson = fs.readFileSync('niv_modules/csjs@1.0.0/package.json');
    t.equal(JSON.parse(packageJson).version, '1.0.0');
    t.end();
  }, function (err) {
    t.end(err);
  });
});

test('niv.install remote', function (t) {
  clean();

  niv.install('scott113341/csjs#extract-extends-performance').then(function () {
    var packageJson = fs.readFileSync('niv_modules/scott113341-csjs#extract-extends-performance/package.json');
    t.equal(JSON.parse(packageJson).version, '1.0.4');
    t.end();
  }, function (error) {
    return t.end(error);
  });
});

test('niv.install scoped', function (t) {
  clean();

  niv.install('@scott113341/niv-scoped-test@1.0.0').then(function () {
    var packageJson = fs.readFileSync('niv_modules/@scott113341-niv-scoped-test@1.0.0/package.json');
    t.equal(JSON.parse(packageJson).version, '1.0.0');
    t.end();
  }, function (error) {
    return t.end(error);
  });
});

test('niv.install w/ dependencies', function (t) {
  clean();

  niv.install('push-dir@0.2.2').then(function () {
    var packageJson = fs.readFileSync('niv_modules/push-dir@0.2.2/package.json');
    t.equal(JSON.parse(packageJson).version, '0.2.2');
    t.end();
  }, function (error) {
    return t.end(error);
  });
});

test('niv.install w/ destination', function (t) {
  clean();

  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' }).then(function () {
    var packageJson = fs.readFileSync('niv_modules/csjs@yolo/package.json');
    t.equal(JSON.parse(packageJson).version, '1.0.0');
    t.end();
  }, function (error) {
    return t.end(error);
  });
});

test('niv.install w/o overwrite', function (t) {
  clean();

  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' }).then(function () {
    var packageJson1 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
    t.equal(JSON.parse(packageJson1).version, '1.0.0');
  }).then(function () {
    return niv.install('csjs@1.0.1', { destination: 'csjs@yolo' });
  }).then(function () {
    var packageJson2 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
    t.equal(JSON.parse(packageJson2).version, '1.0.0');
    t.end();
  }, function (error) {
    return t.end(error);
  });
});

test('niv.install w/ overwrite', function (t) {
  clean();

  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' }).then(function () {
    var packageJson1 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
    t.equal(JSON.parse(packageJson1).version, '1.0.0');
  }).then(function () {
    return niv.install('csjs@1.0.1', { destination: 'csjs@yolo', overwrite: true });
  }).then(function () {
    var packageJson2 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
    t.equal(JSON.parse(packageJson2).version, '1.0.1');
    t.end();
  }, function (error) {
    return t.end(error);
  });
});
//# sourceMappingURL=install.js.map