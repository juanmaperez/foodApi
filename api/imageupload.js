const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bodyParser = require('body-parser');
const Busboy = require('busboy');
const AWS = require('aws-sdk');
const S3 = require('s3');
const Jimp = require('jimp');
const env = require("dotenv").config();


router.post('/:id', (req, res, next) => {
   
    const userID = req.params.id;
   
    // INTRODUCING VARIABLES FOR IMAGE PROCESSING //
    let imgdata;
    let myfilename;
    let fileExtension;
    let mymimetype;
    let finalBuffer;
    let mybufferimage;
    let mybase64img;

    //CONFIG FOR AMAZON S3 UPLOAD //
    let config = {

        accessKeyId:        process.env.accessKeyId,
        secretAccessKey:    process.env.secretAccessKey,
        sslEnabled:         false,
        region:             'eu-central-1',

    };

    //THIS ORDER IS IMPORTANT//
    AWS.config.update(config);
    var s3 = new AWS.S3();
    
    var busboy = new Busboy({ headers: req.headers }); //GETS IMAGE DATA FROM HEADER
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        myfile = file;
        mymimetype = mimetype;
        file.fileRead = [];

        file.on('data', function (chunk) {
            
            this.fileRead.push(chunk);

            let n = filename.lastIndexOf(".");
            if (n > -1) {
                myfilename = filename.substr(0, n);
                fileExtension = filename.substr(n + 1, n + 4);

            }
            else { myfilename = filename }

        });
        file.on('end', function () {

            finalBuffer = Buffer.concat(this.fileRead);

        });
    });
    busboy.on('error', function (err) {
        
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
       
    });
    busboy.on('finish', function () {

        // BUSBOY IS DONE --> RESIZE AND COMPRESS IMAGE WITH JIMP //

        Jimp.read(finalBuffer, (err, image) => {

            if (err) throw err;
            
            let mime = mymimetype;
            let key = myfilename + "." + fileExtension;
            let contenttype = mymimetype;
            image.resize(350, Jimp.AUTO);
            image.quality(90);
            
            mybufferimage = image.getBuffer(mime, (err, imagebuffer) => {
                if (err) throw err;

                // SET PARAMS FOR S3 IMAGE UPLOAD TO AMAZON //
                var params = {
                    Bucket: 'socialooking',
                    Key: key,
                    Body: imagebuffer,
                    ContentType: contenttype,
                };

                s3.putObject(params, function (perr, pres) {
                    
                    if (perr) {
                        //MESSAGE FOR USER
                        console.log("Error uploading data: ");
                    } else {
                        console.log("Successfully uploaded data to myBucket/myKey");
                        //console.log("currentuser ",currentuser);
                        
                        const profileImgUrl = "https://s3.eu-central-1.amazonaws.com/socialooking/" + key;


                        User.findByIdAndUpdate(userID, { image: profileImgUrl }, (err, data) => {
                            if (err || !data) {

                                return next(err);

                            } else {
                                console.log('data', data);
                            }

                        });
                    }
                });
            });//CLOSE BUFFER CREATE
            let base64mime = mymimetype;
            mybase64img = image.getBase64(base64mime, (err, base64) => {
                res.send(base64);
                console.log("end");
                res.end();
            });

        });//CLOSE JIMP

    });

    req.pipe(busboy);

});

module.exports = router;


