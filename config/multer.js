const upload = require('multer-s3');
const path = require ('path');
const aws = require('aws-sdk');
const multer = require('multer');
const environment = require('../environment/environment');

const s3 = new aws.S3({
    accessKeyId: environment.accessKeyId, 
    secretAccessKey: environment.secretAccessKey
});


var upload = multer({
    storage: multerS3({
    s3: s3,
    bucket: 'socialooking',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString())
    }
    })
})

module.exports = upload;