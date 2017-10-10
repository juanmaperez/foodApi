const express       = require('express');
const router        =  express.Router();
const User          = require("../models/user");
const FoodCategory  = ("../models/foodcategory");
const Event         = ('../models/event');


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
        username     : req.body.username,
        email        : req.body.email,
        description  : req.body.description,
        address      : req.body.address,
        city         : req.body.city,
        age          : parseFloat(req.body.age)

    }
    console.log("userdata", userdata);
    
    User.findByIdAndUpdate( userID, { userdata } , { multi: true }, ( err, userdata ) => {
        if(err){
            return next(err);

        }else{
            console.log("userdata", userdata);
            return res.status(200).json( userdata );
        }

    });
});


module.exports = router;
