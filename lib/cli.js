#!/usr/bin/env node
'use strict';

var minimist = require('minimist');
var niv = require('./index.js');

var _require = require('./util.js'),
    getUsage = _require.getUsage;

var options = {
  default: {
    destination: undefined,
    cmd: undefined,
    help: false,
    overwrite: undefined,
    quiet: false
  },
  alias: {
    destination: 'd',
    cmd: 'c',
    help: 'h',
    overwrite: 'o',
    quiet: 'q'
  }
};

var args = minimist(process.argv.slice(2), options);

if (args.help) {
  process.stdout.write(getUsage());
  process.exit(0);
}
if (!args._.length) {
  process.stderr.write(getUsage());
  process.exit(1);
}

if (args._.length > 1) {
  if (args._[0] === "uninstall") {
    niv.uninstall(args._[1]);
    process.exit(0);
  }
  if (args._[0] === "install") {
    niv.install(args._[1], args);
    process.exit(0);
  }
}

niv.install(args._[0], args);
//# sourceMappingURL=cli.js.map