const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User = require('./user');
const FoodCategory = require('./foodCategory');

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  recipe: { type: String, required: false },
  ingredients: { type: Array, required: false },
  date: { type: String, required: false },
  _foodCategory: { type: Schema.Types.ObjectId, ref: 'FoodCategory', required: true },
  cookingTime: { type: String, required: false },
  contribution: { type:Number, required:true },  
  _host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  _guests: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  comments: [{ 
    type: Object, 
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: {type:String, required:false },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }],  
  location: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2d', required: true
  },
  city : {type: String, required: true},
  evaluation: [{type: Number, require:true}],
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;