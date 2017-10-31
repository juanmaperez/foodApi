const multerS3 = require('multer-s3');
const path = require ('path');
const aws = require('aws-sdk');
const multer = require('multer');
const env = require('dotenv').config();


// console.log("environment", env)

// console.log(process.env.accessKeyId)
// console.log(process.env.secretAccessKey)

const s3 = new aws.S3({
    accessKeyId: process.env.accessKeyId, 
    secretAccessKey: process.env.secretAccessKey,
    region : 'eu-central-1',
    sslEnabled: false,
    
    
});


let upload = multer({
    storage: multerS3({
    s3: s3,
    bucket: 'socialooking',
    metadata: function (req, file, cb) {        
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString())
    },
    ACL: 'public-read',
    contentType: (req, file, cb)=> {
        cb(null, file.mimetype)
    }
    })
})

module.exports = upload;
