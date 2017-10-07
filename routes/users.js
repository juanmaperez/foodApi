const express       = require('express');
const router        =  express.Router();
const User          = require("../models/user");
const FoodCategory  = ("../models/foodcategory");
const Event         = ('../models/event');


router.get(':id', (req, res, next ) => {

    const userID = req.params.id;

    User.findById( userID, ( err, user ) => {
        if(err){
            return next(err);

        }else{
            return res.status(200).json( user );
        }

    });
});










module.exports = router;
