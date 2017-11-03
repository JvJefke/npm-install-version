'use strict';

var fs = require('fs');
var test = require('tape');

var niv = require('../index.js');

var _require = require('./test-util.js'),
    clean = _require.clean;

test('niv.installSync normal', function (t) {
  clean();
  niv.installSync('csjs@1.0.0');
  var packageJson = fs.readFileSync('niv_modules/csjs@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('niv.installSync remote', function (t) {
  clean();
  niv.installSync('scott113341/csjs#extract-extends-performance');
  var packageJson = fs.readFileSync('niv_modules/scott113341-csjs#extract-extends-performance/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.4');
  t.end();
});

test('niv.installSync scoped', function (t) {
  clean();
  niv.installSync('@scott113341/niv-scoped-test@1.0.0');
  var packageJson = fs.readFileSync('niv_modules/@scott113341-niv-scoped-test@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('niv.installSync w/ dependencies', function (t) {
  clean();
  niv.installSync('push-dir@0.2.2');
  var packageJson = fs.readFileSync('niv_modules/push-dir@0.2.2/package.json');
  t.equal(JSON.parse(packageJson).version, '0.2.2');
  t.end();
});

test('niv.installSync w/ destination', function (t) {
  clean();
  niv.installSync('csjs@1.0.0', { destination: 'csjs@yolo' });
  var packageJson = fs.readFileSync('niv_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('niv.installSync w/o overwrite', function (t) {
  clean();
  niv.installSync('csjs@1.0.0', { destination: 'csjs@yolo' });
  var packageJson1 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  niv.installSync('csjs@1.0.1', { destination: 'csjs@yolo' });
  var packageJson2 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.0');

  t.end();
});

test('niv.installSync w/ overwrite', function (t) {
  clean();
  niv.installSync('csjs@1.0.0', { destination: 'csjs@yolo' });
  var packageJson1 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  niv.installSync('csjs@1.0.1', { destination: 'csjs@yolo', overwrite: true });
  var packageJson2 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.1');

  t.end();
});
//# sourceMappingURL=installSync.js.map