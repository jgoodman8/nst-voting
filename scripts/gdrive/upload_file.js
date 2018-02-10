'use strict';

var google = require('googleapis');
var fs = require('fs');
var Promise = require('bluebird');

var conf = require('./gdrive_conf.json');

var clientEmail = process.env.CLIENT_EMAIL;
var privateKeyPath = process.env.PRIVATE_KEY_PATH;
var privateKey = null;

if (fs.existsSync(privateKeyPath)) {
  try {
    privateKey = fs.readFileSync(privateKeyPath).toString()
  } catch (err) {
    console.error('the file could not be read');
    console.error(err.stack);
  }
}

if (!clientEmail) {
  console.error('the client email is not set');
  process.exit(1);
}


if (!privateKey) {
  console.error('the private key is not set');
  process.exit(2);
}

var jwtClient = new google.auth.JWT(
  clientEmail,
  null,
  privateKey,
  conf.scopes,
  null
);

var drive = google.drive({ version: 'v3', auth: jwtClient });


const GDriveCreateAsync = Promise.promisify(drive.files.create);
const GDriveUpdateAsync = Promise.promisify(drive.files.update);
const GDriveAuthorizeAsync = Promise.promisify(jwtClient.authorize);

const uploadAsync = function(fileMetadata, media, fileId) {
  return new Promise((resolve, reject) => {
    jwtClient.authorize(function(err, tokens) {
      if (fileId && conf.updateFiles) GDriveUpdateAsync({
        fileId: fileId,
        media: media
      }).then((updatedFile) => {
        console.log('%s updated with fileID: %s', updatedFile.name, updatedFile.id);
        resolve(updatedFile);
      }).catch((err) => {
        reject(err);
      });
      else GDriveCreateAsync({
        resource: fileMetadata,
        media: media
      }).then((createdFile) => {
        console.log('%s created with fileID: %s', createdFile.name, createdFile.id);
        resolve(createdFile);
      }).catch((err) => {
        reject(err);
      });
    });

  });
};



if (module === require.main) {
  var args = process.argv.slice(2);

  if (args.length != 3) {
    console.log('Correct syntax:');
    console.log('node upload_file.js <fileName> <mimeType> <filePath> <fileId>');
    console.log('fileName: required - Name to use uploading the file');
    console.log('mimeType: required - MIME type of the file');
    console.log('filePath: required - Path of the file to upload')
    console.log('fileId: optional - GDrive Id of the file. If you use a existent Id, you will update its associated file');
  } else {

    var fileMetadata = {
      'name': args[0],
      'parents': [conf.folderIds.root]
    };

    var media = {
      mimeType: args[1],
      body: fs.createReadStream(args[2])
    };

    uploadAsync(fileMetadata, media, null).then((GDriveFile) => {
      console.log('You can access the file in: https://drive.google.com/file/d/%s', GDriveFile.id);
    }).catch(() => {
      console.log('Error uploading resource');
      console.log(err);
    });

  }
};

module.exports = {
  uploadAsync: uploadAsync,
  drive: drive
}
