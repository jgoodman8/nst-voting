const shell = require('shelljs');
const { argv } = require('yargs');
const { replaceInFile, appendToFile, replaceContents, getPath } = require('./utils/file');

console.log('> Copy/Move files');
console.log('  Copy images and font build directory');

shell.cp('-Rf', getPath('src/images/*'), getPath('build/images'));
shell.mkdir('-p', getPath('build/fonts'));
shell.cp('-Rf', getPath('src/styles/common/fonts/*'), getPath('build/fonts'));

console.log('  Modify relative paths');

const indexFile = getPath('build/index.html');
replaceInFile(indexFile, /"\.+\/static/g, '"/static');
replaceInFile(indexFile, /"\.+\/main/g, '"/main');

console.log('>> build/service-worker.js');

const custom = [
  '//' + new Date().toISOString(),
  '//' + 'Custom sw config',
  `importScripts('./sw-custom.js')`
].join('\n');


const workerFile = getPath('build/service-worker.js');

if (argv.mode === 'electron') {
  console.log('   Configuring service worker for electron');

  replaceContents(workerFile, custom);

} else {
  console.log('   Configuring service worker for web');
  appendToFile(workerFile, custom);
}

console.log('> Copy/Move files [DONE]');


