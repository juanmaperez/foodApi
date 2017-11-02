// Iteration #1
const mongoose = require('mongoose');
const Event = require('../models/event');
mongoose.connect('mongodb://localhost/foodDB');

const myEvents = [

  { title: "Asian food",
    hahstags : ["deutsch", "soul food"],
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonu",
    image: "https://www.justataste.com/wp-content/uploads/2013/03/Churros-hz-FINAL-580.jpg",
    recipe: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tem.",
    ingredients: [ "Zucker" , "Weizenmehl", "Fett", "Schokolade"],
    date: new Date("October 31, 2017 16:00:00"),
    cookingTime: "10 minutes",
    contribution: 5,
    _host: new mongoose.Types.ObjectId("59dcb416adf90edb35fc476b"),
    _guests: [ new mongoose.Types.ObjectId("59ef92be1e7129c425507e38"), new mongoose.Types.ObjectId("59ef9005600187c162c37db6"), new mongoose.Types.ObjectId("59e4ac6166506f374d9df509")],
    review: [{ 
                title  : "Delicious",
                comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
                rating :   0.9,
                puntuation: 5

             }], 
      address_lat       : 50,
      address_lng       : 50,
      city              : "Asian food",
      evaluation        : 34
  },

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