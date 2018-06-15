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
        var newFileURL;
        var encodedFile = newFile.base64File;
        var fileName = uuidV4()+newFile.fileExtention;
        var encodedFileContainer = "profileImages";
        // TODO
        var uploadStream = Upload.app.models.Upload.uploadStream(
            encodedFileContainer,
            fileName
        );
        uploadStream.end(encodedFile, 'base64', async err => {
            if (err) return callback(err);
            newFileURL = "api/Uploads/profileImages/download/"+fileName;
            callback(null, newFileURL);
        });
    }
};