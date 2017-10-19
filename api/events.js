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

    var newEvent = Event({
        title: req.body.title,
        description: req.body.description,
        image: req.file.filename,
        recipe: req.body.recipe,
        ingredients: req.body.ingredients,
        date: req.body.date,
        time: req.body.time,
        cookingTime: req.body.cookingTime,
        contribution: req.body.contribution,
        _foodCategory:req.body._foodCategory,
        _host: req.body._host,
        location: req.body.location,
    });

    newEvent.save((err, event)=>{
        if(err){
            console.log('err', err)
            return next(err);
        }else{
            console.log('no error', event)
            return res.status(200).json({message:"Saved", reponse: event})
        }
    })
})

module.exports = router;