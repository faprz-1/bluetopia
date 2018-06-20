'use strict';

const uuidV4 = require('uuid/v4');

module.exports = function(Upload) {

    /**
     * uploads a new base 64 file to the server
     * @param {string} newFile new file in base 64 encoding object
     * @param {string} newFileName new file's name
     * @param {Function(Error, string)} callback
     */

    Upload.newBase64File = function(newFile, callback) {
        const encodedFileContainer = newFile.encodedFileContainer;
        var UploadedFiles = Upload.app.models.UploadedFiles;
        const encodedFile = newFile.base64File;
        var newFileId = uuidV4();
        var fileName = newFileId+newFile.fileExtention;
        // TODO
        var uploadStream = Upload.uploadStream(
            encodedFileContainer,
            fileName
        );
        uploadStream.end(encodedFile, 'base64', async err => {
            if (err) return callback(err);
            UploadedFiles.create({
                id: newFileId,
                URL: "/Uploads/"+encodedFileContainer+"/download/"+fileName
            }, function(err, res){
                if (err) return callback(err);
                callback(null, res);
            })
        });
    }
};