const mongoose      = require("mongoose");
const Schema        = mongoose.Schema;
const User          = require('./user');
const FoodCategory  = require('./foodCategory');

const eventSchema = new Schema({
  title:            { type: String },
  description:      { type: String, required: false },
  image:            { type: String, required: false },
  recipe:           { type: String, required: false },
  ingredients:      { type: Array, required: false },
  date:             { type: Date, required: false },
  _foodCategory:    { type: Schema.Types.ObjectId, ref: 'FoodCategory' },
  cookingTime:      { type: String },
  contribution:     { type: Number },  
  _host:            { type: Schema.Types.ObjectId, ref: 'User' },
  _guests:          [{ type: Schema.Types.ObjectId, ref: 'User'  }],
  review  :         [{ 
                      title:      { type: String },
                      comment:    { type: String },
                      rating :    { type: String },
                      puntuation: { type: Number }

                    }],  
  _eventsSubscribed : [ {type: Schema.Types.ObjectId, ref: 'Event' }],
  address_lat       : {  type: Number },
  address_lng       : {  type: Number },
  city :            {type: String, required: true},
  evaluation:       [{type: Number, require:true}],
   
});


const Event = mongoose.model("Event", eventSchema);
module.exports = Event;