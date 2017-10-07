const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const FoodCategory = require('./foodCategory');
const Event = require('./event');


const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true}, 
  age: {type: Number, required: false},
  description: {type: String, required: false},
  image: {type: String, required: false},
  _foodInterests: [{ type: Schema.Types.ObjectId, ref: 'FoodCategory', required: false }],
  _foodSpecialities: [{ type: Schema.Types.ObjectId, ref: 'FoodCategory', required: false }],
  address: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2d', required: false
  },
  city : {type: String, required: false},
  _eventsCreated: [{ type: Schema.Types.ObjectId, ref: 'Event', required: false }],
  _eventAssisted: [{ type: Schema.Types.ObjectId, ref: 'Event', required: false }]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;