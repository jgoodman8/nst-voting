const { pkgPath, replaceInFile } = require('./utils/file');

replaceInFile(pkgPath, /"homepage": ".*?"/, `"homepage": "./"`);
