const express       = require('express');
const router        =  express.Router();
const User          = require("../models/user");
const FoodCategory  = ("../models/foodcategory");
const Event         = ('../models/event');


router.post('/new', (req, res, next)=>{
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const recipe = req.body.recipe;
    const ingredientes = req.body.ingredients;
    const date = req.body.date;
    const time = req.body.time;
    const cookingTime = req.body.cookingTime;
    const contribution = req.body.contribution;
    const _foodCategory = req.body.foodCategoryId;
    const _host = req.body.userId;
    const location = req.body.location;
    const city = req.body.city;

    const newEvent = new Event({

    });
})

module.exports = router;