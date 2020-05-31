'use strict';

const uuidV4 = require('uuid/v4');

module.exports = function (Upload) {

    /**
     * uploads a new base 64 file to the server
     * @param {string} newFile new file in base 64 encoding object
     * @param {string} newFileName new file's name
     * @param {Function(Error, string)} callback
     */

    Upload.newBase64File = function (newFile, callback) {
        const encodedFileContainer = newFile.encodedFileContainer;
        const encodedFile = newFile.base64File;
        let newFileId = uuidV4();
        var fileName = newFileId + newFile.fileExtention;
        var UploadedFiles = Upload.app.models.UploadedFiles;
        // TODO
        var uploadStream = Upload.uploadStream(
            encodedFileContainer,
            fileName
        );
        uploadStream.end(encodedFile, 'base64', async err => {
            if (err) return callback(err);
            UploadedFiles.create({
                id: newFileId,
                name: "no-name"||newFile.name,
                resize: false || newFile.resize,
                URL: "/Uploads/" + encodedFileContainer + "/download/" + fileName
            }, function (err, res) {
                if (err) return callback(err);
                callback(null, res);
            })
        });
    }

    Upload.replaceFileBase64File = function (oldFileId, newFile, callback) {
        var UploadedFiles = Upload.app.models.UploadedFiles;

        if (oldFileId == null) {
            Upload.newBase64File(newFile, callback)
        } else {
            UploadedFiles.destroyById(oldFileId, function (err) {
                if (err) return callback(err);
                Upload.newBase64File(newFile, callback)
            });
        }
    }
};