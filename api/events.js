const express       = require('express');
const router        = express.Router();
const User          = require("../models/user" );
const Event         = require("../models/event" );

router.post('/review/:id', ( req, res, next ) => {
    console.log("INSIDE UPDATE EVENT");
    const eventID = req.params.id;
    console.log("eventID", eventID);
    const review = {
       
            title        : req.body.title,
            comment      : req.body.comment,
            rating       : req.body.rating,
            points       : parseInt( req.body.points )
    }
                                       
    Event.findByIdAndUpdate( eventID , { $push : { review : review }} , ( err, eventdata ) => {
        if(err){
            return next(err);
        }else{
            console.log( eventdata );
            return res.status(200).json( eventdata );
        }
    });

});


// router.put(':id' , ( req, res, next ) => {
//     console.log("INSIDE UPDATE EVENT");
//     const eventID = req.params.id;
//     console.log("eventID", eventID);
//     const review = {
       
//             title        : req.body.title,
//             comment      : req.body.comment,
//             rating       : parseInt( req.body.rating ),
//             points       : parseInt( req.body.points )
//     }
                                       
//     Event.findByIdAndUpdate( eventID , { $push : { review : { review }}} , ( err, eventdata ) => {
//         if(err){
//             return next(err);
//         }else{
//             console.log( eventdata );
//             res.status(200).json( eventdata );
//         }
//     });

// });


module.exports = router;
