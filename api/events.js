const express       = require('express');
const router        =  express.Router();
const User          = require("../models/user");
//onst FoodCategory  = require("../models/foodcategory");
const Event         = require('../models/event');
const upload        = require('../config/multer');



router.get('/', (req, res, next)=>{
    Event.find({}, (err, eventList)=>{
        if(err){
            return next(err)
        }

        return res.status(200).json(eventList)
    })
})



router.post('/new', upload.single('file'), (req, res, next)=>{
    // console.log("file", req.file);
    const mimetype = req.file.mimetype.split('/');

    const file = `https://s3.eu-central-1.amazonaws.com/socialooking/${req.file.key}`;
    
    console.log("envento enviado", req.body)

    var newEvent = Event({
        title: req.body.title,
        description: req.body.description,
        image: file,
        recipe: req.body.recipe,
        date: req.body.date,
        time: req.body.time,
        cookingTime: req.body.cookingTime,
        contribution: req.body.contribution,
        _foodCategory: req.body._foodCategory,
        _host: req.body._host,
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

module.exports = router;
