// Iteration #1
const mongoose = require('mongoose');
const Event = require('../models/event');
mongoose.connect('mongodb://localhost/foodDB');

const myEvents = [

  { title: "Bukarest time",
    hahstags : ["deutsch", "soul food"],
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonu",
    image: "https://www.justataste.com/wp-content/uploads/2013/03/Churros-hz-FINAL-580.jpg",
    recipe: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tem.",
    ingredients: [ "Zucker" , "Weizenmehl", "Fett", "Schokolade"],
    date: new Date("November 3, 2017 16:00:00"),
    cookingTime: "10 minutes",
    contribution: 5,
    _host: new mongoose.Types.ObjectId("59fefc943cc1da049439b5e8"),
    _guests: [ new mongoose.Types.ObjectId("59ef92be1e7129c425507e38"), new mongoose.Types.ObjectId("59ef9005600187c162c37db6"), new mongoose.Types.ObjectId("59e4ac6166506f374d9df509")],
    review: [{ 
                title  : "Abyssmal",
                comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
                rating :   0.1,
                puntuation: 1

             }], 
      address_lat       : 50,
      address_lng       : 50,
      city              : "Bukarest",
      evaluation        : 34
  },
  { title: "Culture Mix",
  hahstags : ["deutsch", "soul food"],
  description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonu",
  image: "https://www.justataste.com/wp-content/uploads/2013/03/Churros-hz-FINAL-580.jpg",
  recipe: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tem.",
  ingredients: [ "Zucker" , "Weizenmehl", "Fett", "Schokolade"],
  date: new Date("November 3, 2017 16:00:00"),
  cookingTime: "10 minutes",
  contribution: 5,
  _host: new mongoose.Types.ObjectId("59fefc943cc1da049439b5e8"),
  _guests: [ new mongoose.Types.ObjectId("59ef92be1e7129c425507e38"), new mongoose.Types.ObjectId("59ef9005600187c162c37db6"), new mongoose.Types.ObjectId("59e4ac6166506f374d9df509")],
  review: [{ 
              title  : "Amazing",
              comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
              rating :   0.9,
              puntuation: 5

           }], 
    address_lat       : 50,
    address_lng       : 50,
    city              : "New York",
    evaluation        : 34
},
{ title: "Caucasian fusion",
hahstags : ["deutsch", "soul food"],
description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonu",
image: "https://www.justataste.com/wp-content/uploads/2013/03/Churros-hz-FINAL-580.jpg",
recipe: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tem.",
ingredients: [ "Zucker" , "Weizenmehl", "Fett", "Schokolade"],
date: new Date("November 8, 2017 16:00:00"),
cookingTime: "10 minutes",
contribution: 5,
_host: new mongoose.Types.ObjectId("59fefc943cc1da049439b5e8"),
_guests: [ new mongoose.Types.ObjectId("59ef92be1e7129c425507e38"), new mongoose.Types.ObjectId("59ef9005600187c162c37db6"), new mongoose.Types.ObjectId("59e4ac6166506f374d9df509")],
review: [{ 
            title  : "Interesting",
            comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
            rating :   0.5,
            puntuation: 3

         }], 
  address_lat       : 50,
  address_lng       : 50,
  city              : "Bangladesh",
  evaluation        : 34
},
{ title: "Bretzenfrühstück",
hahstags : ["deutsch", "soul food"],
description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonu",
image: "https://www.justataste.com/wp-content/uploads/2013/03/Churros-hz-FINAL-580.jpg",
recipe: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tem.",
ingredients: [ "Zucker" , "Weizenmehl", "Fett", "Schokolade"],
date: new Date("November 7, 2017 16:00:00"),
cookingTime: "10 minutes",
contribution: 15,
_host: new mongoose.Types.ObjectId("59fefc943cc1da049439b5e8"),
_guests: [ new mongoose.Types.ObjectId("59ef92be1e7129c425507e38"), new mongoose.Types.ObjectId("59ef9005600187c162c37db6"), new mongoose.Types.ObjectId("59e4ac6166506f374d9df509")],
review: [{ 
            title  : "Toll",
            comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
            rating :   0.7,
            puntuation: 4

         }], 
  address_lat       : 50,
  address_lng       : 50,
  city              : "Munich",
  evaluation        : 34
},
{ title: "Noodles time",
hahstags : ["Italian"],
description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonu, consetetur sadipscing elitr, ",
image: "https://www.justataste.com/wp-content/uploads/2013/03/Churros-hz-FINAL-580.jpg",
recipe: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tem.",
ingredients: [ "Zucker" , "Weizenmehl", "Fett", "Schokolade"],
date: new Date("November 3, 2017 16:00:00"),
cookingTime: "10 minutes",
contribution: 5,
_host: new mongoose.Types.ObjectId("59fefc943cc1da049439b5e8"),
_guests: [ new mongoose.Types.ObjectId("59f60ead928e1d51cccea513")],
review: [{ 
            title  : "wonderful",
            comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
            rating :   0.9,
            puntuation: 5

         },
         { 
          title  : "terrible",
          comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
          rating :   0.2,
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