const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User = require('./user');
//const FoodCategory = require('./foodCategory');

const eventSchema = new Schema({
  title:            { type: String, required: false },
  description:      { type: String, required: false },
  image:            { type: String, required: false },
  recipe:           { type: String, required: false },
  ingredients:      [{ type: String, required: false }],
  date:             { type: Date, required: false },
  places:           { type: Number, required: false },  
  _foodCategory:    { type: Schema.Types.ObjectId, ref: 'FoodCategory', required: false },
  cookingTime:      { type: String, required: false },
  contribution:     { type: Number, required:false },  
  _host:            { type: Schema.Types.ObjectId, ref: 'User', required: false },
  _guests:          [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
  comments:         [{  
                        user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
                        comment: { type:String, required:false }
                    }], 
  review  :         [{ 
                    title:      { type: String },
                    comment:    { type: String },
                    rating :    { type: String },
                    puntuation: { type: Number }

                    }], 
  location_lat:     { type: Number, required: false },
  location_lng:     { type: Number, required: false },
  city :            { type: String, required: false },  
  address :         { type: String, required: false },
  evaluation:       [{ type: Number, require:false }],
                    },
{ timestamps:       { createdAt: "created_at",
                    updatedAt: "updated_at"
                    }
}
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;