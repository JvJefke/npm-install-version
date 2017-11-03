const test = require('tape');

const niv = require('../index.js');
const { clean } = require('./test-util.js');

test('niv.require normal', t => {
  clean();
  niv.installSync('csjs@1.0.0');
  const csjs = niv.require('csjs@1.0.0');
  t.assert(typeof csjs, 'function');
  t.end();
});

test('niv.require remote', t => {
  clean();
  niv.installSync('scott113341/csjs#extract-extends-performance');
  const csjs = niv.require('scott113341/csjs#extract-extends-performance');
  t.assert(typeof csjs, 'function');
  t.end();
});

test('niv.require scoped', t => {
  clean();
  niv.installSync('@scott113341/niv-scoped-test@1.0.0');
  const pkg = niv.require('@scott113341/niv-scoped-test@1.0.0');
  t.assert(typeof pkg.addNumbers, 'function');
  t.end();
});

test('niv.require w/ destination', t => {
  clean();
  niv.installSync('scott113341/csjs#extract-extends-performance', { destination: 'csjs@yolo' });
  const csjs = niv.require('csjs@yolo');
  t.assert(typeof csjs, 'function');
  t.end();
});

test('niv.require path', t => {
  clean();
  niv.installSync('@scott113341/niv-scoped-test@1.0.0');
  const packageJson = niv.require('@scott113341/niv-scoped-test@1.0.0', "package.json");
  t.assert(packageJson.name = '@scott113341/niv-scoped-test');
  t.end();
})
