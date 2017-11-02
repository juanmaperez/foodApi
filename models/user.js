const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const FoodCategory = require('./foodCategory');
const Event = require('./event');


const userSchema = new Schema({

  username          : {  type: String },
  password          : {  type: String },
  email             : {  type: String }, 
  birthdate         : {  type: Date },
  description       : {  type: String },
  image             : {  type: String },
  optIN             : {  type: Boolean},
  host              : {  type: Boolean},
 // _foodInterests    : [{ type: Schema.Types.ObjectId, ref: 'FoodCategory' }],
  //_foodSpecialities : [{ type: Schema.Types.ObjectId, ref: 'FoodCategory' }],
  /*address           : {
                          type: [ Number ], // [<longitude>, <latitude>]
                          index: '2d'
                      },*/
  _foodSpecialities : {  type: [] },
  _foodInterests    : {  type: [] },
  address           : {  type: String },
  address_lat       : {  type: Number },
  address_lng       : {  type: Number },
  city              : {  type: String },
  _eventsCreated    : [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  _eventsSubscribed   : [{ type: Schema.Types.ObjectId, ref: 'Event' }]
                      }, 
  {
    timestamps      : {
      createdAt       : "created_at",
      updatedAt       : "updated_at"
  }                    
});

const User = mongoose.model("User", userSchema);

module.exports = User;