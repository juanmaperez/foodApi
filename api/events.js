const express       = require('express');
const router        =  express.Router();
const User          = require("../models/user");
//onst FoodCategory  = require("../models/foodcategory");
const Event         = require('../models/event');
const upload        = require('../config/multer');



router.get('/', (req, res, next)=>{
    Event.find({})
    .sort({date: 'desc'})
    .exec( (err, eventList)=>{
        if(err){
            return res.status(500).json({ message: 'Error getting events' });
        }

        return res.status(200).json(eventList)
    })
})

    // Event.find({}, (err, eventList)=>{
    //     if(err){
    //         return res.status(500).json({ message: 'Error getting events' });
    //     }

    //     return res.status(200).json(eventList)
    // })
// })



router.post('/new', upload.single('file'), (req, res, next)=>{
    // console.log("file", req.file);

    const file = `https://s3.eu-central-1.amazonaws.com/socialooking/${req.file.key}`;
    
    //console.log("envento enviado", req.body)
    const date = new Date(req.body.date +" "+ req.body.time)
    
    var newEvent = Event({
        title: req.body.title,
        description: req.body.description,
        image: file,
        recipe: req.body.recipe,
        date: date,
        places: req.body.places,
        time: req.body.time,
        cookingTime: req.body.cookingTime,
        contribution: req.body.contribution,
        _foodCategory: req.body._foodCategory,
        _host: req.body._host,
        city: req.body.city,
        location_lat: req.body.location_lat,
        location_lng: req.body.location_lng,        
        address: req.body.address
     });


     newEvent.save((err, event)=>{
         if(err){
             console.log(err)
             return res.status(500).json({ message: 'Error saving event' });
         }else{
             return res.status(200).json({message:"Saved", reponse: event})
         }
     })
 })

 router.get('/:id', (req, res, next)=>{

     const eventId = req.params.id;

     Event.findById(eventId)
     .populate("_host")
     .populate("_guests")
     .populate("comments.user")
     .then(event => {
         return res.status(200).json(event)
     })
     .catch(err => {
         return res.status(500).json({message: "Error getting event"})})
 })

 router.post('/updateimage/', upload.single('file'), (req, res, next)=>{
     
    const eventID = req.body.id;

     const file = `https://s3.eu-central-1.amazonaws.com/socialooking/${req.file.key}`;
     
     const newEvent = {
         image: file,
     }

     Event.findByIdAndUpdate(eventID, newEvent, (err, event)=>{
        if(err || !event){
            return res.status(404).json({message: "Event not found trying to update image"})
        }

        return res.status(200).json({message: "Image updated successfully", event: event})
     })
 })
     

router.put('/subscribe/:id',(req, res, next)=>{

    const eventID = req.params.id;
    const userID = req.body.userID;

    console.log("entro")

    Event.findById(eventID, (err, event)=>{
        if(err || !event){
          return res.status(404).json({message: "Event not found"})
         }

         console.log("encuentro el evento")
        event._guests.push(userID);
        console.log(event._guests)
        event.places --;
        event.update({_guests: event._guests, places: event.places},(error, event)=>{
            if(error){
                console.log("tengo un error")
                return res.status(404).json({message: "Error saving event"})
            }
            console.log("actualizo el evento")
            User.findByIdAndUpdate( userID, { $push : { _eventsSubscribed : eventID  }}, ( err, userdata ) => {
                if(err){
                    return next(err);
                }
                console.log("actualizo el usuario")
            });


        })

        return res.status(200).json({event})
        
    })
})


router.put('/desubscribe/:id',(req, res, next)=>{
    
    const eventID = req.params.id;
    const userID = req.body.userID;

    Event.findById(eventID, (err, event)=>{
        if(err || !event){
            return res.status(404).json({message: "Event not found"})
            }

        event._guests.forEach((element,idx)=>{
            if(element == userID){
                event._guests.splice(idx, 1);
            }
        })
        event.places ++;
        event.update({_guests: event._guests, places: event.places},(error, event)=>{
            if(error){
                return res.status(404).json({message: "Error saving event"})
            }

            User.findById(userID,(error, userdata)=>{
                if( err || !userdata){
                    return res.status(404).json({message: "User not found"})
                }
                console.log("user", userdata)
                userdata._eventsSubscribed.forEach((eventid, idx )=>{
                    if(eventid == eventID){
                        userdata._eventsSubscribed.splice(idx, 1)
                    }
                })

                userdata.update({_eventsSubscribed: userdata._eventsSubscribed},(error, userdata)=>{
                    if(error){
                        return res.status(404).json({message: "Error saving user"})
                    }

                    console.log("userupdated", userdata) 
                })
            
            }) 

        })

        return res.status(200).json({event})
        
    })

})

router.put('/comment/:id', (req, res, next)=>{
    const eventID = req.params.id
    
    const comment = {
        user: req.body.comment.user,
        comment : req.body.comment.comment
    }

    // console.log("comentario", comment)

    Event.findByIdAndUpdate(eventID, {$push:{comments: comment}}, (err, event)=>{
       
        if(err){
            return res.status(404).json({message: "Error Saving Comment"})
        }
        
        return res.status(200).json({message: "Comment saved", event})
        
    })

})



router.put('/update/:id', (req, res, next)=>{
    const eventID = req.params.id;
    console.log(req.body)
    const date = new Date(req.body.event.date +" "+ req.body.event.time)
    
    const newEvent = {
        title: req.body.event.title,
        description: req.body.event.description,
        recipe: req.body.event.recipe,
        date: date,
        time: req.body.event.time,
        places : req.body.event.places,        
        cookingTime: req.body.event.cookingTime,
        contribution: req.body.event.contribution,
        _foodCategory: req.body.event._foodCategory,
        _host: req.body.event._host,
        city: req.body.event.city,
        location_lat: req.body.event.location_lat,
        location_lng: req.body.event.location_lng,        
        address: req.body.event.address
    }
    

    Event.findByIdAndUpdate(eventID, newEvent, (err, event)=>{
        if(err){
            console.log("error event",event)
            return res.status(500).json({message: "Error updating event"})
        }
        return res.status(200).json({message: "Event updated successfully!"})
    })
    
})

router.post('/review/:id', ( req, res, next ) => {
    console.log("INSIDE UPDATE EVENT");
    const eventID = req.params.id;
    console.log("eventID", eventID);
    //let rating = parseFloat(req.body.rating) * 10 + "";
    const review = {
       
            title        : req.body.title,
            comment      : req.body.comment,
            rating       : req.body.rating,
            puntuation   : parseInt( req.body.points )
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



module.exports = router;
