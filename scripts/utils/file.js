const path = require('path');
const fs = require('fs');

const appPath = path.resolve(path.join(__dirname, '../..'));
const pkgPath = path.join(appPath, 'package.json');

function replaceInFile(file, search, replace) {
  file = path.resolve(file.toString());

  const content = fs.readFileSync(file).toString().replace(search, replace);

  fs.writeFileSync(file, content);

  return content;
}


function appendToFile(file, content) {
  file = path.resolve(file.toString());

  const content = [
    fs.readFileSync(file).toString(),
    content
  ].join('\n\n');

  fs.writeFileSync(file, content);

  return content;
}

function replaceContents(file, content) {
  file = path.resolve(file.toString());

  fs.writeFileSync(file, content.toString());

  return content;
}


function getPath(p) {
  return path.join(appPath, p);
}


function readFile(file) {
  return fs.readFileSync(getPath(file));
}

function writeFile(file, contents) {
  fs.writeFileSync(getPath(file), contents);
}


module.exports = { appPath, pkgPath, replaceInFile, appendToFile, replaceContents, getPath };
