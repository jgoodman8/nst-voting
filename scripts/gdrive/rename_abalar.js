const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const mime = require('mime');
const glob = require('glob');

if (require.main === module) {
  main().catch(err => console.error(err.stack));
}

async function main() {
  const { argv } = require('yargs')
    .option('pattern', {
      type: 'string',
      describe: 'File pattern. Files matching the pattern will be uploaded to the destination folder',
      required: true,
      alias: 'p'
    })
    .usage('$0 --pattern string --destination string [--suffix string]')
    .wrap(120);

  const localList = getFiles(argv.pattern);

  await Promise.map(localList, async file => {
    const fileName = addSuffixToTheFileName(file.path, argv.suffix);
    return fs.renameSync(file.path, fileName);
  });
}

function getFiles(pattern) {
  return glob
    .sync(pattern)
    .filter(file => fs.statSync(file).isFile())
    .map((file) => {
      return {
        name: path.basename(file),
        path: file,
        size: fs.statSync(file).size,
        type: mime.getType(file)
      };
    });
}

function addSuffixToTheFileName(fileName, suffix) {
  suffix = (suffix || 'abalar').trim();

  if (!suffix) {
    return fileName;
  }

  const parts = fileName.split('.');
  const last = parts.pop();

  return [...parts, suffix.toLowerCase(), last].join('.');
}
