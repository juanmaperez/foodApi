const express       = require('express');
const router        =  express.Router();
const User          = require("../models/user");


router.get('/:id', (req, res, next ) => {
    const userID = req.params.id;
    console.log(userID)
    
    User.findById( userID, ( err, user ) => {
        if(err){
            return next(err);

        }else{
            return res.status(200).json( user );
        }

    });
});

router.put('/:id', (req, res, next ) => {
    console.log("inside users/id put");
    const userID = req.params.id;
    console.log(userID)

    
    const userdata= {
        username          : req.body.username,
        email             : req.body.email,
        description       : req.body.description,
        address           : req.body.address,
        city              : req.body.city,
        age               : parseFloat(req.body.age),
        address_lat       : req.body.address_lat,
        address_lng       : req.body.address_lng,
        _foodInterests    : req.body.favfoods,
        _foodSpecialities : req.body.specialities,
        
    }
    console.log("userdata", userdata);
    //$push: { files: { fileUrl: url, name: file.name } }
    User.findByIdAndUpdate( userID , userdata , { multi: true }, ( err, userdata ) => {
        if(err){
            return next(err);

        }else{
            console.log("userdata", userdata);
            return res.status(200).json( userdata );
        }

    });
    
});


module.exports = router;
