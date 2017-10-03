const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const FoodCategory = require('./foodCategory');
const Event = require('./event');


const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true}, 
  age: {type: Number, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  _foodInterests: [{ type: Schema.Types.ObjectId, ref: 'FoodCategory', required: true }],
  _foodSpecialities: [{ type: Schema.Types.ObjectId, ref: 'FoodCategory', required: true }],
  address: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2d', required: true
  },
  city : {type: String, required: true},
  _eventsCreated: [{ type: Schema.Types.ObjectId, ref: 'Event', required: true }],
  _eventAssisted: [{ type: Schema.Types.ObjectId, ref: 'Event', required: true }]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;