const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const mime = require('mime');
const glob = require('glob');

if (require.main === module) {
  main().catch(err => {
    console.error(err.stack);
    throw err;
  });
}

async function main() {
  const { argv } = require('yargs')
    .option('pattern', {
      type: 'string',
      describe: 'File pattern. Files matching the pattern will be uploaded to the destination folder',
      required: true,
      alias: 'p'
    })
    .option('destination', {
      type: 'string',
      describe: 'Google drive destination folder. If it does not exists "root" folder will be used',
      required: true,
      alias: 'd'
    })
    .options('suffix', {
      type: 'string',
      describe: 'File suffix',
      alias: 's'
    })
    .usage('$0 --pattern string --destination string [--suffix string]')
    .wrap(120);

  const destination = (argv.destination || '').toLowerCase();

  const conf = require('./gdrive_conf.json');
  const destinationFolderGDriveId = conf.folderIds[destination] || conf.folderIds.root;
  const listFilesConf = {
    includeRemoved: false,
    spaces: 'drive',
    fileId: destinationFolderGDriveId,
    fields: 'nextPageToken, files(id, name, parents, mimeType)',
    q: `'${destinationFolderGDriveId}' in parents`
  };

  const localList = getFiles(argv.pattern);
  const gDriveList = await listGDriveFilesAsync(listFilesConf);

  await Promise.mapSeries(localList, async file => {
    const fileName = addSuffixToTheFileName(file.name, argv.suffix);
    const driveFile = (gDriveList.files || []).find(file => file.name === fileName);
    const fileId = driveFile ? driveFile.id : null;

    const fileMetadata = {
      name: fileName,
      parents: [destinationFolderGDriveId]
    };

    const media = {
      mimeType: file.type,
      body: fs.createReadStream(file.path)
    };

    const GDriveFile = await require('./upload_file').uploadAsync(fileMetadata, media, fileId);

    console.log('You can access the file in: https://drive.google.com/file/d/%s', GDriveFile.id);
  });
}


async function listGDriveFilesAsync(listFilesConf) {
  return new Promise((resolve, reject) => {
    require('./upload_file').drive.files.list(listFilesConf, (err, result) => err ? reject(err) : resolve(result));
  });
}

function getFiles(pattern) {
  return glob
    .sync(pattern)
    .filter(file => fs.statSync(file).isFile())
    .map(file => {
      return {
        name: path.basename(file),
        path: file,
        size: fs.statSync(file).size,
        type: mime.getType(file)
      };
    });
}

function addSuffixToTheFileName(fileName, suffix) {
  suffix = (suffix || '').trim();

  if (!suffix) {
    return fileName;
  }

  const parts = fileName.split('.');
  const last = parts.pop();

  return [...parts, suffix.toLowerCase(), last].join('.');
}
