// Iteration #1
const mongoose = require('mongoose');
const Event = require('../models/event');
mongoose.connect('mongodb://localhost/foodDB');

const myEvents = [



{ title: "PASTA",
hahstags : ["Italian"],
description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonu, consetetur sadipscing elitr, ",
image: "http://i2.wp.com/mylovelylittlelunchbox.com/wp-content/uploads/2017/05/IMG_0352.jpg",
recipe: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tem.",
ingredients: [ "Wheat" , "Water", "Salt", "Meat", "Tomatoes"],
date: new Date("November 8, 2017 12:00:00"),
cookingTime: "10 minutes",
contribution: 5,
_host: new mongoose.Types.ObjectId("5a00d87927b9345b0416ce24"),
_guests: [ new mongoose.Types.ObjectId("59d8ed53a60324273aed61c1")],
review: [{
            title  : "wonderful",
            comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
            rating :   "40%",
            puntuation: 5

         },
         {
          title  : "terrible",
          comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
          rating :   "20%",
          puntuation: 1

       }],
  address_lat       : 50,
  address_lng       : 50,
  city              : "Bologne",
  evaluation        : 34
}

];


Event.create( myEvents, (err, docs) => {
  if(err){
    throw err;
  }
  docs.forEach( ( event ) => {
    console.log(event);
  });
  mongoose.connection.close();

});
