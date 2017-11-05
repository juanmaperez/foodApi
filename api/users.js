const express       = require('express');
const router        = express.Router();
const User          = require("../models/user" );
const Event         = require("../models/event" );


router.get('/:id', (req, res, next ) => {
    
    const userID = req.params.id;

    User.findById( userID )
        .populate('_eventsSubscribed')
        .exec(( err, user ) => {
            if(err){
                return res.status(200).json({ error: "findUser error"});

            }else{
                
                let eventsToBeRated  = [];
                if(user._eventsSubscribed){
                    
                    let arrayEventsSubscribed = user._eventsSubscribed;
                    
                    if(arrayEventsSubscribed.length > 0){
                       
                        for( let i = 0; i < arrayEventsSubscribed.length; i++ ){
                            
                            let eventTimestamp = new Date( arrayEventsSubscribed[i].date ).valueOf();
                            
                            let timeStampNow   = Date.now();
                           
                            let timeFrame14days = 14 * 24 * 60 * 60 * 1000;
                            
                            if( (timeStampNow - eventTimestamp <= timeFrame14days) && (timeStampNow > eventTimestamp) ){
                                
                                eventsToBeRated.push( arrayEventsSubscribed[i] )
                                

                            }
                        }
                    }
                }   
                
                // GET ALL EVENTS HOSTED BY THIS USER AND GET ALL HIS REVIEWS //
                Event.find( { _host : userID } , ( err, events ) => {

                    if(err){
                        return next(err);
                    }else{
                        
                        let reviews=[];
        
                        if(events.length > 0){
                            
                            for( let i = 0; i < events.length; i++ ){
                                          
                                for(let j = 0; j < events[i].review.length; j++){
                            
                                    reviews.push( events[i].review[j]) ;
                                }
                            }
                        }
            
                        return res.status(200).json({ user, eventsToBeRated, events, reviews } );
                    }

                });
            
            }

        });

});

router.put('/subscribe2event/:id', (req, res, next) => {

    const eventID = req.params.id;
    const userID  = req.body.userID;

    User.findByIdAndUpdate( userID, { $push : { _eventsSubscribed : new mongoose.Types.ObjectId( eventID ) }}, ( err, userdata ) => {
        if(err){
            return next(err);

        }else{
            
            return res.status(200).json( userdata );
        }

    });
    
});


router.put('/:id', (req, res, next ) => {
    
    const userID = req.params.id;
    const birthdate = new Date(req.body.birthdate+"");
    
    const userdata= {
        username            : req.body.username,
        email               : req.body.email,
        description         : req.body.description,
        address             : req.body.address,
        city                : req.body.city,
        birthdate           : birthdate,
        address_lat         : req.body.address_lat,
        address_lng         : req.body.address_lng,
        _foodSpecialities   : req.body.specialities,
        _foodInterests      : req.body.favfoods,
        host                : req.body.host

    }

    User.findByIdAndUpdate( userID, userdata , { multi: true }, ( err, userdata ) => {
        if(err){
            return next(err);

        }else{
            
            return res.status(200).json( userdata );
        }

    });
    
});


module.exports = router;
