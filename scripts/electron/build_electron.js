const shell = require('shelljs');
const path = require('path');
const glob = require('glob');
const { appPath, getPath, replaceInFile } = require('../utils/file');

const electronPath = getPath('electron');
console.log('> Install dependencies');

shell.cd(electronPath);
shell.exec('npm install'); // We need to use npm, for some reason it does not work with yarn
shell.cd(appPath);

console.log('> Copy electron files');
const buildPath = getPath('build');
const electronBuildPath = path.join(electronPath, 'build');
shell.rm('-rf', electronBuildPath);
shell.cp('-Rf', buildPath, electronBuildPath);

const electronBuildIndexFile = path.join(electronBuildPath, 'index.html');
replaceInFile(electronBuildIndexFile, /"\/static/g, '"./static');
replaceInFile(electronBuildIndexFile, /"\/main/g, '"./static');
replaceInFile(electronBuildIndexFile, /"\/site/g, '"./site');

console.log('> Delete build directory');
shell.rm('-rf', buildPath);

console.log('> Copy electron files [DONE]');

