const express       = require('express');
const router        =  express.Router();
const User          = require("../models/user");
//const FoodCategory  = require("../models/foodcategory");
const Event         = require('../models/event');


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










module.exports = router;
