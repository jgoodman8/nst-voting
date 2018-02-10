const fs = require('fs');
const shell = require('shelljs');
const { argv } = require('yargs');
const { getPath, replaceInFile } = require('./utils/file');

console.log('> Update public files');

const versionFile = getPath('public/version.txt');
const configFile = getPath('src/config/config.js');
const serviceWorkerFile = getPath('src/service-worker/sw-custom.js');
const swToolbox = getPath('node_modules/sw-toolbox/sw-toolbox.js');

const index = argv.index ? getPath(argv.index) : getPath('src/index.html');


if (fs.existsSync(configFile)) {
  shell.rm('-rf', getPath('public'));
  shell.mkdir('-p', getPath('public/images'));
  shell.mkdir('-p', getPath('public/sample_files'));
  shell.mkdir('-p', getPath('public/static/js'));

  shell.cp(getPath('src/styles/default/splash_screen.png'), getPath('public/images'));
  shell.cp(getPath('sample_files/students.csv'), getPath('public/sample_files/students.csv'));
  shell.cp(getPath('src/favicon.ico'), getPath('public'));
  shell.cp(index, getPath('public/index.html'));

  console.log('Copying config file ' + configFile);

  shell.cp(configFile, getPath('public/static/js'));
  shell.cp(serviceWorkerFile, getPath('public'));
  shell.cp(swToolbox, getPath('public'));

  replaceInFile(getPath('public/index.html'), '<!--config:placeholder-->', '<script src="/static/js/config.js"></script>');

  console.log('> Update public files [DONE]');
} else {
  console.log('> Update public files [FAIL] - The config.js file doesn\'t exists. Copy and rename the config.*.js file.');
}
