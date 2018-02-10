const { replaceInFile, pkgPath } = require('./utils/file');

replaceInFile(pkgPath, /"homepage": ".*?"/, `"homepage": "/"`);
